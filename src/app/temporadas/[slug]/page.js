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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {temporada.name}
      </h1>

      {podcasts.length === 0 ? (
        <p>No hay podcasts</p>
      ) : (
        <div className="space-y-2">
          {podcasts.map((p) => (
            <div key={p.id}>{p.title}</div>
          ))}
        </div>
      )}
    </div>
  );
}