export const revalidate = 60;
import Image from "next/image";
import { getCategoriaBySlug } from "@/services/taxonomies";
import { getPodcastsByCategoriaId } from "@/services/podcasts";
import { getAllPodcasts } from "@/services/podcasts";
import CategoryHero from "@/components/CategoryHero"; 

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
    <main className="w-full bg-(--background)">
      
      {/* 1. ENCABEZADO DINÁMICO: Ocupa el 100% del ancho de pantalla sin márgenes */}
      <CategoryHero slug={slug} categoryName={categoria.name} />

      {/* 2. CONTENIDO INFERIOR: Mantiene la grilla de podcasts centrada y ordenada */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        
        {podcasts.length === 0 ? (
          <p className="text-center text-(--text-muted) py-8">
            No hay podcasts en esta categoría.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {podcasts.map((p) => (
              <a
                key={p.id}
                href={`/podcasts/${p.slug}`}
                className="block bg-white shadow rounded-xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
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
                  <h2 className="font-semibold text-(--text-strong)">
                    {p.title}
                  </h2>
                </div>
              </a>
            ))}
          </div>
        )}
        
      </section>
    </main>
  );
}