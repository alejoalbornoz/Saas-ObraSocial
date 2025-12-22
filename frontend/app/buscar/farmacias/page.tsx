import React from "react";

type Pharmacy = {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  guard?: boolean;
};

const pharmacies: Pharmacy[] = [
  {
    id: 1,
    name: "Farmacia Central",
    address: "Av. Corrientes 1540",
    phone: "011 4444-2211",
    hours: "Lun a Vie · 8:00 a 20:00",
    guard: true,
  },
  {
    id: 2,
    name: "Farmacia Salud Norte",
    address: "Av. Cabildo 3200",
    phone: "011 4777-8899",
    hours: "Todos los días · 9:00 a 21:00",
  },
  {
    id: 3,
    name: "Farmacia Vida",
    address: "Av. Libertador 890",
    phone: "011 4555-6677",
    hours: "Lun a Sáb · 8:30 a 19:30",
  },
];

export default function Pharmacies() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-6 py-12">
      <div className="max-w-6xl mx-auto mt-20 h-screen">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">
            Farmacias Adheridas
          </h1>
          <p className="text-gray-600 text-lg">
            Encontrá farmacias cercanas y accedé a tus beneficios
          </p>
        </div>

        {/* Pharmacies grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pharmacies.map((pharmacy) => (
            <div
              key={pharmacy.id}
              className="relative bg-white rounded-2xl shadow-md border border-blue-100 p-6 hover:shadow-lg transition"
            >
              {pharmacy.guard && (
                <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Turno
                </span>
              )}

              <div className="mb-4">
                <h2 className="text-xl font-semibold text-blue-700">
                  {pharmacy.name}
                </h2>
              </div>

              <div className="text-gray-600 text-sm space-y-2">
                <p>
                  📍 <span className="font-medium">{pharmacy.address}</span>
                </p>
                <p>
                  📞 <span className="font-medium">{pharmacy.phone}</span>
                </p>
                <p>
                  ⏰ <span className="font-medium">{pharmacy.hours}</span>
                </p>
              </div>

              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition">
                Ver farmacia
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
