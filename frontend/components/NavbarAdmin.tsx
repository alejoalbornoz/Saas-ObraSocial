import Link from "next/link"
import { LayoutDashboard, Shield } from "lucide-react";

export function NavbarAdmin() {
  return (
    <div className="mr-10 flex items-center gap-6 text-red-700 font-semibold">
      <Link href="/admin">
        <LayoutDashboard />
      </Link>
      <Link href="/home-user/profile">
        <Shield />
      </Link>
    </div>
  );
}
