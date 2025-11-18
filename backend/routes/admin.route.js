import { Router } from "express";
import { updateUserRole } from "../controllers/adminController.js";
import { verifyAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/update-role", verifyToken, verifyAdmin, updateUserRole);

export default router;
