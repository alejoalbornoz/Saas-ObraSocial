import Image from "next/image";

export default function Navbar() {
  return (
    <nav>
      <div className="text-black bg-white fixed w-full top-0 left-0 z-40 shadow-md">
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 text-[16px] sm:text-[18px] md:text-[20px]">
          <a
            href=""
            className="flex items-center gap-2 cursor-pointer z-50 ml-10"
          >
            <Image
              src="/iconsalud.png"
              alt="Icono de salud"
              width={40}
              height={40}
            />
            <p className="text-[25px]">Obra Social</p>
          </a>

          <ul className="flex flex-row gap-25 cursor-pointer text-[20px]">
            <li>Servicios</li>
            <li>Planes</li>
            <li>Contacto</li>
          </ul>
          <button className="pl-3 pr-3 pt-1 pb-1 rounded-2xl bg-blue-500 text-white text-[18px] hover:bg-blue-600">
            <a href="">Iniciar Sesión</a>
          </button>
        </div>
      </div>
    </nav>
  );
}
