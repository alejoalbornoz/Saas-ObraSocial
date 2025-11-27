import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div className="relative h-[80vh]">
      <div className="h-screen flex items-center justify-center px-10 relative overflow-hidden">
        {/* Lunares */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-16 h-16 bg-blue-300/30 rounded-full blur-sm" />
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-300/30 rounded-full blur-sm" />
          <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-blue-300/30 rounded-full blur-sm" />

          {/* nuevos lunares */}
          <div className="absolute top-5 right-1/4 w-12 h-12 bg-blue-300/25 rounded-full blur-sm" />
          <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-blue-300/20 rounded-full blur-sm" />
          <div className="absolute top-1/4 right-10 w-8 h-8 bg-blue-300/30 rounded-full blur-sm" />
          <div className="absolute bottom-1/3 right-1/2 w-10 h-10 bg-blue-300/25 rounded-full blur-sm" />
          <div className="absolute top-2/3 left-5 w-16 h-16 bg-blue-300/20 rounded-full blur-sm" />
        </div>

        {/* Contenido CENTRADO */}
        <div className="flex flex-col gap-6 w-[45%] z-10 -translate-x-[30%]">
          <h1 className="text-[100px] font-bold leading-tight">
            Tu Obra Social de confianza
          </h1>

          <p className="text-[40px] leading-snug">
            Ofrecemos una amplia variedad de servicios para cuidar tu salud y la
            de tu familia
          </p>

          <button className="bg-blue-500 text-white text-[20px] px-6 py-3 rounded-lg cursor-pointer w-fit">
            Conoce más
          </button>
        </div>

        {/* Imagen en absolute */}
        <Image
          src="/doctora1.png"
          alt="Hero Image"
          width={1200}
          height={1200}
          className="absolute right-0 bottom-0 max-w-[55%] object-contain pointer-events-none"
        />
      </div>
    </div>
  );
}
