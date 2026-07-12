import PodcastList from "@/components/PodcastList";
import { getAllPodcasts } from "@/services/podcasts";

export const revalidate = 60;

export default async function PodcastsPage() {
  const posts = await getAllPodcasts();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      
      <h1 className="text-3xl font-bold uppercase mb-6">
        CRÓNICAS
      </h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">
          No hay crónicas disponibles.
        </p>
      ) : (
        <PodcastList posts={posts} />
      )}

    </main>
  );
}