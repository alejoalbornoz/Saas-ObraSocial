import { Router } from "express";
import { createShift } from "../controllers/shiftsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", verifyToken, createShift);

export default router;
