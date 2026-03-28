import Link from "next/link";
import { notFound } from "next/navigation";
import { getPodcastBySlug, getAllPodcasts } from "@/services/podcasts";
import PlayButton from "@/components/PlayButton";

/**
 * 🔥 Configuración de revalidación
 */
export const revalidate = 60;
export const dynamicParams = true;

export default async function PodcastDetailPage({ params }) {
  // ✅ params ahora es una Promise en Next.js moderno
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
          ← Volver a podcasts
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <Link
        href="/podcasts"
        className="text-sm text-gray-500 hover:text-indigo-600"
      >
        ← Volver a podcasts
      </Link>

      <article className="mt-6 space-y-6">
        <h1 className="text-4xl uppercase font-bold leading-tight">
          {post.title}
        </h1>

        <div className="text-sm text-gray-500 flex flex-wrap items-center gap-3">
          <span>{post.author}</span>

          {post.duration && <span>• {post.duration} min</span>}

          {post.audioUrl && (
            <>
              <span>•</span>
              <PlayButton url={post.audioUrl} />
            </>
          )}
        </div>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full rounded-2xl shadow-md"
          />
        )}

        <div
          className="prose prose-lg max-w-none"
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