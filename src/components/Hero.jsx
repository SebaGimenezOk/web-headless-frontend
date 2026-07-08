"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <>
      {/* HERO VISUAL */}
      {/* Añadimos bg-[var(--background)] por si la imagen se aclara contra el fondo de la web */}
      <section className="relative w-full h-[60vh] overflow-hidden bg-(--background)">
        {/* Imagen de fondo con opacidad reducida para mejorar legibilidad */}
        <Image
          src="/AmadeusPerfil.png"
          alt="Wolfgang Amadeus Mozart"
          fill
          priority
          className="object-cover object-center"
        />

      
        <div className="absolute inset-0 bg-linear-to-r from-(--background) via-(--background)/40 to-transparent from-0% via-80% to-100%" />

    
        <div className="relative z-10 max-w-4xl mx-auto h-full px-6 pb-20 flex items-end justify-center sm:justify-start">
          <div className="max-w-2xl space-y-4 text-center sm:text-left">
            {/* Frase */}
            <h1 className="text-xl md:text-2xl uppercase tracking-wider font-normal text-(--text-strong) leading-relaxed">
              {t("hero.quote")}
            </h1>

            {/* Autor */}
            <h3 className="text-xs uppercase tracking-widest opacity-60 font-medium text-(--text-strong)">
              {t("hero.author")}
            </h3>
          </div>
        </div>
      </section>

      {/* TEXTO DE BAJADA */}
      <section className="w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
        <p className="w-[95%] mx-auto text-xs tracking-wider font-medium text-(--text-strong) uppercase leading-relaxed text-center">
          {t("hero.description")}
        </p>
      </section>
    </>
  );
}
