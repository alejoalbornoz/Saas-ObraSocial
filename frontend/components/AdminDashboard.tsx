"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  lastName: string;
  DNI: number;
  role: string;
  createdAt: string;
  doctor?: {
    specialty: string;
  };
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]); // ✅ Inicializado como array vacío
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const allUsersRes = await fetch(
          "http://localhost:4000/api/admin/users",
          { method: "GET", credentials: "include" },
        );

        if (allUsersRes.ok) {
          const dataAllUsers = await allUsersRes.json();
          // ✅ Asegurar que sea un array
          setUsers(Array.isArray(dataAllUsers) ? dataAllUsers : []);
        } else {
          setError("Error al cargar usuarios");
        }
      } catch (error) {
        console.error(
          `Se provocó un error al traer los usuarios, Error: ${error}`,
        );
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    }
    getAllUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="text-center">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin · Obra Social</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card title="Afiliados" value={users.length.toString()} />
        <Card title="Autorizaciones Pendientes" value="87" />
        <Card title="Ingresos Mensuales" value="$45.200.000" />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Apellido</th>
              <th className="p-3 text-left">DNI</th>
              <th className="p-3 text-left">Rol</th>
              <th className="p-3 text-left">Especialidad</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td className="p-3">{user.DNI}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">{user.doctor?.specialty || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
