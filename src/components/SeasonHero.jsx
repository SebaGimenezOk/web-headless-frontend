"use client";

import Image from "next/image";

export default function SeasonHero({ slug, seasonName }) {
  // Extraemos únicamente los números del slug (por si viene como "temporada-2024" o "2024")
  const yearMatch = slug ? slug.match(/\d{4}/) : null;
  const year = yearMatch ? yearMatch[0] : "2024";

  return (
    <section className="w-full bg-(--background)">
      
      {/* Versión MOBILE: Lienzo 3:2 (aspect-3/2) */}
      <div className="block md:hidden relative w-full aspect-3/2 overflow-hidden">
        <Image
          src={`/EncabezadoTemporada${year}mobile.jpg`}
          alt={`Encabezado Mobile ${seasonName || ""}`}
          fill
          priority
          className="object-cover object-center"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/encabezado-cronicas-mobile.jpg";
          }}
        />
      </div>

      {/* Versión DESKTOP: Lienzo 24:5 (aspect-24/5) */}
      <div className="hidden md:block relative w-full aspect-24/5 overflow-hidden">
        <Image
          src={`/EncabezadoTemporada${year}.jpg`}
          alt={`Encabezado Desktop ${seasonName || ""}`}
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