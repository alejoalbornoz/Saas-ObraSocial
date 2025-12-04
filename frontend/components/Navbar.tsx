"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { UserPen, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <nav>
      <div className="text-black bg-white fixed w-full top-0 left-0 z-40 shadow-md">
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 text-[16px] sm:text-[18px] md:text-[20px]">
          {/* LOGO */}
          <a href="" className="flex items-center gap-2 z-50 ml-10">
            <Image
              src="/iconsalud.png"
              alt="Icono de salud"
              width={40}
              height={40}
            />
            <Link className="text-[25px]" href="/">
              Obra Social
            </Link>
          </a>

          {/* LINKS CENTRALES */}
          <div className="flex-1 flex justify-center">
            <ul className="flex gap-8 items-center text-[18px] sm:text-[20px] text-blue-700 font-semibold">
              <li>
                <Link href="/informacion" className="hover:text-blue-900">
                  Quienes somos
                </Link>
              </li>
              <li>
                <Link href="/planes" className="hover:text-blue-900">
                  Planes
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-blue-900">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {!loading && (
            <>
              {!user && (
                <button className="pl-3 pr-3 pt-1 pb-1 rounded-2xl bg-blue-500 text-white text-[18px] hover:bg-blue-600">
                  <Link href="/login">Iniciar Sesión</Link>
                </button>
              )}
              {user && (
                <div className="mr-10 flex items-center gap-4">
                  <Link
                    href="/home-user"
                    className="flex items-center gap-2 hover:opacity-80"
                    title="Panel de control"
                  >
                    <LayoutDashboard />
                  </Link>
                  <Link
                    href="/home-user/profile"
                    className="flex items-center gap-2 hover:opacity-80"
                    title="Perfil"
                  >
                    <UserPen />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
