"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <div className="h-screen w-full flex items-center justify-center  mt-20">
      {/* COL IZQUIERDA – FORM CENTRADO */}
      <div className="flex justify-center items-center px-6 sm:px-12 lg:px-20 py-10">
        <div className="w-full ">
          <div className="mb-10">
            <Image src="/iconsalud.png" alt="logo" width={60} height={60} />
          </div>
          <h1 className="text-3xl font-semibold mb-6">Crear tu cuenta</h1>
          {/* Nombre */}
          <label className="text-gray-700 font-medium">Nombre completo</label>
          <input
            type="text"
            placeholder="Ingresá tu nombre"
            className="w-full border border-gray-400 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-blue-500"
          />
          {/* Email */}
          <label className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            placeholder="Ingresá tu email"
            className="w-full border border-gray-400 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-blue-500"
          />
          {/* Password */}
          <label className="text-gray-700 font-medium">Contraseña</label>
          <div className="relative mt-1 mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Ingresá tu contraseña"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 pr-10 focus:outline-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              👁️
            </button>
          </div>
          {/* Repeat password */}
          <label className="text-gray-700 font-medium">
            Repetir contraseña
          </label>
          <div className="relative mt-1 mb-6">
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="Repetí tu contraseña"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 pr-10 focus:outline-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              👁️
            </button>
          </div>
          {/* Botón crear cuenta */}
          <button className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-lg py-2 text-lg font-medium">
            Crear cuenta
          </button>
          {/* Ya tiene cuenta */}
          <p className="text-center text-sm mt-4">
            ¿Ya tenés cuenta?{" "}
            <Link
              href="/login"
              className="text-blue-700 font-semibold hover:underline"
            >
              Iniciá sesión
            </Link>
          </p>
          {/* Separador */}
          <div className="my-6 border-b"></div>
          {/* Social logins */}
          <button className="w-full border border-gray-300 bg-white rounded-lg py-2 mb-3 flex items-center justify-center gap-2 hover:bg-gray-50">
            <Image src="/google.png" alt="google" width={20} height={20} />
            Registrarte con Google
          </button>
          <button className="w-full border border-gray-300 bg-white rounded-lg py-2 mb-3 flex items-center justify-center gap-2 hover:bg-gray-50">
            <Image src="/facebook.png" alt="facebook" width={20} height={20} />
            Registrarte con Facebook
          </button>
          <button className="w-full border border-gray-300 bg-white rounded-lg py-2 mb-6 flex items-center justify-center gap-2 hover:bg-gray-50">
            <Image src="/apple.png" alt="apple" width={20} height={20} />
            Registrarte con Apple
          </button>
          {/* Links de ayuda */}
          <div className="mt-8 text-sm flex flex-col gap-2 text-center">
            <a href="#" className="text-blue-700 hover:underline">
              Resolvé tus dudas
            </a>
            <a href="#" className="text-blue-700 hover:underline">
              ¿Necesitás ayuda?
            </a>
            <a href="#" className="text-blue-700 hover:underline">
              Ver Políticas de Privacidad
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
