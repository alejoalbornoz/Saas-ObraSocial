import { Router } from "express";
import {
  createShift,
  getShiftById,
  cancelShift,
  confirmShift,
  cancelShiftByDoctor,
  getMyShifts,
  getAvailableHours,
  cancelMyShift,
  getDoctorShifts,
} from "../controllers/shiftsController.js";
import {
  verifyToken,
  verifyDoctor,
  verifySubscription,
} from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", verifyToken, createShift);
router.get("/mine", verifyToken, getMyShifts);
router.get("/doctor/my-shifts", verifyToken, getDoctorShifts);
router.get("/:id", verifyToken, getShiftById);
router.get("/available/:doctorId", verifyToken, getAvailableHours);
router.patch("/cancelmyshift", verifyToken, cancelMyShift);
router.patch("/confirm/doctor/:id", verifyToken, verifyDoctor, confirmShift);
router.patch(
  "/cancel/doctor/:id",
  verifyToken,
  verifyDoctor,
  cancelShiftByDoctor
);
router.delete("/cancel/:id", verifySubscription, verifyToken, cancelShift);

export default router;
