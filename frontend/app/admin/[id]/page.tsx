export default async function UserPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `http://localhost:4000/api/admin/user/${params.id}`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Error al obtener usuario");
  }

  const user = await res.json();

  return (
    <div>
      <h1>{user.name} {user.lastName}</h1>
      <p>Email: {user.email}</p>
      <p>DNI: {user.DNI}</p>
      <p>Rol: {user.role}</p>

      {user.doctor && (
        <>
          <h2>Doctor</h2>
          <p>{user.doctor.specialty}</p>
          <p>{user.doctor.bio}</p>
        </>
      )}
    </div>
  );
}
