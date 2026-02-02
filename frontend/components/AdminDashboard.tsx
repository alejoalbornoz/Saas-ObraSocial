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
    bio: string;
  };
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch(
          "http://localhost:4000/api/admin/users",
          { credentials: "include" }
        );

        if (!res.ok) throw new Error();

        const data = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch {
        setError("Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }

    const term = searchTerm.toLowerCase();
    setFilteredUsers(
      users.filter((u) =>
        `${u.name} ${u.lastName}`.toLowerCase().includes(term) ||
        u.DNI.toString().includes(term)
      )
    );
  }, [searchTerm, users]);

  async function handleChangeRole() {
    if (!selectedUser || !selectedRole) return;

    try {
      setUpdating(true);

      const res = await fetch(
        "http://localhost:4000/api/admin/users/role",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: selectedUser.id,
            newRole: selectedRole,
            specialty: selectedRole === "MEDICO" ? specialty : undefined,
            bio: selectedRole === "MEDICO" ? bio : undefined,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al cambiar rol");
        return;
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? { ...u, role: selectedRole }
            : u
        )
      );

      setFilteredUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? { ...u, role: selectedRole }
            : u
        )
      );

      closeModal();
    } catch {
      alert("Error de conexión");
    } finally {
      setUpdating(false);
    }
  }

  function openModal(user: User) {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setSpecialty(user.doctor?.specialty || "");
    setBio(user.doctor?.bio || "");
  }

  function closeModal() {
    setSelectedUser(null);
    setSelectedRole("");
    setSpecialty("");
    setBio("");
  }

  if (loading) return <div className="p-6">Cargando...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin · Obra Social</h1>

      <input
        type="text"
        placeholder="Buscar por DNI o nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full md:w-96 px-4 py-2 border rounded-lg"
      />

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
              <th className="p-3 text-left">Localización</th>
              <th className="p-3 text-left">Creado el</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.lastName}</td>
                <td className="p-3">{user.DNI}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">{user.afiliation}</td>
                <td className="p-3">{user.location || "N/A"}</td>
                <td className="p-3">{formatDate(user.createdAt)}</td>
                <td className="p-3">
                  <button
                    onClick={() => openModal(user)}
                    className="px-3 py-1 bg-gray-800 text-white text-xs rounded"
                  >
                    Cambiar rol
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-10 space-y-4 shadow-lg">
            <h2 className="text-lg font-semibold">
              Cambiar rol · {selectedUser.name} {selectedUser.lastName}
            </h2>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="USUARIO">Usuario</option>
              <option value="MEDICO">Médico</option>
            </select>

            {selectedRole === "MEDICO" && (
              <>
                <input
                  type="text"
                  placeholder="Especialidad"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
                <textarea
                  placeholder="Bio (opcional)"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              </>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleChangeRole}
                disabled={updating}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
