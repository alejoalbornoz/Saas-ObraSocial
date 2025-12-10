import { prisma } from "../config/prismaClient.js";

import { ShiftStatus } from "@prisma/client";

export async function createShift(req, res) {
  const { doctorName, doctorLastName, specialty, date } = req.body;

  try {
    if (!doctorName || !specialty || !date) {
      return res.status(400).json({
        message: "Debe enviar el nombre del doctor, la especialidad y la fecha",
      });
    }

    const shiftDate = new Date(date);
    if (isNaN(shiftDate.getTime())) {
      return res.status(400).json({ message: "La fecha es inválida" });
    }

    const day = shiftDate.getDay();
    if (day === 0 || day === 6) {
      return res.status(400).json({
        message: "Solo se pueden pedir turnos de lunes a viernes",
      });
    }

    const hour = shiftDate.getHours();
    if (hour < 9 || hour > 18) {
      return res.status(400).json({
        message: "El horario debe ser entre las 9:00 y 18:00",
      });
    }


    const doctor = await prisma.doctor.findFirst({
      where: {
        specialty,
        user: {
          name: doctorName,
          ...(doctorLastName && { lastName: doctorLastName }),
        },
      },
      include: { user: true },
    });

    if (!doctor) {
      return res.status(404).json({
        message: "No se encontró un médico con ese nombre y especialidad",
      });
    }

 
    const existingDoctorShift = await prisma.shift.findFirst({
      where: {
        doctorId: doctor.id,
        date: shiftDate,
      },
    });

    if (existingDoctorShift) {
      return res.status(400).json({
        message: "Ese horario ya está ocupado para este médico",
      });
    }

    const existingPatientShift = await prisma.shift.findFirst({
      where: {
        patientId: req.user.id,
        date: shiftDate,
      },
    });

    if (existingPatientShift) {
      return res.status(400).json({
        message: "Ya tenés un turno reservado en ese horario",
      });
    }

    const newShift = await prisma.shift.create({
      data: {
        date: shiftDate,
        patientId: req.user.id,
        doctorId: doctor.id,
      },
      include: {
        patient: true,
        doctor: { include: { user: true } },
      },
    });

    return res.status(201).json({
      message: "Turno creado con éxito",
      shift: newShift,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el turno" });
  }
}

export async function getAvailableHours(req, res) {
  const { doctorId } = req.params;
  const { date } = req.query;

  try {
    const baseDate = new Date(date);
    if (isNaN(baseDate.getTime())) {
      return res.status(400).json({ message: "Fecha inválida" });
    }

    
    const hours = [];
    for (let h = 9; h <= 18; h++) {
      hours.push(h);
    }

    const shifts = await prisma.shift.findMany({
      where: {
        doctorId: Number(doctorId),
        date: {
          gte: new Date(`${date}T00:00:00`),
          lt: new Date(`${date}T23:59:59`),
        },
      },
    });

    const reservedHours = shifts.map((s) => new Date(s.date).getHours());

    const availableHours = hours.filter((h) => !reservedHours.includes(h));

    return res.json({ availableHours });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error" });
  }
}

export async function getShiftById(req, res) {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const { id } = req.params;

    const shift = await prisma.shift.findUnique({
      where: { id: Number(id) },
      include: {
        patient: {
          select: { id: true, name: true, lastName: true, email: true },
        },
        doctor: {
          include: {
            user: {
              select: { id: true, name: true, lastName: true, email: true },
            },
          },
        },
      },
    });

    if (!shift) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    const isPatient = shift.patientId === userId;
    const isDoctor = shift.doctor.userId === userId;
    const isAdmin = userRole === "ADMIN";

    if (!isPatient && !isDoctor && !isAdmin) {
      return res
        .status(403)
        .json({ message: "No tenés permiso para ver este turno" });
    }

    return res.json(shift);
  } catch (error) {
    console.error("Error al obtener turno:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function getMyShifts(req, res) {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let shifts = [];

    if (userRole === "USUARIO") {
      shifts = await prisma.shift.findMany({
        where: { patientId: userId },
        orderBy: { date: "desc" },
        include: {
          patient: {
            select: { id: true, name: true, lastName: true, email: true },
          },
          doctor: {
            include: {
              user: {
                select: { id: true, name: true, lastName: true, email: true },
              },
            },
          },
        },
      });
    } else if (userRole === "MEDICO") {
      shifts = await prisma.shift.findMany({
        where: {
          doctor: { userId: userId },
        },
        orderBy: { date: "desc" },
        include: {
          patient: {
            select: { id: true, name: true, lastName: true, email: true },
          },
          doctor: {
            include: {
              user: {
                select: { id: true, name: true, lastName: true, email: true },
              },
            },
          },
        },
      });
    } else if (userRole === "ADMIN") {
      shifts = await prisma.shift.findMany({
        orderBy: { date: "desc" },
        include: {
          patient: {
            select: { id: true, name: true, lastName: true, email: true },
          },
          doctor: {
            include: {
              user: {
                select: { id: true, name: true, lastName: true, email: true },
              },
            },
          },
        },
      });
    }

    return res.json(shifts);
  } catch (error) {
    console.error("Error al obtener turnos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function cancelShift(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const shift = await prisma.shift.findUnique({
      where: { id: Number(id) },
    });

    if (!shift) {
      return res.status(404).json({ message: "El turno no existe" });
    }

    if (shift.patientId !== userId) {
      return res
        .status(403)
        .json({ message: "No tenes permiso para cancelar este turno" });
    }

    const updatedShift = await prisma.shift.update({
      where: { id: Number(id) },
      data: { status: ShiftStatus.CANCELADO },
    });

    return res.json({
      message: "Turno cancelado exitosamente",
      turno: updatedShift,
    });
  } catch (error) {
    console.error("Error al cancelar turno:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function confirmShift(req, res) {
  try {
    const doctorUserId = req.user.id;
    const { id } = req.params;

    const doctor = await prisma.doctor.findUnique({
      where: { userId: doctorUserId },
    });

    if (!doctor) {
      return res
        .status(403)
        .json({ message: "Solo los médicos pueden confirmar turnos." });
    }

    const shift = await prisma.shift.findUnique({
      where: { id: Number(id) },
    });

    if (!shift) {
      return res.status(404).json({ message: "Turno no encontrado." });
    }

    if (shift.doctorId !== doctor.id) {
      return res.status(403).json({
        message: "No tenés permiso para confirmar este turno.",
      });
    }

    if (shift.status !== ShiftStatus.PENDIENTE) {
      return res.status(400).json({
        message: `El turno no puede ser confirmado porque está ${shift.status}.`,
      });
    }

    const updatedShift = await prisma.shift.update({
      where: { id: shift.id },
      data: { status: ShiftStatus.CONFIRMADO },
    });

    return res.json({
      message: "Turno confirmado correctamente.",
      turno: updatedShift,
    });
  } catch (error) {
    console.error("Error al confirmar turno:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function cancelShiftByDoctor(req, res) {
  try {
    const doctorUserId = req.user.id;
    const { id } = req.params;

    const doctor = await prisma.doctor.findUnique({
      where: { userId: doctorUserId },
    });

    if (!doctor) {
      return res
        .status(403)
        .json({ message: "Solo los médicos pueden cancelar turnos." });
    }

    const shift = await prisma.shift.findUnique({
      where: { id: Number(id) },
    });

    if (!shift) {
      return res.status(404).json({ message: "Turno no encontrado." });
    }

    if (shift.doctorId !== doctor.id) {
      return res.status(403).json({
        message: "No tenés permiso para cancelar este turno.",
      });
    }

    if (shift.status === ShiftStatus.CANCELADO) {
      return res.status(400).json({ message: "El turno ya está cancelado." });
    }

    const updatedShift = await prisma.shift.update({
      where: { id: shift.id },
      data: { status: ShiftStatus.CANCELADO },
    });

    return res.json({
      message: "Turno cancelado correctamente por el médico.",
      turno: updatedShift,
    });
  } catch (error) {
    console.error("Error al cancelar turno como médico:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
