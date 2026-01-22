// src/app/page.jsx

import Link from "next/link";
import PodcastCard from "@/components/PodcastCard";
import Hero from "@/components/Hero";

async function getLatestPodcasts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener podcasts");
  }

  const data = await res.json();
  return data.slice(0, 3);
}

export default async function HomePage() {
  const podcasts = await getLatestPodcasts();

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* CONTENIDO */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* ÚLTIMOS PODCASTS */}
        <section className="pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl uppercase font-semibold">
              Episodios Recientes
            </h2>

            <Link
              href="/podcasts"
              className="text-sm text-gray-500 hover:text-indigo-600"
            >
              Ver todos los podcasts
            </Link>
          </div>

          {podcasts.length === 0 ? (
            <p className="text-gray-500 italic">
              No hay podcasts disponibles por el momento.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {podcasts.map((podcast) => (
                <PodcastCard key={podcast.id} post={podcast} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
