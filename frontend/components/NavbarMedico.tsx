import Link from "next/link";
import { LayoutDashboard,  Stethoscope } from "lucide-react";




export function NavbarMedico() {
  return (
    <div className="mr-10 flex items-center gap-6 text-blue-700 font-semibold">
      <Link href="/home-doctor">
        <LayoutDashboard />
      </Link>
      <Link href="/home-user/profile">
        <Stethoscope />
      </Link>
    </div>
  );
}
