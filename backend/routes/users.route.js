import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/usersController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
