import Link from "next/link";
import { notFound } from "next/navigation";
import { getPodcastBySlug, getAllPodcasts } from "@/services/podcasts";
import Article from "@/components/editorial/Article";

/**
 * 🔥 Configuración de revalidación
 */
export const revalidate = 60;
export const dynamicParams = true;

export default async function PodcastDetailPage({ params }) {
  // ✅ params es Promise en Next.js moderno
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  let post = null;

  try {
    post = await getPodcastBySlug(slug);
  } catch (error) {
    console.error("Error obteniendo podcast:", error);
  }

  // 🔥 Fallback si no existe el post
  if (!post) {
    return (
      <main className="max-w-4xl mx-auto p-10">
        <h1 className="text-2xl font-bold">
          Próximamente contenido disponible
        </h1>

        <Link
          href="/podcasts"
          className="text-sm text-gray-500 hover:text-indigo-600"
        >
          ← Volver a crónicas
        </Link>
      </main>
    );
  }

  // Formateo de fecha de emisión (publishedAt o date)
  const rawDate = post.publishedAt || post.date;
  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // 📸 Armamos el array de imágenes para el slider
  // Junta las imágenes ACF y la imagen principal si existen
  const imagenesSlider = [
    post.imageUrl,
    post.acf?.imagen_1,
    post.acf?.imagen_2,
    post.acf?.imagen_3,
  ].filter(Boolean);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex justify-end">
        <Link
          href="/podcasts"
          className="text-sm text-gray-500 hover:text-indigo-600"
        >
          ← Volver a crónicas
        </Link>
      </div>

      <Article
        title={post.title}
        author={post.author || "Crónicas de un Espectador"}
        date={formattedDate}
        readingTime={post.duration ? `Duración: ${post.duration}` : ""}
        audioUrl={post.audioUrl}
        imagenes={imagenesSlider}
      >
        {/* Bajada opcional arriba del texto */}
        {post.bajada && (
          <p className="podcast-bajada text-lg font-medium mb-6 text-zinc-600">
            {post.bajada}
          </p>
        )}

        {/* HTML del cuerpo principal */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </Article>
    </main>
  );
}

/**
 * 🔥 Generación de slugs (opcional para build)
 */
export async function generateStaticParams() {
  try {
    const posts = await getAllPodcasts();

    if (!Array.isArray(posts) || posts.length === 0) {
      return [{ slug: "preview" }];
    }

    return posts.map((post) => ({
      slug: String(post.slug),
    }));
  } catch (error) {
    console.error("Error en generateStaticParams:", error);
    return [{ slug: "preview" }];
  }
}