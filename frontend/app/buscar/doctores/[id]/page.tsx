"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Doctor = {
  id: number;
  specialty: string;
  bio: string | null;
  user: {
    id: number;
    name: string;
    lastName: string;
    location: string | null;
  };
};

export default function DoctorProfile() {
  const router = useRouter();
  const { id } = useParams();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");

  const availableHours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/users/doctors/${id}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();
        setDoctor(data.doctor);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctor();
  }, [id]);

  async function handleCreateShift() {
    if (!selectedDate || !selectedHour) return alert("Seleccioná fecha y hora");

    const dateTime = `${selectedDate}T${selectedHour}:00`;

    const res = await fetch("http://localhost:4000/api/shifts/create", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorId: Number(id),
        date: dateTime,
      }),
    });

    if (res.ok) {
      alert("Turno solicitado con éxito ✔");
      router.push("/home-user");
    } else {
      alert("Error al crear turno");
    }
  }

  if (loading) return <p className="p-10">Cargando médico...</p>;

  if (!doctor) return <p className="p-10">Médico no encontrado</p>;

  return (
    <main className="p-10 max-w-3xl mx-auto mt-20">
      <div className="bg-white shadow-md rounded-xl p-8 border">
        <h1 className="text-3xl font-extrabold text-blue-700">
          {doctor.user.name} {doctor.user.lastName}
        </h1>
        <p className="text-gray-600 mt-2 text-lg">{doctor.specialty}</p>
        <p className="mt-4 text-gray-700">{doctor.bio}</p>
        <p className="mt-4 text-gray-700">{doctor.user.location}</p>

        <div className="mt-8">
          <label className="font-semibold text-gray-700">Elegir día:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="block mt-2 p-2 border rounded-lg"
          />
        </div>

        <div className="mt-8">
          <label className="font-semibold text-gray-700">Elegir horario:</label>

          <div className="grid grid-cols-3 gap-3 mt-3">
            {availableHours.map((hour) => (
              <button
                key={hour}
                onClick={() => setSelectedHour(hour)}
                className={`p-2 rounded-lg border transition ${
                  selectedHour === hour
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-blue-50"
                }`}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreateShift}
          className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg"
        >
          Solicitar turno
        </button>
      </div>
    </main>
  );
}
