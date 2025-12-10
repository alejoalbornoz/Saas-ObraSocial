"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { showToast } from "nextjs-toast-notify";

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

  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [loadingHours, setLoadingHours] = useState(false);

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

  useEffect(() => {
    async function fetchAvailableHours() {
      if (!selectedDate) return;

      setLoadingHours(true);

      try {
        const res = await fetch(
          `http://localhost:4000/api/shifts/available/${id}?date=${selectedDate}`,
          { credentials: "include" }
        );

        const data = await res.json();
        setAvailableHours(
          data.availableHours.map(
            (h: number) => h.toString().padStart(2, "0") + ":00"
          )
        );
      } catch (error) {
        console.error("Error fetching hours:", error);
      } finally {
        setLoadingHours(false);
      }
    }

    fetchAvailableHours();
  }, [selectedDate, id]);

  async function handleCreateShift() {
    if (!selectedDate || !selectedHour) return alert("Seleccioná fecha y hora");

    const dateTime = `${selectedDate}T${selectedHour}:00`;

    const res = await fetch("http://localhost:4000/api/shifts/create", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorName: doctor?.user.name,
        doctorLastName: doctor?.user.lastName,
        specialty: doctor?.specialty,
        date: dateTime,
      }),
    });

    if (res.ok) {
      showToast.success("¡Turno creado exitosamente!", {
        duration: 7000,
        progress: true,
        position: "top-center",
        transition: "slideInUp",
        icon: "",
        sound: false,
      });
      router.push("/buscar/turnos");
    } else {
      const err = await res.json();
      alert(err.message || "Error al crear turno");
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
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedHour(""); // resetea hora
            }}
            className="block mt-2 p-2 border rounded-lg"
          />
        </div>

        <div className="mt-8">
          <label className="font-semibold text-gray-700">Elegir horario:</label>

          {loadingHours && <p className="mt-4">Cargando horarios...</p>}

          {!loadingHours && availableHours.length === 0 && selectedDate && (
            <p className="mt-4 text-red-600">No hay horarios disponibles</p>
          )}

          {!loadingHours && availableHours.length > 0 && (
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
          )}
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
