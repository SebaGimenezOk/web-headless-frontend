"use client";

import Image from "next/image";

export default function CategoryHero({ slug, categoryName }) {
  const currentSlug = slug || "default";

  return (
    <section className="w-full bg-(--background)">
      
      {/* Versión MOBILE: Lienzo de 600x400 px -> Proporción exacta 3:2 (aspect-[3/2]) */}
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
      </div>

    </section>
  );
}