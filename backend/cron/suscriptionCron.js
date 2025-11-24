import cron from "node-cron";
import { prisma } from "../config/prismaClient.js";

// Ejecutar todos los días a las 00:00 
//Simulacion de cobro y renovacion de suscripciones
cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Ejecutando CRON de renovaciones de suscripción...");

  const now = new Date();

  // Obtener suscripciones que deben renovarse
  const subscriptions = await prisma.subscription.findMany({
    where: {
      status: "ACTIVE",
      nextBilling: {
        lte: now,
      },
    },
  });

  for (const sub of subscriptions) {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    await prisma.subscription.update({
      where: { id: sub.id },
      data: {
        nextBilling: nextMonth,       // próxima fecha de pago
        endDate: null,                // sigue activa
        status: "ACTIVE",             // por si se marcó distinto
      },
    });

    console.log(`Suscripción #${sub.id} renovada.`);
  }
});
