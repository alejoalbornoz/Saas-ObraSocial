"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";

type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
};

export default function HomeUser() {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const cards = [
    {
      id: "medicos",
      title: "Buscar médicos",
      desc: "Encontrá especialistas, filtros por especialidad y turnos disponibles.",
      href: "/buscar/doctores",
      emoji: "🩺",
    },
    {
      id: "clinicas",
      title: "Buscar clínicas",
      desc: "Buscá centros de atención y sucursales cerca tuyo.",
      href: "/buscar/clinicas",
      emoji: "🏥",
    },
    {
      id: "farmacias",
      title: "Buscar farmacias",
      desc: "Localizá farmacias adheridas y cobertura de medicamentos.",
      href: "/buscar/farmacias",
      emoji: "💊",
    },
    {
      id: "estudios",
      title: "Solicitar un estudio / tratamiento",
      desc: "Iniciá la solicitud para estudios, autorizaciones y tratamientos.",
      href: "/buscar/contacto-solicitud",
      emoji: "🧪",
    },
  ];

  const router = useRouter();

  useEffect(() => {
    let redirected = false;

    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:4000/api/users/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
      

          if (!redirected && data.user.afiliation === "NO_AFILIADO") {
            redirected = true;
            router.replace("/planes");
            showToast.warning("¡Elija un Plan para Afiliarse!", {
              duration: 10000,
              progress: true,
              position: "bottom-right",
              transition: "slideInUp",
              icon: "",
              sound: false,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-14">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-blue-400 flex items-center justify-center text-white font-bold">
              OS
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                Obra Social
              </h1>
              <p className="text-sm text-gray-500">Panel de afiliado</p>
            </div>
          </div>
        </header>
        <section className="mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Hola,{" "}
            <span className="text-blue-600">
              {loading
                ? "Cargando..."
                : user
                ? `${user.name} ${user.lastName}`
                : "Usuario no encontrado"}
            </span>
          </h2>
          <p className="mt-2 text-gray-600">
            ¿En qué te podemos ayudar hoy? Elegí una opción rápida.
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((c) => (
              <Link
                key={c.id}
                href={c.href}
                className="group block bg-white rounded-xl border border-transparent hover:border-blue-100 shadow-sm hover:shadow-md  transition-transform transform hover:-translate-y-1 p-6"
                aria-label={c.title}
              >
                <div className="flex items-center gap-5">
                  <div className="flex-none w-16 h-16 rounded-lg bg-blue-50 flex items-center justify-center text-3xl">
                    <span aria-hidden>{c.emoji}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="mt-8 text-sm text-gray-500">
          <p>
            Si necesitás asistencia para gestionar autorizaciones o turnos,
            contactá a soporte desde{" "}
            <Link href="/contacto" className="text-blue-600 hover:underline">
              Contacto
            </Link>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
