import Article from "@/components/editorial/Article";

async function getPodcasts() {
  try {
    const res = await fetch(
      "https://api.cronicasdeunespectador.com/wp-json/wp/v2/podcast",
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error("Error al obtener podcasts");
    }

    const data = await res.json();

    return data.map((post) => ({
      ...post,
      audioUrl: post.acf?.audio_url || null,
      author: post.acf?.author || "Autor desconocido",
    }));

  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function PodcastsPage() {
  const podcasts = await getPodcasts();

  return (
    <main style={{ padding: "20px" }}>
      <h1>Podcasts</h1>

      {podcasts.length === 0 && <p>No hay podcasts disponibles.</p>}

      <div style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
        {podcasts.map((post) => (
          <Article
            key={post.id}
            title={post?.title?.rendered || "Sin título"}
            date={post?.date || ""}
            author={post?.author || "Autor desconocido"}
            readingTime={5}
            audioUrl={post?.audioUrl || null}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: post?.content?.rendered || "",
              }}
            />
          </Article>
        ))}
      </div>
    </main>
  );
}