"use client";

import { useEffect, useState } from "react";

type ShiftStatus =
  | "PENDIENTE"
  | "CONFIRMADO"
  | "CANCELADO"
  | "RECHAZADO"
  | "FINALIZADO";

type Patient = {
  id: number;
  name: string;
  lastName: string;
  DNI: string;
  email: string;
};

type Shift = {
  id: number;
  date: string;
  status: ShiftStatus;
  patient: Patient;
};

export default function HomeDoctor() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShiftsDoctor = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "http://localhost:4000/api/shifts/doctor/my-shifts",
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("No se pudieron obtener los turnos");
        }

        const data: Shift[] = await res.json();
        setShifts(data);
      } catch (err) {
        setError("Error al cargar los turnos");
      } finally {
        setLoading(false);
      }
    };

    fetchShiftsDoctor();
  }, []);

  return (
    <div className="p-4 border rounded-2xl bg-white shadow-sm flex flex-col justify-center items-center h-screen">
      <h2 className="text-3xl font-semibold mb-4">Turnos del día</h2>

      {loading && <p className="text-gray-500 text-sm">Cargando turnos...</p>}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && shifts.length === 0 && (
        <p className="text-gray-500 text-sm">No tenés turnos asignados hoy</p>
      )}

      <div className="space-y-3">
        {!loading &&
          shifts.map((shift) => (
            <div
              key={shift.id}
              className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition"
            >
              <div>
                <p className="text-2xl text-gray-900">
                  {shift.patient.name} {shift.patient.lastName}
                </p>
                <p className="text-[18px] text-gray-500">
                  {new Date(shift.date).toLocaleDateString()} ·{" "}
                  {new Date(shift.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <span
                className={`px-3 py-1 ml-5 text-1xl font-semibold rounded-full ${
                  shift.status === "PENDIENTE"
                    ? "bg-yellow-100 text-yellow-700"
                    : shift.status === "CONFIRMADO"
                    ? "bg-green-100 text-green-700"
                    : shift.status === "CANCELADO"
                    ? "bg-red-100 text-red-700"
                    : shift.status === "FINALIZADO"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {shift.status}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
