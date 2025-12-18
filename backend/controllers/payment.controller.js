import mercadopago from "../config/mercadopago.config.js";
import { prisma } from "../config/prismaClient";

const PLAN_PRICE = {
  BASICO: 8000,
  PREMIUM: 15000,
  PLATINO: 22000,
};

export const createCheckout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plan } = req.body;

    const preference = {
      items: [
        {
          title: `Plan ${plan} - Obra Social`,
          quantity: 1,
          unit_price: PLAN_PRICE[plan],
          currency_id: "ARS",
        },
      ],
      payer: {
        email: req.user.email,
      },
      external_reference: `${userId}_${plan}`,
      back_urls: {
        success: "https://tuapp.com/pago-exitoso",
        failure: "https://tuapp.com/pago-fallido",
      },
      auto_return: "approved",
      notification_url: `${process.env.API_URL}/payments/webhook`,
    };

    const response = await mercadopago.preferences.create(preference);

    res.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando checkout" });
  }
};

export const mercadopagoWebhook = async (req, res) => {
  try {
    const paymentId = req.query["data.id"];
    if (!paymentId) return res.sendStatus(200);

    const payment = await mercadopago.payment.findById(paymentId);
    if (payment.body.status !== "approved") return res.sendStatus(200);

    const [userId, plan] = payment.body.external_reference.split("_");

    const now = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    // Expirar suscripciones activas
    await prisma.subscription.updateMany({
      where: {
        userId: Number(userId),
        status: "ACTIVE",
      },
      data: {
        status: "EXPIRED",
        endDate: now,
      },
    });

    // Crear nueva suscripción
    await prisma.subscription.create({
      data: {
        userId: Number(userId),
        plan,
        status: "ACTIVE",
        startDate: now,
        endDate,
        nextBilling: endDate,
      },
    });

    // Actualizar usuario
    await prisma.user.update({
      where: { id: Number(userId) },
      data: { afiliation: plan },
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook error:", error);
    res.sendStatus(500);
  }
};
