import PodcastCard from "@/components/PodcastCard";
import { getAllPodcasts } from "@/services/podcasts";

/**
 * 🔥 FORZAR ESTÁTICO
 */
export const revalidate = 60;

export default async function PodcastsPage() {
  
  
  let podcasts = [];

  try {
    podcasts = await getAllPodcasts();
  
  } catch (error) {
    console.error("Error cargando podcasts:", error);
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Podcasts</h1>

      {podcasts.length === 0 ? (
        <p className="text-gray-500">No hay podcasts disponibles.</p>
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
