"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Doctor = {
  id: number;
  specialty: string;
  bio: string | null;
  user: {
    id: number;
    name: string;
    lastName: string;
    email: string;
  };
};

export default function SearchDoctor() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const alreadyRedirected = useRef(false);

  useEffect(() => {
    async function checkUser() {
      try {
        // 👉 Primero pedir al usuario
        const userRes = await fetch("http://localhost:4000/api/users/me", {
          credentials: "include",
        });

        if (!userRes.ok) return;

        const userData = await userRes.json();

        if (
          userData.user.afiliation === "NO_AFILIADO" &&
          !alreadyRedirected.current
        ) {
          alreadyRedirected.current = true;
          router.replace("/planes");
          return; // Cancelar ejecución
        }

        const docRes = await fetch("http://localhost:4000/api/users/doctors", {
          credentials: "include",
        });

        if (docRes.ok) {
          const docData = await docRes.json();
          console.log("Doctors Data:", docData);
          setDoctors(docData);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Cargando...
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="h-[90vh] flex flex-col mt-10">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Buscar Médicos
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 cursor-pointer">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="border rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold text-blue-700">
                  {doctor.user.name} {doctor.user.lastName}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Especialidad: <strong>{doctor.specialty}</strong>
                </p>
                <p className="text-gray-700 mt-3 text-sm">{doctor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
