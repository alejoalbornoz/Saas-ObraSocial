import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function registerUser(req, res) {
  const { name, lastName, email, password, DNI } = req.body;

  try {
    // 1. Validación campo vacío
    if (!name || !lastName || !email || !password || !DNI) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { DNI: DNI }],
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
    return res.status(500).json({
      message: "Error del servidor",
    });
  }
}
