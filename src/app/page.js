// src/app/page.jsx

import Link from "next/link";
import PodcastCard from "@/components/PodcastCard";

async function getLatestPodcasts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener podcasts");
  }

  const data = await res.json();

  // mostramos solo los últimos 3
  return data.slice(0, 3);
}

export default async function HomePage() {
  const podcasts = await getLatestPodcasts();

  return (
    <main className="max-w-6xl mx-auto px-6 py-14 space-y-16">
      {/* HERO */}
      <section className="max-w-3xl space-y-4">
        <h1 className="text-4xl md:text-5xl leading-tight">
          Contenidos y análisis en formato Podcast
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed">
          Un espacio donde reunimos episodios, análisis y contenidos
          publicados desde nuestro sistema editorial.
        </p>

        <Link
          href="/podcasts"
          className="
            inline-block
            mt-4
            text-indigo-600
            font-medium
            hover:underline
          "
        >
          Ver todos los podcasts →
        </Link>
      </section>

      {/* ÚLTIMOS PODCASTS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Episodios Recientes
          </h2>

          <Link
            href="/podcasts"
            className="text-sm text-gray-500 hover:text-indigo-600"
          >
            Ver todos
          </Link>
        </div>

        {podcasts.length === 0 ? (
          <p className="text-gray-500 italic">
            No hay podcasts disponibles por el momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {podcasts.map((podcast) => (
              <PodcastCard key={podcast.id} post={podcast} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
