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

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{temporada.name}</h1>

      {temporada.description && (
        <div
          className="mt-4 prose"
          dangerouslySetInnerHTML={{
            __html: temporada.description,
          }}
        />
      )}
    </main>
  );
}