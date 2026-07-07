"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <>
      {/* HERO VISUAL */}
      <section className="relative w-full h-[40vh] min-h-60 overflow-hidden">
        {/* Imagen de fondo */}
        <Image
          src="/SalaColonExtendida.jpg"
          alt="Wolfgang Amadeus Mozart"
          fill
          priority
          className="object-cover object-center"
        />

    
        {/* Contenido con la estética del SearchBox */}
        <div className="relative z-10 max-w-4xl mx-auto h-full px-6 flex items-center justify-center sm:justify-start">
          <div className="max-w-2xl space-y-4 text-center sm:text-left">

            {/* Frase */}
            <h1 className="text-xl md:text-2xl uppercase tracking-wider font-normal text-(--text-strong) leading-relaxed">
              {t("hero.quote")}
            </h1>

            {/* Autor con estilo sutil de subelemento (como las taxonomías) */}
            <h3 className="text-xs uppercase tracking-widest opacity-60 font-medium text-(--text-strong)">
              {t("hero.author")}
            </h3>
          </div>
        </div>
      </section>
  
      {/* TEXTO DE BAJADA (Adaptado al formato del <p> que definimos recién) */}
      <section className="w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
        <p className="w-[95%] mx-auto text-xs tracking-wider font-medium text-(--text-strong) leading-relaxed text-center">
          {t("hero.description")}
        </p>
        <p  className="text-xs uppercase tracking-widest opacity-60 font-medium text-(--text-strong)">
              {t("hero.description2")} </p>
      </section>
    </>
  );
}