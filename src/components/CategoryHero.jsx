"use client";

import Image from "next/image";

export default function CategoryHero({ slug, categoryName }) {
 
  const currentSlug = slug || "default";

  return (
    <section className="w-full bg-(--background)">
      
      {/* Versión MOBILE: Ancho total, proporción exacta 1100x900 */}
      <div className="block md:hidden relative w-full aspect-[11/9] overflow-hidden">
        <Image
          src={`/encabezado-${currentSlug}-mobile.jpg`}
          alt={`Encabezado Mobile ${categoryName || ""}`}
          fill
          priority
          className="object-cover object-center"
          // Si una imagen no existe todavía, evita que rompa la pantalla
          onError={(e) => {
            e.currentTarget.src = "/encabezadocronicasmobile.jpg";
          }}
        />
      </div>

      {/* Versión DESKTOP: Ancho total de pantalla a pantalla, proporción exacta 1920x600 */}
      <div className="hidden md:block relative w-full aspect-[192/60] overflow-hidden">
        <Image
          src={`/encabezado-${currentSlug}.jpg`}
          alt={`Encabezado Desktop ${categoryName || ""}`}
          fill
          priority
          className="object-cover object-center"
          onError={(e) => {
            e.currentTarget.src = "/encabezadocronicas.jpg";
          }}
        />
      </div>

    </section>
  );
}