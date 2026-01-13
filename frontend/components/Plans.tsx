"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

type Plan = {
  id: "BASICO" | "PREMIUM" | "PLATINO";
  name: string;
  priceMonthly: number;
  priceYearly?: number;
  features: string[];
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "BASICO",
    name: "Básico",
    priceMonthly: 5000,
    priceYearly: 50000,
    features: [
      "Consultas online ilimitadas",
      "Acceso a la cartilla básica",
      "Soporte por email",
    ],
  },
  {
    id: "PREMIUM",
    name: "Estándar",
    priceMonthly: 8000,
    priceYearly: 80000,
    highlight: true,
    features: [
      "Consultas presenciales y online",
      "Cobertura de medicamentos estándar",
      "Turnos prioritarios",
      "Soporte telefónico",
    ],
  },
  {
    id: "PLATINO",
    name: "Premium",
    priceMonthly: 12000,
    priceYearly: 120000,
    features: [
      "Especialistas sin coseguro",
      "Cobertura odontológica completa",
      "Exámenes anuales incluidos",
      "Gestor personal de casos",
    ],
  },
];

export default function Plans() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [loadingPlan, setLoadingPlan] = useState<
    "BASICO" | "PREMIUM" | "PLATINO" | null
  >(null);

  const formatPrice = (amount: number) => {
    return amount.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    });
  };

  async function handleSubscribe(planId: Plan["id"]) {
    try {
      setLoadingPlan(planId);

      const res = await fetch(
        "http://localhost:4000/api/subscriptions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ plan: planId }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al crear la suscripción");
      }

      const data = await res.json();

      if (!data.initPoint) {
        throw new Error("No se recibió URL de Mercado Pago");
      }

      window.location.href = data.initPoint;
    } catch (error) {
      console.error(error);
      alert("No se pudo iniciar la suscripción. Intentá nuevamente.");
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section className="w-full min-h-screen py-20 bg-gray-50 flex flex-col items-center gap-8">
      <div className="max-w-5xl w-full px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Planes pensados para vos
        </h2>
        <p className="mt-2 text-gray-600">
          Elegí el plan que mejor se adapte a tu familia. Podés cambiarlo cuando
          quieras.
        </p>

        <div className="mt-6 inline-flex items-center rounded-full bg-white p-1 shadow-sm">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-1 rounded-full transition-colors font-medium text-sm ${
              billing === "monthly" ? "bg-blue-600 text-white" : "text-gray-700"
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-4 py-1 rounded-full transition-colors font-medium text-sm ${
              billing === "yearly" ? "bg-blue-600 text-white" : "text-gray-700"
            }`}
          >
            Anual
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl p-8 shadow-md flex flex-col justify-between gap-6 transition-transform hover:-translate-y-2 ${
              plan.highlight ? "border-2 border-blue-100 shadow-lg" : ""
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Recomendado
              </div>
            )}

            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {plan.name}
              </h3>

              <div className="mt-4 flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {billing === "monthly"
                    ? formatPrice(plan.priceMonthly)
                    : formatPrice(plan.priceYearly ?? plan.priceMonthly * 10)}
                </span>
                <span className="text-sm text-gray-500">
                  / {billing === "monthly" ? "mes" : "año"}
                </span>
              </div>

              <ul className="mt-6 flex flex-col gap-3">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={loadingPlan === plan.id}
              className={`w-full py-3 rounded-lg font-semibold transition-opacity ${
                plan.highlight
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-800"
              } ${
                loadingPlan === plan.id ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loadingPlan === plan.id
                ? "Redirigiendo..."
                : plan.highlight
                ? "Elegir plan"
                : "Seleccionar"}
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-5xl w-full px-6 text-center text-sm text-gray-500">
        <p>
          Precios referenciales. La facturación y el cobro se realizan a través
          de Mercado Pago.
        </p>
      </div>
    </section>
  );
}
