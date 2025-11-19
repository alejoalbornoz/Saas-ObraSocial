import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  updateUserInfo,
  changeOwnPassword,
  deleteUserAccount,
} from "../controllers/usersController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/", getAllUsers);
router.patch("/update", verifyToken, updateUserInfo);
router.patch("/change-password", verifyToken, changeOwnPassword);
router.delete("/delete-account", verifyToken, deleteUserAccount);

export default router;
