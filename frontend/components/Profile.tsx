"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  DNI: string;
  afiliation?: string | null;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados para formularios
  const [editMode, setEditMode] = useState(false);
  const [infoForm, setInfoForm] = useState({
    name: "",
    lastName: "",
    email: "",
    DNI: "",
  });

  const router = useRouter();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Fetch de usuario
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:4000/api/users/me", {
          credentials: "include",
        });
        const data = await res.json();

        setUser(data.user);

        setInfoForm({
          name: data.user.name,
          lastName: data.user.lastName,
          email: data.user.email,
          DNI: data.user.DNI,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // Manejo de inputs
  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoForm({ ...infoForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // Guardar cambios de información
  const handleSaveInfo = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/users/update", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(infoForm),
      });

      const data = await res.json();

      if (res.ok) {
        setUser({ ...user!, ...infoForm });
        setEditMode(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        router.push("/login");
      } else {
        alert("Error al cerrar sesión");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Cambiar contraseña
  const handleChangePassword = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/users/change-password",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(passwordForm),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Contraseña actualizada correctamente");
        setPasswordForm({ currentPassword: "", newPassword: "" });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Eliminar cuenta
  const handleDeleteAccount = async () => {
    if (!confirm("¿Seguro que querés eliminar tu cuenta? No hay vuelta atrás."))
      return;

    setDeleting(true);

    try {
      const res = await fetch(
        "http://localhost:4000/api/users/delete-account",
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: deletePassword }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Cuenta eliminada. Cerrando sesión...");
        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="p-10">Cargando...</p>;

  if (!user) return <p>No se encontró el usuario.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl">
      {/* LOGOUT BUTTON */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Cerrar sesión
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-blue-700">Mi Perfil</h1>

      {/* DATOS DEL USUARIO */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Información personal</h2>

        {!editMode ? (
          <div className="space-y-2">
            <p>
              <strong>Nombre:</strong> {user.name}
            </p>
            <p>
              <strong>Apellido:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>DNI:</strong> {user.DNI}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setEditMode(true)}
            >
              Editar
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              name="name"
              value={infoForm.name}
              onChange={handleInfoChange}
              className="w-full p-2 border rounded"
              placeholder="Nombre"
            />
            <input
              name="lastName"
              value={infoForm.lastName}
              onChange={handleInfoChange}
              className="w-full p-2 border rounded"
              placeholder="Apellido"
            />
            <input
              name="email"
              value={infoForm.email}
              onChange={handleInfoChange}
              className="w-full p-2 border rounded"
              placeholder="Email"
            />
            <input
              name="DNI"
              value={infoForm.DNI}
              onChange={handleInfoChange}
              className="w-full p-2 border rounded"
              placeholder="DNI"
            />

            <div className="flex gap-3">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={handleSaveInfo}
              >
                Guardar
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                onClick={() => setEditMode(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </section>

      {/* CAMBIAR CONTRASEÑA */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Cambiar contraseña</h2>

        <input
          type="password"
          name="currentPassword"
          value={passwordForm.currentPassword}
          onChange={handlePasswordChange}
          className="w-full p-2 border rounded mb-3"
          placeholder="Contraseña actual"
        />

        <input
          type="password"
          name="newPassword"
          value={passwordForm.newPassword}
          onChange={handlePasswordChange}
          className="w-full p-2 border rounded mb-3"
          placeholder="Nueva contraseña"
        />

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleChangePassword}
        >
          Actualizar contraseña
        </button>
      </section>

      {/* ELIMINAR CUENTA */}
      <section className="border-t pt-6">
        <h2 className="text-xl font-semibold text-red-600 mb-3">
          Eliminar cuenta
        </h2>
        <p className="mb-4 text-gray-700">
          Para eliminar tu cuenta, ingresá tu contraseña:
        </p>

        <input
          type="password"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          placeholder="Contraseña"
        />

        <button
          disabled={deleting}
          onClick={handleDeleteAccount}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300"
        >
          {deleting ? "Eliminando..." : "Eliminar cuenta"}
        </button>
      </section>
    </div>
  );
}
