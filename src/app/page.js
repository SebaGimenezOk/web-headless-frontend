import Hero from "@/components/Hero";
import HomeContent from "@/components/HomeContent";
import { getAllPodcasts } from "@/services/podcasts";

/**
 * 🔥 FORZAR ESTÁTICO
 */
export const dynamic = "force-static";

export default async function HomePage() {
  let podcasts = [];

  try {
    const data = await getAllPodcasts();
    podcasts = data.slice(0, 3); // últimos 3
  } catch (error) {
    console.error("Error cargando podcasts:", error);
  }

  return (
    <>
      <Hero />
      <HomeContent podcasts={podcasts} />
    </>
  );
}