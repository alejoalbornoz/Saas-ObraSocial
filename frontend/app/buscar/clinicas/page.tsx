import React from "react";

type Clinic = {
  id: number;
  name: string;
  specialty: string;
  address: string;
  phone: string;
};

const clinics: Clinic[] = [
  {
    id: 1,
    name: "Clínica San Martín",
    specialty: "Clínica Médica · Cardiología",
    address: "Av. San Martín 1234",
    phone: "011 4567-8901",
  },
  {
    id: 2,
    name: "Centro Médico Norte",
    specialty: "Pediatría · Ginecología",
    address: "Belgrano 567",
    phone: "011 4321-9876",
  },
  {
    id: 3,
    name: "Instituto Vida",
    specialty: "Traumatología · Kinesiología",
    address: "Av. Libertador 2450",
    phone: "011 4789-1122",
  },
];

export default function MedicalCenters() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-6 py-12 ">
      <div className="max-w-6xl mx-auto h-screen mt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Nuestra Red de Clínicas
          </h1>
          <p className="text-gray-600 text-lg">
            Elegí el centro médico más cercano y atendete con profesionales de
            confianza
          </p>
        </div>

        {/* Clinics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              className="bg-white rounded-2xl shadow-md border border-sky-100 p-6 hover:shadow-lg transition"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-blue-700">
                  {clinic.name}
                </h2>
                <p className="text-blue-500 text-sm font-medium">
                  {clinic.specialty}
                </p>
              </div>

              <div className="text-gray-600 text-sm space-y-2">
                <p>
                  📍 <span className="font-medium">{clinic.address}</span>
                </p>
                <p>
                  📞 <span className="font-medium">{clinic.phone}</span>
                </p>
              </div>

              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition">
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
