import { Router } from "express";

import {
  createSubscription,
  cancelSubscription,
} from "../controllers/suscriptionsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", verifyToken, createSubscription);
router.patch("/cancel", verifyToken, cancelSubscription);
export default router;
