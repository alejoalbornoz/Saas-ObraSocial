"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type DoctorUser = {
  id: number;
  name: string;
  lastName: string;
  email: string;
};

type Doctor = {
  user: DoctorUser;
};

type Patient = {
  id: number;
  name: string;
  lastName: string;
  email: string;
};

type Shift = {
  id: number;
  date: string;
  status: "PENDIENTE" | "CONFIRMADO" | "CANCELADO" | "RECHAZADO" | "FINALIZADO";
  doctor?: Doctor;
  patient?: Patient;
};

export default function Shifts() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/shifts/mine", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("No se pudieron obtener los turnos");
        }

        const data: Shift[] = await res.json();
        setShifts(data);
      } catch (err) {
        console.error("Error al obtener turnos:", err);
        setError("Hubo un problema obteniendo tus turnos.");
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);

  const cancelShift = async (shiftId: number) => {
    const confirmar = confirm("¿Seguro que querés cancelar este turno?");
    if (!confirmar) return;

    try {
      const res = await fetch(
        "http://localhost:4000/api/shifts/cancelmyshift",
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shiftId }),
        }
      );

      if (!res.ok) {
        throw new Error("No se pudo cancelar el turno");
      }

      // Actualizar la lista local sin hacer otro GET
      setShifts((prev) =>
        prev.map((shift) =>
          shift.id === shiftId ? { ...shift, status: "CANCELADO" } : shift
        )
      );

      alert("Turno cancelado con éxito ✔");
    } catch (error) {
      console.error("Error al cancelar turno:", error);
      alert("No se pudo cancelar el turno");
    }
  };

  if (loading) {
    return <p className="p-4 text-gray-700">Cargando tus turnos...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-600">{error}</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold mb-6 ">Mis Turnos</h1>

      {shifts.length === 0 ? (
        <p className="text-gray-600">No tenés turnos cargados.</p>
      ) : (
        <div className="space-y-4">
          {shifts.map((shift) => (
            <div
              key={shift.id}
              className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              <p className="font-semibold">
                Fecha:{" "}
                {new Date(shift.date).toLocaleString("es-AR", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </p>
              <p className="mt-1">
                Estado:{" "}
                <span
                  className={`font-bold ${
                    shift.status === "CONFIRMADO"
                      ? "text-green-600"
                      : shift.status === "PENDIENTE"
                      ? "text-yellow-600"
                      : shift.status === "CANCELADO" ||
                        shift.status === "RECHAZADO"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {shift.status}
                </span>
              </p>

              {shift.doctor && (
                <p className="mt-2">
                  Doctor:{" "}
                  <span className="font-medium">
                    {shift.doctor.user.name} {shift.doctor.user.lastName}
                  </span>
                </p>
              )}
              {shift.patient && (
                <p className="mt-2">
                  Paciente:{" "}
                  <span className="font-medium">
                    {shift.patient.name} {shift.patient.lastName}
                  </span>
                </p>
              )}

              <div className="flex justify-between">
                <Link
                  href={`/turnos/${shift.id}`}
                  className="text-blue-600 underline mt-3 inline-block"
                >
                  Ver detalles
                </Link>

                {shift.status !== "CANCELADO" &&
                  shift.status !== "FINALIZADO" &&
                  shift.status !== "RECHAZADO" && (
                    <button
                      onClick={() => cancelShift(shift.id)}
                      className="bg-red-600 px-3 py-2 rounded-md text-white hover:bg-red-700 transition"
                    >
                      Cancelar turno
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
