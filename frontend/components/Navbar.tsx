import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div className="text-black bg-white fixed w-full top-0 left-0 z-40 shadow-md">
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 text-[16px] sm:text-[18px] md:text-[20px]">
          <a href="" className="flex items-center gap-2  z-50 ml-10">
            <Image
              src="/iconsalud.png"
              alt="Icono de salud"
              width={40}
              height={40}
            />
            <p className="text-[25px]">Obra Social</p>
          </a>

          <div className="flex-1 flex justify-center">
            <ul className="flex gap-8 items-center text-[18px] sm:text-[20px] text-blue-700 font-semibold">
              <li>
                <Link href="/servicios" className="hover:text-blue-900">
                  Servicios
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
          <button className="pl-3 pr-3 pt-1 pb-1 rounded-2xl bg-blue-500 text-white text-[18px] hover:bg-blue-600">
            <Link href="/login">Iniciar Sesión</Link>
          </button>
        </div>
      </div>
    </nav>
  );
}
