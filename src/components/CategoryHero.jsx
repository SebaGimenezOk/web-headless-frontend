"use client";

import Image from "next/image";

export default function CategoryHero({ slug, categoryName }) {
  const currentSlug = slug || "default";

  return (
    <section className="w-full bg-(--background)">
      
      {/* Versión MOBILE: Lienzo de 600x400 px -> Proporción exacta 3:2 (aspect-3/2) */}
      <div className="block md:hidden relative w-full aspect-3/2 overflow-hidden">
        <Image
          src={`/encabezado-${currentSlug}-mobile.jpg`}
          alt={`Encabezado Mobile ${categoryName || ""}`}
          fill
          priority
          className="object-cover object-center"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/encabezado-cronicas-mobile.jpg";
          }}
        />
        {/* Overlay oscuro + Contenedor de Texto */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
          <h1 className="text-3xl font-bold text-white text-center tracking-tight uppercase drop-shadow-md">
            {categoryName}
          </h1>
        </div>
      </div>

      {/* Versión DESKTOP: Lienzo de 1920x400 px -> Proporción exacta 24:5 (aspect-[24/5]) */}
      <div className="hidden md:block relative w-full aspect-24/5 overflow-hidden">
        <Image
          src={`/encabezado-${currentSlug}.jpg`}
          alt={`Encabezado Desktop ${categoryName || ""}`}
          fill
          priority
          className="object-cover object-center"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/encabezado-cronicas.jpg";
          }}
        />
        {/* Overlay oscuro + Contenedor de Texto */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-widest uppercase drop-shadow-lg">
            {categoryName}
          </h1>
        </div>
      </div>

    </section>
  );
}