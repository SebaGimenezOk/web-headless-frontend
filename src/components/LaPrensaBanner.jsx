
import React from "react";
import Image from "next/image";

export default function LaPrensaBanner({
  href = "https://www.laprensa.com.ar/author.aspx?author=282",
  title = "ALEJANDRO BENAVIDES EN LA PRENSA:",
  description = "Consultá las notas que escribe Alejandro Benavides en diario La Prensa; lee sus opiniones  en el ámbito cultural y artístico.",
  buttonText = "ir a La Prensa ",
}) {
  return (
    <section className="w-full border-y border-(--border) bg-[#090303] py-10 md:py-14 px-4 sm:px-6 lg:px-8 my-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Izquierda: Título (con Isologo) y Frase */}
        <div className="max-w-xl space-y-3">
          <div className="flex items-baseline gap-3">
            <h2 className="font-heading text-white/90 text-xl md:text-xl lg:text-2xl font-serif tracking-wide uppercase leading-none mr-1">
              {title}
            </h2>
            <div className="flex items-center justify-center h-16 w-auto ">
              <Image
                src="/BenavidesLaPrensa.png"
                alt="Logo BenavidesLaPrensa"
                width={300}
                height={300}
                className="h-full w-auto object-contain opacity-90"
                style={{ filter: "drop-shadow(0 0 0 #bfa15f)" }}
              />
            </div>
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





 