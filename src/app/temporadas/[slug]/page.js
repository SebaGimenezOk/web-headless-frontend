export const revalidate = 60;

import { getTemporadaBySlug } from "@/services/taxonomies";
import { getPodcastsByTemporadaId } from "@/services/podcasts";

export default async function TemporadaPage({ params }) {
  // 🔥 CLAVE: hay que esperar params
  const resolvedParams = await params;

  const slug = resolvedParams.slug;

  console.log("SLUG:", slug);

  const temporada = await getTemporadaBySlug(slug);

  console.log("TEMPORADA:", temporada);

  if (!temporada) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">
          Temporada no encontrada
        </h1>
      </div>
    );
  }

  const podcasts = await getPodcastsByTemporadaId(
    temporada.id
  );

  return (
  <div className="px-6 py-8 max-w-6xl mx-auto">
    {/* TÍTULO */}
    <h1 className="text-3xl md:text-4xl font-bold mb-8">
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
                <img
                  src={p.imageUrl}
                  alt={p.title}
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
);
}