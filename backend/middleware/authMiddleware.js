import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/envconfig.js";

export function verifyToken(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      res
        .status(401)
        .json({ message: "No autorizado: Token no proporcionado" });
    }

    if (!JWT_SECRET) {
      throw new Error("Falta el JWT_SECRET");
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();

  } catch (error) {
    console.error("Error en autenticación:", error);
    return res.status(401).json({ message: "Token inválido o expirado"})
  }
}
