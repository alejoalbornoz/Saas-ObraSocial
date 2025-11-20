import { Router } from "express";
import {
  createShift,
  getShiftById,
  cancelShift,
} from "../controllers/shiftsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", verifyToken, createShift);
router.get("/:id", verifyToken, getShiftById);
router.delete("/cancel/:id", verifyToken, cancelShift);

export default router;
