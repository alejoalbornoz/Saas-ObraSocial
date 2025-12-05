import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section className="w-full h-screen py-20 bg-white flex flex-col justify-center items-center gap-12">
      <div className="max-w-4xl w-full px-6 text-center mt-20">
        <h2 className="text-4xl font-bold text-gray-800">Contacto</h2>
        <p className="mt-3 text-gray-600 text-sm sm:text-base">
          Estamos para ayudarte. Escribinos, llamanos o acercate a nuestras
          oficinas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full px-6">
        <div className="flex flex-col items-center text-center gap-3 bg-blue-50 p-8 rounded-2xl shadow-sm">
          <Mail className="w-8 h-8 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Email</h3>
          <p className="text-gray-600 text-sm">soporte@obrasocialplus.com</p>
        </div>

        <div className="flex flex-col items-center text-center gap-3 bg-blue-50 p-8 rounded-2xl shadow-sm">
          <Phone className="w-8 h-8 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Teléfono</h3>
          <p className="text-gray-600 text-sm">0800-555-1234</p>
        </div>

        <div className="flex flex-col items-center text-center gap-3 bg-blue-50 p-8 rounded-2xl shadow-sm">
          <MapPin className="w-8 h-8 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Oficina</h3>
          <p className="text-gray-600 text-sm">Av. Salud 123, Buenos Aires</p>
        </div>
      </div>

      <div className="max-w-3xl w-full px-6 bg-gray-50 p-10 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Envíanos un mensaje
        </h3>
        <form className="grid grid-cols-1 gap-6">
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Tu mensaje"
            rows={4}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}
