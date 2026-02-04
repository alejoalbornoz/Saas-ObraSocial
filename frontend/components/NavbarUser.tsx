import Link from "next/link";
import { LayoutDashboard, ClipboardClock, UserPen } from "lucide-react";

export function NavbarUser() {
  return (
    <div className="mr-10 flex items-center gap-6 text-blue-700 font-semibold">
      <Link href="/informacion">Quienes somos</Link>
      <Link href="/planes">Planes</Link>
      <Link href="/contacto">Contacto</Link>

      <Link href="/home-user" title="Panel">
        <LayoutDashboard />
      </Link>
      <Link href="/home-user/profile" title="Perfil">
        <UserPen />
      </Link>
      <Link href="/buscar/turnos" title="Turnos">
        <ClipboardClock />
      </Link>
    </div>
  );
}
