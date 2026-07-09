"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <>
      {/* HERO VISUAL (Con las proporciones exactas de tus lienzos originales) */}
      <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 my-8">
        
        {/* Versión MOBILE: Lienzo de 1100x900 (Proporción exacta aspect-[11/9]) */}
        <div className="block md:hidden relative w-full aspect-11/9 overflow-hidden rounded-sm bg-(--background)">
          <Image
            src="/EncabezadoCronicasMobile.jpg"
            alt="Hero Mobile"
            fill
            priority
            className="object-contain object-center"
          />
        </div>

        {/* Versión DESKTOP: Lienzo panorámico de 1920x600 (Proporción exacta aspect-[192/60] o simplificado a [16/5]) */}
        <div className="hidden md:block relative w-full aspect-16/5 overflow-hidden rounded-sm bg-(--background)">
          <Image
            src="/EncabezadoCronicas.jpg"
            alt="Hero Desktop"
            fill
            priority
            className="object-contain object-center"
          />
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