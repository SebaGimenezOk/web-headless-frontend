import React from "react";
import Image from "next/image";

export default function LaPrensaBanner({
  href = "https://www.laprensa.com.ar/author.aspx?author=282",
  title = "ALEJANDRO BENAVIDES EN:",
  description = "Consultá las notas que escribe Alejandro Benavides en diario La Prensa.",
  buttonText = "ir a La Prensa ",
}) {
  return (
    <section className="relative w-full border-y border-(--border) bg-[#090303] py-10 md:py-14 px-4 sm:px-6 lg:px-8 my-12 overflow-hidden">
      {/* Imagen cubriendo todo el contenedor sin deformarse */}
      <Image
        src="/BenavidesLaPrensa4.jpg"
        alt="Fondo La Prensa"
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />

      {/* Contenido sobre la imagen */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Izquierda: Título y Frase */}
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-white/90 text-xl md:text-xl lg:text-2xl font-serif tracking-wide uppercase leading-none mr-1 whitespace-nowrap">
              {title}
            </h2>
          </div>
          <p className="font-body text-white/70 text-sm md:text-base leading-relaxed opacity-90 antialiased">
            {description}
          </p>
        </div>

        {/* Derecha: Botón de Enlace Directo */}
        <div className="w-full md:w-auto md:min-w-100 px-1.5 flex justify-start md:justify-end">
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