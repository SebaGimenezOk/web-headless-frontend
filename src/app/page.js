import Hero from "@/components/Hero";
import HomeContent from "@/components/HomeContent";

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
      <Hero />
      <HomeContent podcasts={podcasts} />
    </>
  );
}