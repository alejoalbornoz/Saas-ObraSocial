import Link from "next/link";

export function NavbarPublico() {
  return (
    <div className="mr-10 flex items-center gap-6 text-blue-700 font-semibold">
      <Link href="/informacion">Quienes somos</Link>
      <Link href="/planes">Planes</Link>
      <Link href="/contacto">Contacto</Link>

      <Link
        href="/login"
        className="mr-10 px-4 py-1 rounded-2xl bg-blue-500 text-white hover:bg-blue-600"
      >
        Iniciar Sesión
      </Link>
    </div>
  );
}
