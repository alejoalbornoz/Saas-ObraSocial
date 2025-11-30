"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* COL IZQUIERDA – FORM */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-10">
        {/* Logo */}
        <div className="mb-10">
          <Image src="/iconsalud.png" alt="logo" width={60} height={60} />
        </div>

        <h1 className="text-3xl font-semibold mb-6">Iniciá sesión</h1>

        {/* Email */}
        <label className="text-gray-700 font-medium">Email</label>
        <input
          type="email"
          placeholder="Ingresá tu email"
          className="w-full border border-gray-400 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-blue-500"
        />

        {/* Password */}
        <label className="text-gray-700 font-medium">Contraseña</label>
        <div className="relative mt-1">
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

        {/* Botón ingresar */}
        <button className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-lg py-2 mt-6 text-lg font-medium">
          Ingresar
        </button>

        {/* Recuperación */}
        <div className="flex justify-between text-sm mt-3 text-blue-700">
          <a href="#" className="hover:underline">
            ¿Olvidaste tu email?
          </a>
          <a href="#" className="hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Separador */}
        <div className="my-6 border-b"></div>

        {/* Social logins */}
        <button className="w-full border border-gray-300 bg-white rounded-lg py-2 mb-3 flex items-center justify-center gap-2 hover:bg-gray-50">
          <Image src="/google.png" alt="google" width={20} height={20} />
          Continuar con Google
        </button>

        <button className="w-full border border-gray-300 bg-white rounded-lg py-2 mb-3 flex items-center justify-center gap-2 hover:bg-gray-50">
          <Image src="/facebook.png" alt="facebook" width={20} height={20} />
          Continuar con Facebook
        </button>

        <button className="w-full border border-gray-300 bg-white rounded-lg py-2 mb-6 flex items-center justify-center gap-2 hover:bg-gray-50">
          <Image src="/apple.png" alt="apple" width={20} height={20} />
          Continuar con Apple
        </button>

        {/* Crear cuenta */}
        <p className="text-center text-sm">
          ¿No tenés cuenta?{" "}
          <Link
            href="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            Creala ahora
          </Link>
        </p>

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

      {/* COL DERECHA – IMAGEN */}
      <div className="hidden md:block relative">
        <Image
          src="/doctor.jpg"
          alt="Login Image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
