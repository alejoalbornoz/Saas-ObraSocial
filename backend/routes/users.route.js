import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserInfo,
  changeOwnPassword,
  deleteUserAccount,
  getAllDoctors,
  getDoctorById,
  getMe,
} from "../controllers/users.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/doctors", verifyToken, getAllDoctors);
router.get("/doctors/:id", verifyToken, getDoctorById);
router.get("/me", verifyToken, getMe);
router.patch("/update", verifyToken, updateUserInfo);
router.patch("/change-password", verifyToken, changeOwnPassword);
router.delete("/delete-account", verifyToken, deleteUserAccount);

export default router;
