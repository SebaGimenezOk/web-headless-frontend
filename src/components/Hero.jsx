"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <>
      {/* HERO VISUAL (Lienzo puro para tus imágenes con el texto tipográfico ya incrustado) */}
      <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 my-8">
        <div className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-sm bg-(--background)">
          
          {/* Versión MOBILE */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src="/encabezadocronicasmobile.jpg" // Tu imagen con el texto incrustado adaptado a pantallas chicas
              alt="Hero Mobile"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Versión DESKTOP (1920x1280 - Relación 3:2 estricta) */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/encabezadocronicas.jpg" // Tu imagen de 1920x1280 con el texto diseñado a la izquierda
              alt="Hero Desktop"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

        </div>
      </section>

      {/* TEXTO DE BAJADA */}
      <section className="w-full max-w-4xl mx-auto px-6 pb-12 flex flex-col items-center">
        <p className="w-[95%] mx-auto text-xs tracking-wider font-medium text-(--text-strong) uppercase leading-relaxed text-center">
          {t("hero.description")}
        </p>
      </section>
    </>
  );
}