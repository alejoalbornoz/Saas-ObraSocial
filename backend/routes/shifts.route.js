import { Router } from "express";
import {
  createShift,
  getShiftById,
  cancelShift,
  confirmShift,
} from "../controllers/shiftsController.js";
import { verifyToken, verifyDoctor } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", verifyToken, createShift);
router.get("/:id", verifyToken, getShiftById);
router.patch("/confirm/:id", verifyDoctor, confirmShift);
router.delete("/cancel/:id", verifyToken, cancelShift);

export default router;
