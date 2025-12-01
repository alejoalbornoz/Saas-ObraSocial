import React from "react";
// import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-50  py-14 border-t border-blue-100">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Logo & descripción */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-blue-700">ObraSocial+</h3>
          <p className="text-gray-600 text-sm">
            Brindamos cobertura médica de calidad para vos y tu familia, con
            planes accesibles y atención personalizada.
          </p>
        </div>

        {/* Navegación */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold text-blue-700">Navegación</h4>
          <ul className="flex flex-col gap-2 text-gray-700 text-sm">
            <li className="hover:text-blue-600 cursor-pointer">Servicios</li>
            <li className="hover:text-blue-600 cursor-pointer">Planes</li>
            <li className="hover:text-blue-600 cursor-pointer">Nosotros</li>
            <li className="hover:text-blue-600 cursor-pointer">Contacto</li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold text-blue-700">Seguinos</h4>
          <div className="flex gap-5 text-blue-700">
            {/* <Facebook className="w-6 h-6 hover:text-blue-900 cursor-pointer" />
            <Instagram className="w-6 h-6 hover:text-blue-900 cursor-pointer" />
            <Twitter className="w-6 h-6 hover:text-blue-900 cursor-pointer" /> */}
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="w-full text-center mt-10 text-gray-500 text-xs">
        © {new Date().getFullYear()} ObraSocial+. Todos los derechos reservados.
      </div>
    </footer>
  );
}
