export const revalidate = 60;

import { getTemporadaBySlug } from "@/services/taxonomies";
import { getPodcastsByTemporadaId } from "@/services/podcasts";
import Image from "next/image";

// Map de imágenes por slug de temporada
const SEASON_HEROES = {
  "2024": {
    desktop: "/EncabezadoTemporada2024.jpg",
    mobile: "/EncabezadoTemporada2024mobile.jpg",
  },
  "2025": {
    desktop: "/EncabezadoTemporada2025.jpg",
    mobile: "/EncabezadoTemporada2025mobile.jpg",
  },
  "2026": {
    desktop: "/EncabezadoTemporada2026.jpg",
    mobile: "/EncabezadoTemporada2026mobile.jpg",
  },
};

export default async function TemporadaPage({ params }) {
  // 🔥 CLAVE: esperar params
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const temporada = await getTemporadaBySlug(slug);

  if (!temporada) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Temporada no encontrada</h1>
      </div>
    );
  }

  const podcasts = await getPodcastsByTemporadaId(temporada.id);

  // Seleccionamos las imágenes correspondientes o un fallback predeterminado
  const heroImages = SEASON_HEROES[slug] || {
    desktop: "/encabezado-cronicas.jpg",
    mobile: "/encabezado-cronicas-mobile.jpg",
  };

  return (
    <div>
      {/* HERO / ENCABEZADO DE LA TEMPORADA */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden bg-neutral-900 mb-8">
        <picture>
          <source media="(max-width: 639px)" srcSet={heroImages.mobile} />
          <Image
            src={heroImages.desktop}
            alt={temporada.name}
            fill
            priority
            className="object-cover object-center"
          />
        </picture>
        {/* Overlay oscuro y título si preferís que el nombre de la temporada esté sobre la imagen */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
          <h1 className="text-3xl md:text-5xl font-heading text-white font-bold text-center tracking-wide drop-shadow-md">
            {temporada.name}
          </h1>
        </div>
      </div>

      {/* CONTENIDO Y GRID */}
      <div className="px-6 pb-12 max-w-6xl mx-auto">
        {podcasts.length === 0 ? (
          <p className="text-gray-500">
            No hay podcasts en esta temporada.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {podcasts.map((p) => (
              <a
                key={p.id}
                href={`/podcasts/${p.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
                  {/* IMAGEN DEL PODCAST */}
                  {p.imageUrl && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}

                  {/* TEXTO */}
                  <div className="p-4">
                    <h2 className="font-semibold text-lg leading-snug group-hover:text-gray-600 transition">
                      {p.title}
                    </h2>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}