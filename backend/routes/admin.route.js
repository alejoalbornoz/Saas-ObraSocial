import { Router } from "express";
import {
  updateUserRole,
  getUserById,
  getAllUsers,
} from "../controllers/admin.controller.js";
import { verifyAdmin, verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.put("/update-role", verifyToken, verifyAdmin, updateUserRole);
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.get("/user/:id", verifyToken, verifyAdmin, getUserById);

export default router;
