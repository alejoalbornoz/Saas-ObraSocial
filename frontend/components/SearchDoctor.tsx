"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Doctor = {
  id: number;
  specialty: string;
  bio: string | null;
  user: {
    id: number;
    name: string;
    lastName: string;
    email: string;
    location: string | null;
  };
};

export default function SearchDoctor() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔍 filtros
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const router = useRouter();
  const alreadyRedirected = useRef(false);



  useEffect(() => {
    async function checkUser() {
      try {
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
          return;
        }

        const docRes = await fetch("http://localhost:4000/api/users/doctors", {
          credentials: "include",
        });

        if (docRes.ok) {
          const docData = await docRes.json();
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

  // 🧠 Médicos filtrados
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSpecialty = doctor.specialty
        .toLowerCase()
        .includes(specialtyFilter.toLowerCase());

      const matchesLocation = doctor.user.location
        ?.toLowerCase()
        .includes(locationFilter.toLowerCase());

      return matchesSpecialty && (matchesLocation || locationFilter === "");
    });
  }, [doctors, specialtyFilter, locationFilter]);

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

          {/* 🔍 FILTROS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Filtrar por especialidad (ej: cardiología)"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="Filtrar por localidad (ej: Córdoba)"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* 🩺 LISTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredDoctors.length === 0 && (
              <p className="text-gray-500 col-span-full text-center">
                No se encontraron médicos con esos filtros 😬
              </p>
            )}

            {filteredDoctors.map((doctor) => (
              <Link
                href={`/buscar/doctores/${doctor.id}`}
                key={doctor.id}
                className="border rounded-xl p-6 shadow-sm bg-white hover:shadow-md hover:-translate-y-1 transition block"
              >
                <h2 className="text-xl font-semibold text-blue-700">
                  {doctor.user.name} {doctor.user.lastName}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Especialidad: <strong>{doctor.specialty}</strong>
                </p>

                {doctor.user.location && (
                  <p className="text-sm text-gray-500 mt-1">
                    Ubicación: <strong>{doctor.user.location}</strong>
                  </p>
                )}

                <p className="text-gray-700 mt-3 text-sm">{doctor.bio}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
