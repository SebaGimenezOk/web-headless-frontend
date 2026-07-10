"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-(--background)">
      
      {/* Versión MOBILE: Ancho total, proporción exacta 1100x900 */}
      <div className="block md:hidden relative w-full aspect-11/9 overflow-hidden">
        <Image
          src="/encabezado-cronicas-mobile.jpg"
          alt="Hero Mobile"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Versión DESKTOP: Ancho total de pantalla a pantalla, proporción exacta 1920x600 */}
      <div className="hidden md:block relative w-full aspect-192/60 overflow-hidden">
        <Image
          src="/encabezado-cronicas.jpg"
          alt="Hero Desktop"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

    </section>
  );
}