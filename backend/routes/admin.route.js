import { Router } from "express";
import { updateUserRole } from "../controllers/adminController.js";

const router = Router();

router.post("/update-role", updateUserRole);

export default router;