import Link from "next/link";
import { notFound } from "next/navigation";
import { getPodcastBySlug, getAllPodcasts } from "@/services/podcasts";
import PlayButton from "@/components/PlayButton";
import SliderImagenes from "@/components/SliderImagenes"; // 1. Importamos el slider

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

  // 2. Armamos la lista con la foto principal + campos de ACF que existan
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

      <article className="mt-6 space-y-6">
        {/* TÍTULO */}
        <h1 className="text-4xl uppercase font-medium leading-tight">
          {post.title}
        </h1>

        {/* FECHA DE EMISIÓN | AUTOR / DURACIÓN / AUDIO */}
        <div className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
          {formattedDate && <span>{formattedDate}</span>}
          {formattedDate && post.author && <span>|</span>}
          {post.author && (
            <span>
              autor: <strong>{post.author}</strong>
            </span>
          )}

          {post.duration && (
            <span>
              • <strong>Duración:</strong> {post.duration}
            </span>
          )}

          {post.audioUrl && (
            <>
              <span>•</span>
              <PlayButton url={post.audioUrl} label="Posee Entrevista 🎙️"/>
            </>
          )}
        </div>

        {/* BAJADA */}
        {post.bajada && (
          <p className="podcast-bajada">
            {post.bajada}
          </p>
        )}

        {/* SLIDER / IMAGEN */}
        <div className="w-full my-12">
          <SliderImagenes imagenes={imagenesSlider} />
        </div>

        {/* CONTENIDO */}
        <div
          className="article-content antialiased mt-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
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