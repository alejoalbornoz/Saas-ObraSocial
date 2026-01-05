import { prisma } from "../config/prismaClient.config.js";
import { AfiliationPlan, SubscriptionStatus } from "@prisma/client";
import { PreApproval } from "mercadopago";
import { mercadopago } from "../config/mercadopago.config.js";

const PLAN_PRICE = {
  BASICO: 5000,
  PREMIUM: 8000,
  PLATINO: 12000,
};

export async function createSubscription(req, res) {
  try {
    const userId = req.user.id;
    const { plan } = req.body;

    if (!plan || !Object.values(AfiliationPlan).includes(plan)) {
      return res.status(400).json({ message: "Plan inválido" });
    }

    const existing = await prisma.subscription.findFirst({
      where: {
        userId,
        status: SubscriptionStatus.ACTIVE,
      },
    });

    if (existing) {
      return res.status(400).json({
        message: "Ya tenés una suscripción activa",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // 1️⃣ Crear suscripción en Mercado Pago
    const preapproval = await new PreApproval(mercadopago).create({
      body: {
        reason: `Plan ${plan}`,
        payer_email: user.email,
        back_url: process.env.APP_URL,
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: PLAN_PRICE[plan],
          currency_id: "ARS",
        },
        status: "pending",
      },
    });

    // 2️⃣ Guardar suscripción local (SIN activar)
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        plan,
        status: SubscriptionStatus.PENDING,
        mpPreapprovalId: preapproval.id,
      },
    });

    return res.json({
      message: "Suscripción creada. Redirigir a Mercado Pago.",
      initPoint: preapproval.init_point,
      subscription,
    });
  } catch (error) {
    console.error("Error en createSubscription:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function cancelSubscription(req, res) {
  try {
    const userId = req.user.id;

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: {
          in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.PENDING],
        },
      },
    });

    if (!subscription) {
      return res.status(404).json({ message: "No tenés suscripción activa" });
    }

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: SubscriptionStatus.CANCELLED,
        endDate: new Date(),
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { afiliation: "NO_AFILIADO" },
    });

    return res.json({ message: "Suscripción cancelada correctamente" });
  } catch (error) {
    console.error("Error al cancelar suscripción:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
