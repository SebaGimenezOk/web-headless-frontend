import React from "react";
import Image from "next/image";

export default function LaPrensaBanner({
  href = "https://www.laprensa.com.ar/author.aspx?author=282",
  buttonText = "ir a La Prensa",
}) {
  return (
    <section className="relative w-full border-y border-(--border) bg-[#090303] py-8 md:py-14 px-4 sm:px-6 lg:px-8 my-12 overflow-hidden">
      {/* Background Desktop */}
      <Image
        src="/BenavidesLaPrensa4.jpg"
        alt="Fondo La Prensa"
        fill
        sizes="100vw"
        priority
        className="hidden md:block object-cover object-center"
      />
      {/* Background Mobile */}
      <Image
        src="/BenavidesLaPrensaMobile.jpg"
        alt="Fondo La Prensa Mobile"
        fill
        sizes="100vw"
        priority
        className="block md:hidden object-cover object-center"
      />

      {/* Contenido en columna centrada en mobile y horizontal en desktop */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center md:text-left md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
        
        <div className="flex flex-col items-center md:items-start space-y-4 max-w-2xl">
          {/* 1) Alejandro Dominguez Benavides en: */}
          <h2 className="font-heading text-white/90 text-lg sm:text-xl md:text-2xl font-serif tracking-wide uppercase leading-tight">
            ALEJANDRO DOMINGUEZ BENAVIDES EN:
          </h2>

          {/* 2) Logo La Prensa — SOLO VISIBLE EN MOBILE */}
          <div className="py-2 flex justify-center w-full block md:hidden">
            <Image
              src="/LaPrensaBlanco.png"
              alt="Logo La Prensa"
              width={400}
              height={100}
              className="w-48 sm:w-64 h-auto object-contain"
            />
          </div>

          {/* 3) Leyenda */}
          <p className="font-body text-white/80 text-sm md:text-base leading-relaxed opacity-90 antialiased">
            Consulta las notas que escribe A. Dominguez Benavides cada semana.
          </p>
        </div>

        {/* 4) Botón de ir a La Prensa */}
        <div className="w-full md:w-auto md:min-w-100 px-1.5 flex justify-center md:justify-end mt-2 md:mt-0">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 font-heading font-medium text-xs tracking-wider uppercase bg-(--text-strong) text-(--surface) hover:bg-(--ocre) hover:text-(--text-strong) transition-all duration-300 rounded-sm whitespace-nowrap text-center inline-block"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}