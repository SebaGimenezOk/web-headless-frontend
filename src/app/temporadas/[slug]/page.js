export const revalidate = 60;

import { getTemporadaBySlug } from "@/services/taxonomies";
import { getPodcastsByTemporadaId } from "@/services/podcasts";
import Image from "next/image";
import SeasonHero from "@/components/SeasonHero";

export default async function TemporadaPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const temporada = await getTemporadaBySlug(slug);

  if (!temporada) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">
          Temporada no encontrada
        </h1>
      </div>
    );
  }

  const podcasts = await getPodcastsByTemporadaId(temporada.id);

  return (
    <>
      {/* ENCABEZADO IDÉNTICO AL DE CATEGORÍAS */}
      <SeasonHero slug={slug} seasonName={temporada.name} />

      <div className="px-6 py-8 max-w-6xl mx-auto">
        {/* TÍTULO */}
        <h1 className="text-3xl md:text-4xl font-heading uppercase mb-8">
          {temporada.name}
        </h1>

        {/* GRID */}
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

                  {/* IMAGEN */}
                  {p.imageUrl && (
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover group-hover:scale-105 transition"
                    />
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
    </>
  );
}