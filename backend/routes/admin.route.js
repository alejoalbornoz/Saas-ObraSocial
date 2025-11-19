import { Router } from "express";
import {
  updateUserRole,
  getUserById,
  getAllUsers,
} from "../controllers/adminController.js";
import { verifyAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/update-role", verifyToken, verifyAdmin, updateUserRole);
router.get("/user", verifyToken, verifyAdmin, getAllUsers);
router.get("/user/:id", verifyToken, verifyAdmin, getUserById);

export default router;
