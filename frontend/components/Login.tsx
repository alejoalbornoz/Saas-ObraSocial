"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      window.location.href = "/home-user";
    } catch (err) {
      setError("Error de conexión. Intenta nuevamente.");
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-10">
        {/* Logo */}
        <div className="mb-10">
          <Image src="/iconsalud.png" alt="logo" width={60} height={60} />
        </div>

        <h1 className="text-3xl font-semibold mb-6">Iniciá sesión</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <label className="text-gray-700 font-medium">Email</label>
        <input
          type="email"
          placeholder="Ingresá tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border border-gray-400 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-blue-500"
          required
        />

        <label className="text-gray-700 font-medium">Contraseña</label>
        <div className="relative mt-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Ingresá tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-400 rounded-lg px-4 py-2 pr-10 focus:outline-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            👁️
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-lg py-2 mt-6 text-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <div className="flex justify-between text-sm mt-3 text-blue-700">
          <a href="#" className="hover:underline">
            ¿Olvidaste tu email?
          </a>
          <a href="#" className="hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <div className="my-6 border-b"></div>

       

        <p className="text-center text-sm">
          ¿No tenés cuenta?{" "}
          <Link
            href="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            Creala ahora
          </Link>
        </p>

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
