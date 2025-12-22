import { prisma } from "../config/prismaClient.config.js";
import { AfiliationPlan, SubscriptionStatus } from "@prisma/client";

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

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        plan,
        status: SubscriptionStatus.PENDING,
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { afiliation: plan },
    });

    return res.json({
      message: "Suscripción creada. Falta completar el pago.",
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
        status: { in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.PENDING] },
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
