import Link from "next/link";
import { notFound } from "next/navigation";
import { getPodcastBySlug, getAllPodcasts } from "@/services/podcasts";
import PlayButton from "@/components/PlayButton";
import SliderImagenes from "@/components/SliderImagenes";

export const revalidate = 60;
export const dynamicParams = true;

export default async function PodcastDetailPage({ params }) {
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

  const rawDate = post.publishedAt || post.date;
  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Extrae dinámicamente post.imageUrl + cualquier clave acf que empiece con "imagen_"
  const acfImages = Object.keys(post?.acf || {})
    .filter((key) => key.startsWith("imagen_"))
    .map((key) => {
      const val = post.acf[key];
      return typeof val === "string" ? val : val?.url;
    });

  const imagenesSlider = [post.imageUrl, ...acfImages].filter(Boolean);

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
        <h1 className="text-4xl uppercase font-medium leading-tight">
          {post.title}
        </h1>

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

        {post.bajada && (
          <p className="podcast-bajada">
            {post.bajada}
          </p>
        )}

        <div className="w-full my-12">
          <SliderImagenes imagenes={imagenesSlider} />
        </div>

        <div
          className="article-content antialiased mt-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}

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