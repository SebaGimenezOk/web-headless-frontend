// src/app/podcasts/page.jsx

import { getPodcasts } from "@/lib/wordpress";
import PodcastCard from "@/components/PodcastCard";

export default async function PodcastsPage() {
  const podcasts = await getPodcasts();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Podcasts
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {podcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </section>
    </main>
  );
}
