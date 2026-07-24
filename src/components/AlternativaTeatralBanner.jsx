import React from "react";
import Image from "next/image";

export default function AlternativaTeatralBanner({
  href = "https://www.alternativateatral.com",
  title = "CARTELERA Y RESERVAS DE: ",
  description = "Consultá las funciones, ficha técnica y reservá tus localidades a través de Alternativa Teatral.",
  buttonText = "ir a ALTERNATIVA TEATRAL",
}) {
  return (
    <section className="w-full border-y border-(--border) bg-[#090303] py-10 md:py-14 px-4 sm:px-6 lg:px-8 my-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Izquierda: Título (con Isologo) y Frase */}
        <div className="max-w-xl space-y-3">
          <div className="flex items-baseline gap-3">
            <h2 className="font-heading text-white/90 text-xl md:text-2xl lg:text-3xl font-serif tracking-wide uppercase leading-none mr-1">
              {title}
            </h2>
            <div className="rounded-full overflow-hidden shrink-0 flex items-baseline justify-center bg-white/5 border border-white/10">
              <Image
                src="/logo alternativa.jpeg"
                alt="Logo Alternativa Teatral"
                width={30}
                height={30}
                className="w-full h-full object-cover opacity-90"
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
