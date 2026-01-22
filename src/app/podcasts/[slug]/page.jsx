// src/app/podcasts/[slug]/page.jsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { getPodcastBySlug } from "@/services/podcasts";

export default async function PodcastDetailPage({ params }) {
  // 👇 Next moderno: params ES UNA PROMESA
  const { slug } = await params;

  const post = await getPodcastBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      {/* Volver */}
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

        <div  className="text-sm text-gray-500 flex gap-3">
          <span>{post.author}</span>
          {post.duration && <span>• {post.duration} min</span>}
        </div>

        {post.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
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
