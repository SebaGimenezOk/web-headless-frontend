"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-(--background)mb-8 ">
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
      <div className="px-2.5 w-full mb-2">
        <div className="h-px bg-[#bfa15f] opacity-40 w-full" />
      </div>
    </section>
  );
}
