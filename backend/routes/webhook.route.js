import { Router } from "express";
import { mercadopagoWebhook } from "../controllers/webhook.controller.js";

const router = Router();

router.post("/mercadopago", mercadopagoWebhook);

export default router;
