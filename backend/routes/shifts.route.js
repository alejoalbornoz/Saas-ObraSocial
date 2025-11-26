import { Router } from "express";
import {
  createShift,
  getShiftById,
  cancelShift,
  confirmShift,
  cancelShiftByDoctor,
} from "../controllers/shiftsController.js";
import {
  verifyToken,
  verifyDoctor,
  verifySubscription,
} from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", verifySubscription, verifyToken, createShift);
router.get("/:id", verifySubscription, verifyToken, getShiftById);
router.patch("/confirm/doctor/:id", verifyToken, verifyDoctor, confirmShift);
router.patch(
  "/cancel/doctor/:id",
  verifyToken,
  verifyDoctor,
  cancelShiftByDoctor
);
router.delete("/cancel/:id", verifySubscription, verifyToken, cancelShift);

export default router;
