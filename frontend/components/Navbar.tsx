"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import { NavbarAdmin } from "./NavbarAdmin";
import { NavbarMedico } from "./NavbarMedico";
import { NavbarUser } from "./NavbarUser";
import { NavbarPublico } from "./NavbarPublic";

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <nav className="text-black bg-white fixed w-full top-0 left-0 z-40 shadow-md">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 text-[16px] sm:text-[18px] md:text-[20px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 ml-10">
          <Image
            src="/iconsalud.png"
            alt="Icono salud"
            width={40}
            height={40}
          />
          <span className="text-[25px]">Obra Social</span>
        </Link>

        {!loading && (
          <>
            {!user && <NavbarPublico />}

            {user?.role === "USUARIO" && <NavbarUser />}
            {user?.role === "MEDICO" && <NavbarMedico />}
            {user?.role === "ADMIN" && <NavbarAdmin />}
          </>
        )}
      </div>
    </nav>
  );
}
