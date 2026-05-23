


import { getTemporadaBySlug } from "@/services/taxonomies";
import { getPodcastsByTemporadaId } from "@/services/podcasts";

export default async function TemporadaPage({ params }) {
  console.log("PARAMS:", params);

  const temporada = await getTemporadaBySlug(params.slug);

  console.log("TEMPORADA:", temporada);

  if (!temporada) {
    return <p>Temporada no encontrada</p>;
  }

  const podcasts = await getPodcastsByTemporadaId(temporada.id);

  console.log("PODCASTS:", podcasts);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {temporada.name}
      </h1>

      {podcasts.length === 0 ? (
        <p>No hay podcasts</p>
      ) : (
        <div className="grid gap-4">
          {podcasts.map((p) => (
            <div key={p.id} className="border p-3">
              {p.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}