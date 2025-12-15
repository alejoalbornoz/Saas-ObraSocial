// "use client";

// import { useEffect, useState } from "react";

// type User = {
//   id: number;
//   name: string;
//   lastName: string;
//   role: string;
// };

// type Doctor = {
//   speciality: string;
//   user: User;
// };

// type RawShift = {
//   id: number;
//   date: string;
//   status: "PENDIENTE" | "CONFIRMADO" | "CANCELADO" | "RECHAZADO" | "FINALIZADO";
//   patient: {
//     name: string;
//     lastName: string;
//   } | null;
// };

// type Appointment = {
//   id: number;
//   date: string;
//   patientName: string;
//   status: "PENDING" | "CONFIRMED" | "CANCELLED" | "REJECTED" | "FINISHED";
// };

// export default function HomeDoctor() {
//   const [doctor, setDoctor] = useState<Doctor | null>(null);
//   const [shifts, setShifts] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // =========================
//         // Obtener usuario logueado
//         // =========================
//         const res = await fetch("http://localhost:4000/api/users/me", {
//           credentials: "include",
//         });

//         if (!res.ok) {
//           setLoading(false);
//           return;
//         }

//         const data = await res.json();

//         // if (data.role !== "MEDICO" || !data.doctor) {
//         //   window.location.href = "/";
//         //   return;
//         // }

//         setDoctor({
//           speciality: data.doctor.specialty,
//           user: {
//             id: data.id,
//             name: data.name,
//             lastName: data.lastName,
//             role: data.role,
//           },
//         });

//         const resApp = await fetch(
//           "http://localhost:4000/api/shifts/doctor/my-shifts",
//           { credentials: "include" }
//         );

//         if (resApp.ok) {
//           const raw: RawShift[] = await resApp.json();

//           const normalized: Appointment[] = raw.map((shift) => ({
//             id: shift.id,
//             date: shift.date,
//             patientName: shift.patient
//               ? `${shift.patient.name} ${shift.patient.lastName}`
//               : "Paciente eliminado",
//             status:
//               shift.status === "PENDIENTE"
//                 ? "PENDING"
//                 : shift.status === "CONFIRMADO"
//                 ? "CONFIRMED"
//                 : shift.status === "CANCELADO"
//                 ? "CANCELLED"
//                 : shift.status === "RECHAZADO"
//                 ? "REJECTED"
//                 : "FINISHED",
//           }));

//           setShifts(normalized);
//         }
//       } catch (err) {
//         console.error("Error cargando HomeDoctor:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div className="p-6">Cargando...</div>;
//   if (!doctor) return <div>Error al cargar datos.</div>;

//   const today = new Date().getDate();
//   const todaysShifts = shifts.filter(
//     (s) => new Date(s.date).getDate() === today
//   );

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold">
//           Bienvenido Dr. {doctor.user.name} {doctor.user.lastName}
//         </h1>
//         <p className="text-gray-600">{doctor.speciality}</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Calendario */}
//         <div className="col-span-2 p-4 border rounded-xl bg-white shadow">
//           <h2 className="text-xl font-semibold mb-3">Calendario</h2>

//           <div className="grid grid-cols-7 gap-2 text-center">
//             {Array.from({ length: 30 }).map((_, i) => {
//               const day = i + 1;
//               const hasAppointments = shifts.some(
//                 (app) => new Date(app.date).getDate() === day
//               );

//               return (
//                 <div
//                   key={i}
//                   className={`border rounded-lg p-3 ${
//                     day === today ? "bg-blue-100" : "bg-white"
//                   } hover:bg-gray-50 cursor-pointer transition`}
//                 >
//                   <p className="font-bold">{day}</p>
//                   {hasAppointments && (
//                     <span className="text-xs text-blue-600 block mt-1">
//                       • Turnos
//                     </span>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="p-4 border rounded-xl bg-white shadow">
//           <h2 className="text-xl font-semibold mb-3">Turnos del día</h2>

//           {todaysShifts.length === 0 ? (
//             <p className="text-gray-500">No hay turnos hoy.</p>
//           ) : (
//             <ul className="space-y-3">
//               {todaysShifts.map((app) => {
//                 const hora = new Date(app.date).toLocaleTimeString("es-AR", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <li key={app.id} className="p-3 border rounded-lg bg-gray-50">
//                     <span className="font-bold">{hora}</span>
//                     <p>{app.patientName}</p>
//                     <p className="text-sm text-gray-600">{app.status}</p>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
