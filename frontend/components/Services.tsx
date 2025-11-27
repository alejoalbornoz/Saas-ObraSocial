import React from "react";
import { HeartPulse, Pill, Hospital } from "lucide-react";

export default function Servicios() {
  const services = [
    {
      title: "Atención médica",
      desc: "Consultas médicas y atención primaria para todos los afiliados.",
      icon: <HeartPulse className="w-10 h-10" />,
    },
    {
      title: "Cobertura de medicamentos",
      desc: "Acceso a una amplia variedad de medicamentos y tratamientos.",
      icon: <Pill className="w-10 h-10" />,
    },
    {
      title: "Odontología",
      desc: "Servicios odontológicos para el cuidado de tu salud bucal.",
      icon: <Hospital className="w-10 h-10" />,
    },
  ];

  return (
    <section className="w-full py-20 bg-white flex flex-col items-center gap-14">
      <h2 className="text-[50px] font-bold text-center">Nuestros servicios</h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl px-6"
        id="services"
      >
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-blue-100 rounded-2xl shadow-md p-12 flex flex-col items-center text-center gap-6 hover:shadow-lg transition-shadow duration-300 min-h-[280px]"
          >
            <div className="text-blue-500">{s.icon}</div>
            <h3 className="text-[30px] font-semibold">{s.title}</h3>
            <p className="text-gray-600 text-[20px]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
