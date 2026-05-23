import { getTemporadaBySlug } from "@/services/taxonomies";

export default async function TemporadaPage({ params }) {
  const temporada = await getTemporadaBySlug(params.slug);

  if (!temporada) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Temporada no encontrada</h1>
        <p className="text-gray-500">
          No existe o fue eliminada.
        </p>
      </div>
    );
  }

  const podcasts = await getPodcastsByTemporadaId(temporada.id);


  return (
    <div>
      <h1>{temporada.name}</h1>

      {podcasts.length === 0 ? (
        <p>No hay podcasts</p>
      ) : (
        podcasts.map((p) => (
          <div key={p.id}>
            {p.title}
          </div>
        ))
      )}
    </div>
  );
}