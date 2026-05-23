import { getCategoriaBySlug } from "@/services/taxonomies";

export default async function CategoriaPage({ params }) {
  const categoria = await getCategoriaBySlug(params.slug);

  if (!categoria) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Categoría no encontrada</h1>
        <p className="text-gray-500">
          No existe o fue eliminada.
        </p>
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{categoria.name}</h1>

      {categoria.description && (
        <div
          className="mt-4 prose"
          dangerouslySetInnerHTML={{
            __html: categoria.description,
          }}
        />
      )}
    </main>
  );
}