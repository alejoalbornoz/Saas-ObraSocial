import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envconfig.js";
import { prisma } from "../config/prismaClient.js";

export async function registerUser(req, res) {
  const { name, lastName, email, password, DNI } = req.body;

  try {
    if (!name || !lastName || !email || !password || !DNI) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { DNI }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.email === email
            ? "El email ya está en uso"
            : "El DNI ya está registrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        password: hashedPassword,
        DNI,
      },
    });

    return res.status(201).json({
      message: "El usuario se ha registrado correctamente",
      user: newUser,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Debes enviar email" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    if (!JWT_SECRET) {
      throw new Error("Falta JWT_SECRET en .env");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // COOKIE PARA LOCALES
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/", // 👈 SIN ESTO NO FUNCA EL PROXY
      maxAge: 3600000,
    });

    return res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

export function logoutUser(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // Match con el login para local
      sameSite: "lax", // Match con el login para local
    });

    return res.json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("Error en logout:", error);
    return res.status(500).json({ message: "Error al cerrar sesión" });
  }
}

export async function updateUserInfo(req, res) {
  try {
    const userId = req.user.id;
    const dataUpdate = req.body;

    // ❌ Campos que NO se pueden actualizar
    const forbiddenFields = ["id", "role"];

    for (let field of forbiddenFields) {
      if (dataUpdate[field] !== undefined) {
        return res
          .status(400)
          .json({ message: `El campo '${field}' no se puede actualizar` });
      }
    }

    if (dataUpdate.email || dataUpdate.DNI) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            dataUpdate.email ? { email: dataUpdate.email } : undefined,
            dataUpdate.DNI ? { DNI: dataUpdate.DNI } : undefined,
          ],
          AND: { id: { not: userId } },
        },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Email o DNI ya está en uso por otro usuario.",
        });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataUpdate,
      select: {
        name: true,
        lastName: true,
        email: true,
        DNI: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json({
      message: "Usuario actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error en updateUserInfo:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

export async function changeOwnPassword(req, res) {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Debes enviar ambas contraseñas." });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Verificar contraseña actual
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña actual incorrecta." });
    }

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return res.json({ message: "Contraseña actualizada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cambiar contraseña." });
  }
}

export async function deleteUserAccount(req, res) {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res
        .status(400)
        .json({ message: "Debes ingresar tu contraseña para confirmar" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Eliminar usuario
    await prisma.user.delete({
      where: { id: userId },
    });

    return res.json({ message: "Cuenta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res.status(500).json({
      message: "Error al eliminar la cuenta",
    });
  }
}

export async function getAllDoctors(req, res) {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return res.json(doctors);
  } catch (error) {
    console.error("Error obteniendo médicos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function getMe(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        lastName: true,
        DNI: true,
        afiliation: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json({ user });
  } catch (error) {
    console.log("Error obteniendo datos del usuario:", error);
    return res.status(500).json({ message: "Error interno" });
  }
}
