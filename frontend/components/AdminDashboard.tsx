"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  DNI: number;
  role: string;
  createdAt: string;
  location: string;
  afiliation: string;
  doctor?: {
    specialty: string;
  };
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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
          const usersArray = Array.isArray(dataAllUsers) ? dataAllUsers : [];
          setUsers(usersArray);
          setFilteredUsers(usersArray);
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

  // Filtrar usuarios según el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = users.filter((user) => {
        const fullName = `${user.name} ${user.lastName}`.toLowerCase();
        const dniString = user.DNI.toString();
        
        return (
          fullName.includes(term) ||
          dniString.includes(term)
        );
      });
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

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

      {/* Buscador */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por DNI o nombre completo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            {filteredUsers.length} resultado{filteredUsers.length !== 1 ? 's' : ''} encontrado{filteredUsers.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Apellido</th>
              <th className="p-3 text-left">DNI</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Rol</th>
              <th className="p-3 text-left">Plan</th>
              <th className="p-3 text-left">Localizacion</th>
              <th className="p-3 text-left">Creado el</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">
                  {searchTerm 
                    ? "No se encontraron usuarios que coincidan con la búsqueda" 
                    : "No hay usuarios registrados"}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td className="p-3">{user.DNI}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">{user.afiliation}</td>
                  <td className="p-3">{user.location || "N/A"}</td>
                  <td className="p-3">{user.createdAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}