import { Router } from "express";

import {
  createSubscription,
  cancelSubscription,
} from "../controllers/suscriptions.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create", verifyToken, createSubscription);
router.patch("/cancel", verifyToken, cancelSubscription);
export default router;
