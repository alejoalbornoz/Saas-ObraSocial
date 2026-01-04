"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly?: number;
  features: string[];
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Básico",
    priceMonthly: 19900,
    priceYearly: 199000,
    features: [
      "Consultas online ilimitadas",
      "Acceso a la cartilla básica",
      "Soporte por email",
    ],
  },
  {
    id: "standard",
    name: "Estándar",
    priceMonthly: 49900,
    priceYearly: 499000,
    highlight: true,
    features: [
      "Consultas presenciales y online",
      "Cobertura de medicamentos estándar",
      "Turnos prioritarios",
      "Soporte telefónico",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    priceMonthly: 89900,
    priceYearly: 899000,
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

  const formatPrice = (amount: number) => {
    // formato simple para ARS
    return amount.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    });
  };

  return (
    <section className="w-full h-screen  py-20 bg-gray-50 flex flex-col justify-center items-center gap-8">
      <div className="max-w-5xl w-full px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Planes pensados para vos
        </h2>
        <p className="mt-2 text-gray-600">
          Elegí el plan que mejor se adapte a tu familia. Cambiá fácilmente
          entre facturación mensual o anual.
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
              <p className="mt-3 text-sm text-gray-600">
                Ideal para {plan.name.toLowerCase()} y familias pequeñas.
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <button
                className={`w-full py-3 rounded-lg font-semibold ${
                  plan.highlight
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-800"
                }`}
              >
                {plan.highlight ? "Elegir plan" : "Seleccionar"}
              </button>
              <a className="text-xs text-center text-gray-500 hover:text-gray-700">
                Ver detalle del plan
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-5xl w-full px-6 text-center text-sm text-gray-500">
        <p>
          Precios referenciales. Los valores pueden variar según la región y el
          grupo familiar.
        </p>
      </div>
    </section>
  );
}
