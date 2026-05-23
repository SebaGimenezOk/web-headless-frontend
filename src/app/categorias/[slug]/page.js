export const revalidate = 60;
import Image from "next/image";
import { getCategoriaBySlug } from "@/services/taxonomies";
import { getPodcastsByCategoriaId } from "@/services/podcasts";

export default async function CategoriaPage({ params }) {
  // 🔥 Next 16 → params async
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const categoria = await getCategoriaBySlug(slug);

  if (!categoria) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">
          Categoría no encontrada
        </h1>
      </div>
    );
  }

  const podcasts = await getPodcastsByCategoriaId(
    categoria.id
  );

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        {categoria.name}
      </h1>

      {podcasts.length === 0 ? (
        <p>No hay podcasts en esta categoría.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {podcasts.map((p) => (
            <a
              key={p.id}
              href={`/podcasts/${p.slug}`}
              className="block bg-white shadow rounded-xl overflow-hidden"
            >
              {p.imageUrl && (
     <div className="relative w-full h-48">
    <Image
      src={p.imageUrl}
      alt={p.title || "Podcast image"}
      fill
      className="object-cover"
    />
  </div>
              )}
              <div className="p-4">
                <h2 className="font-semibold">
                  {p.title}
                </h2>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}