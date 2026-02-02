import { cookies } from "next/headers";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;


  const cookieStore = await cookies();

 
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`http://localhost:4000/api/admin/user/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Status ${res.status}: ${text}`);
  }

  const user = await res.json();

  return (
    <div className="h-screen">
      <h1 className="text-black">
        {user.name} {user.lastName}
      </h1>
    </div>
  );
}
