import { prisma } from "../config/prismaClient.js";

/**
 * Crear un turno médico
 * El paciente selecciona al médico por nombre y especialidad,
 * NO por ID.
 */

export async function createShift(req, res) {
  const { doctorName, doctorLastName, specialty, date } = req.body;

  try {
    // Validaciones básicas
    if (!doctorName || !specialty || !date) {
      return res.status(400).json({
        message: "Debe enviar el nombre del doctor, la especialidad y la fecha",
      });
    }

    const shiftDate = new Date(date);
    if (isNaN(shiftDate.getTime())) {
      return res.status(400).json({ message: "La fecha es inválida" });
    }

    // Buscar al médico (Doctor + User)
    const doctor = await prisma.doctor.findFirst({
      where: {
        specialty,
        user: {
          name: doctorName,
          ...(doctorLastName && { lastName: doctorLastName }),
        },
      },
      include: {
        user: true,
      },
    });

    if (!doctor) {
      return res.status(404).json({
        message: "No se encontró un médico con ese nombre y especialidad",
      });
    }

    // Verificar disponibilidad del médico
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

    // Verificar disponibilidad del paciente
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

    // Crear el turno
    const newShift = await prisma.shift.create({
      data: {
        date: shiftDate,
        patientId: req.user.id,
        doctorId: doctor.id,
      },
      include: {
        patient: true,
        doctor: {
          include: { user: true },
        },
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
