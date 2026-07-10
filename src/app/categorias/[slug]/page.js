export const revalidate = 60;
import Image from "next/image";
import { getCategoriaBySlug } from "@/services/taxonomies";
import { getPodcastsByCategoriaId } from "@/services/podcasts";
import { getAllPodcasts } from "@/services/podcasts";
import CategoryHero from "@/components/CategoryHero"; 

// 📝 Diccionario para que el título cambie de verdad según el slug actual
const categoryTitles = {
  cine: { es: "Cine", en: "Cinema" },
  ballet: { es: "Ballet", en: "Ballet" },
  cronicas: { es: "Crónicas", en: "Chronicles" },
};

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

  const podcasts = await getPodcastsByCategoriaId(categoria.id);

  // 1. Detectamos si la URL actual corresponde a la versión en inglés
  const isEnglish = slug.endsWith("-en") || slug.includes("/en/"); 
  const currentLang = isEnglish ? "en" : "es";

  // 2. Buscamos la traducción limpia
  const baseSlug = slug.replace("-en", ""); 
  const displayTitle = categoryTitles[baseSlug]?.[currentLang] || categoria.name;

  return (
    <main className="w-full bg-(--background)">
      
      {/* 1. ENCABEZADO DINÁMICO: Imagen 100% limpia sin textos arriba */}
      <CategoryHero slug={slug} categoryName={displayTitle} />

      {/* 2. CONTENIDO INFERIOR: Contenedor con ancho máximo y márgenes alineados */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        
        {/* Título de la categoría: Abajo, a la izquierda, color fuerte/negro */}
        <header className="mb-10 text-left">
          <h1 className="text-3xl md:text-4xl font-black text-(--text-strong) tracking-wide uppercase">
            {displayTitle}
          </h1>
          <div className="mt-2 h-[2px] w-16 bg-(--text-strong) opacity-80" /> {/* Detalle visual: subrayado corto elegante */}
        </header>
        
        {podcasts.length === 0 ? (
          <p className="text-center text-(--text-muted) py-8">
            {isEnglish ? "No podcasts found in this category." : "No hay podcasts en esta categoría."}
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