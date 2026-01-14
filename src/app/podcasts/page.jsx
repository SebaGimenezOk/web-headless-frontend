// src/app/podcasts/page.jsx

import PodcastCard from "@/components/PodcastCard";

async function getPodcasts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener podcasts");
  }

  return res.json();
}

export default async function PodcastsPage() {
  const podcasts = await getPodcasts();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Podcasts
      </h1>

      {podcasts.length === 0 ? (
        <p className="text-gray-500">
          No hay podcasts disponibles.
        </p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {podcasts.map((podcast) => (
            <PodcastCard key={podcast.id} post={podcast} />
          ))}
        </section>
      )}
    </main>
  );
}
