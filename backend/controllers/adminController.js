import { prisma } from "../config/prismaClient.js";



export async function updateUserRole(req, res) {
  const { userId, newRole, specialty, bio } = req.body;

  try {
  
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "No autorizado" });
    }


    if (!userId || !newRole) {
      return res.status(400).json({
        message: "Debe enviar userId y newRole",
      });
    }

    if (!["USUARIO", "MEDICO", "ADMIN"].includes(newRole)) {
      return res.status(400).json({
        message: "Rol inválido",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { doctor: true },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

 
    if (newRole === "MEDICO" && !specialty) {
      return res.status(400).json({
        message: "Debe enviar specialty para crear un médico",
      });
    }


    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

   
    if (newRole === "MEDICO") {
      if (!user.doctor) {
        await prisma.doctor.create({
          data: {
            userId: userId,
            specialty,
            bio: bio || "",
          },
        });
      } else {
        await prisma.doctor.update({
          where: { id: user.doctor.id },
          data: {
            specialty,
            bio: bio || user.doctor.bio,
          },
        });
      }
    }

    if (newRole === "USUARIO" && user.doctor) {
      await prisma.doctor.delete({
        where: { id: user.doctor.id },
      });
    }

    return res.json({
      message: "Rol actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al actualizar el rol del usuario",
    });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        DNI: true,
        role: true,
        createdAt: true,
        doctor: {
          select: {
            specialty: true,
            bio: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
