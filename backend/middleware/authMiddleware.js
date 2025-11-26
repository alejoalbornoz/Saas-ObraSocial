import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envconfig.js";

import { prisma } from "../config/prismaClient.js";
import { SubscriptionStatus } from "@prisma/client";

export function verifyToken(req, res, next) {
  try {
    const cookieToken = req.cookies?.token;
    const headerToken = req.headers.authorization?.replace("Bearer ", "");

    const token = cookieToken || headerToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No autorizado: Token no proporcionado" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

export function verifyAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "Acceso denegado. Requiere rol ADMIN." });
  }

  return next();
}

export async function verifyDoctor(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No autorizado. Falta token." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }

    if (user.role !== "MEDICO") {
      return res
        .status(403)
        .json({ message: "Acceso denegado. No sos medico." });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
}

export async function verifySubscription(req, res, next) {
  try {
    const userId = req.user.id;

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: { in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.PENDING] },
      },
    });

    if (!subscription) {
      return res.status(403).json({
        message: "Necesitás una suscripción activa para acceder a este recurso",
      });
    }

    // (Opcional) Verificar fecha si querés manejar expiraciones
    if (subscription.endDate && subscription.endDate < new Date()) {
      return res.status(403).json({
        message: "Tu suscripción ha expirado",
      });
    }

    next();
  } catch (error) {
    console.error("Error en verifySubscription:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
