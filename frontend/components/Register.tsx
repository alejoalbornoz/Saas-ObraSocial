"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    DNI: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.lastName ||
      !form.DNI ||
      !form.email ||
      !form.password ||
      !form.password2
    ) {
      alert("Por favor completá todos los campos");
      return;
    }

    if (form.DNI.length < 7 || form.DNI.length > 8) {
      alert("El DNI debe tener entre 7 y 8 dígitos");
      return;
    }

    if (form.password !== form.password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (form.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          lastName: form.lastName,
          DNI: form.DNI,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al registrarse");
      }

      console.log(data);
      alert("Cuenta creada con éxito");

      setForm({
        name: "",
        lastName: "",
        DNI: "",
        email: "",
        password: "",
        password2: "",
      });

      router.push("/login");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Error al registrarse");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center mt-40">
      {/* COL IZQUIERDA – FORM CENTRADO */}
      <div className="flex justify-center items-center px-6 sm:px-12 lg:px-20 py-10">
        <div className="w-[500px]">
          <div className="mb-10">
            <Image src="/iconsalud.png" alt="logo" width={60} height={60} />
          </div>
          <h1 className="text-3xl font-semibold mb-6">Crear tu cuenta</h1>

          <form onSubmit={handleSubmit} className="flex flex-col">
          
            <label className="text-gray-700 font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ingresá tu nombre"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-blue-500"
            />

            
            <label className="text-gray-700 font-medium">Apellido</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Ingresá tu apellido"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-blue-500"
            />

            <label className="text-gray-700 font-medium">DNI</label>
            <input
              type="text"
              name="DNI"
              value={form.DNI}
              onChange={handleChange}
              placeholder="Ingresá tu DNI"
              maxLength={8}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-blue-500"
            />


            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ingresá tu email"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-blue-500"
            />

            <label className="text-gray-700 font-medium">Contraseña</label>
            <div className="relative mt-1 mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
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


            <label className="text-gray-700 font-medium">
              Repetir contraseña
            </label>
            <div className="relative mt-1 mb-6">
              <input
                type={showPassword2 ? "text" : "password"}
                name="password2"
                value={form.password2}
                onChange={handleChange}
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


            <button
              type="submit"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-lg py-2 text-lg font-medium"
            >
              Crear cuenta
            </button>
          </form>


          <p className="text-center text-sm mt-4">
            ¿Ya tenés cuenta?{" "}
            <Link
              href="/login"
              className="text-blue-700 font-semibold hover:underline"
            >
              Iniciá sesión
            </Link>
          </p>


          <div className="my-6 border-b"></div>

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


          <div className="mt-8 text-sm flex flex-col gap-2 text-center">
            <Link href="#" className="text-blue-700 hover:underline">
              Resolvé tus dudas
            </Link>
            <Link href="#" className="text-blue-700 hover:underline">
              ¿Necesitás ayuda?
            </Link>
            <Link href="#" className="text-blue-700 hover:underline">
              Ver Políticas de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
