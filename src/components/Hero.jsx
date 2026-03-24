"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";






export default function Hero() {
  const { t } = useTranslation();

  return (
    <>
      {/* HERO VISUAL */}
      <section className="relative w-full h-[80vh] min-h-150 overflow-hidden bg-neutral-100">
        {/* Imagen de fondo */}
        <Image
          src="/wolfangM.png"
          alt="Wolfgang Amadeus Mozart"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-neutral-50/90 via-neutral-50/70 to-transparent" />

        {/* Contenido */}
        <div className="relative z-10 max-w-7xl mx-auto my-12 py-6 h-full px-6 flex items-center">
          <div className="max-w-3xl space-y-6">

            {/* Frase */}
            <h1 className="text-5xl md:text-4xl uppercase leading-tight">
              {t("hero.quote")}
            </h1>

            {/* Autor */}
            <h3 className="text-2xl uppercase text-gray-700">
              {t("hero.author")}
            </h3>
          </div>
        </div>
      </section>
  
      {/* TEXTO DE BAJADA */}
      <section className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-center text-center space-y-6">
        <h3 className="text-2xl italic text-gray-600 leading-relaxed max-w-6xl">
          {t("hero.description")}
        </h3>

        
      </section>
    </>
  );
}