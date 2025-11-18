import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Cambiar rol de un usuario
 * Solo ADMIN puede ejecutar esto.
 * Cuando un usuario pasa a MEDICO se crea Doctor.
 * Cuando vuelve a USUARIO se elimina Doctor.
 */
export async function updateUserRole(req, res) {
  const { userId, newRole, specialty, bio } = req.body;

  try {
    // Verificar si quien hace la petición es ADMIN
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "No autorizado" });
    }

    // Validar parámetros
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

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { doctor: true },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si pasa a MEDICO → necesita specialty
    if (newRole === "MEDICO" && !specialty) {
      return res.status(400).json({
        message: "Debe enviar specialty para crear un médico",
      });
    }

    // 1️⃣ CAMBIO DE ROL
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    // 2️⃣ SI PASA A MEDICO → CREAR DOCTOR (si no existe)
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
        // Si ya era médico, actualizamos datos
        await prisma.doctor.update({
          where: { id: user.doctor.id },
          data: {
            specialty,
            bio: bio || user.doctor.bio,
          },
        });
      }
    }

    // 3️⃣ SI PASA A USUARIO → ELIMINAR DOCTOR
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
