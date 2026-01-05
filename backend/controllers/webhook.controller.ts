import { Request, Response } from "express";
import { PreApproval } from "mercadopago";
import { mercadopago } from "../config/mercadopago.config";
import { prisma } from "../config/prismaClient.config.js";

export const mercadopagoWebhook = async (req: Request, res: Response) => {
  const { type, data } = req.body;

  if (type !== "subscription_preapproval") {
    return res.sendStatus(200);
  }

  const preapproval = await new PreApproval(mercadopago).get({
    id: data.id,
  });

  const subscription = await prisma.subscription.findUnique({
    where: { mpPreapprovalId: preapproval.id },
  });

  if (!subscription) {
    return res.sendStatus(200);
  }

  if (preapproval.status === "authorized") {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: "ACTIVE",
        startDate: preapproval.date_created 
          ? new Date(preapproval.date_created)
          : new Date(),
        nextBilling: preapproval.next_payment_date
          ? new Date(preapproval.next_payment_date)
          : null,
      },
    });

    await prisma.user.update({
      where: { id: subscription.userId },
      data: {
        afiliation: subscription.plan,
      },
    });
  }

  if (preapproval.status === "cancelled") {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: "CANCELLED",
        endDate: new Date(),
      },
    });
  }

  return res.sendStatus(200);
};