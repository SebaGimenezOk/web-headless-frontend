// app/page.js

async function getPosts() {
  try {
    const res = await fetch(
      "https://api.cronicasdeunespectador.com/wp-json/wp/v2/posts",
      {
        // Importante para datos dinámicos desde WordPress
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Error al obtener posts");
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main style={{ padding: "20px" }}>
      <h1>Podcasts / Posts</h1>

      {posts.length === 0 && <p>No hay posts disponibles.</p>}

      <div style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
        {posts.map((post) => (
          <article
            key={post.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <h2
              dangerouslySetInnerHTML={{
                __html: post.title.rendered,
              }}
            />

            <div
              dangerouslySetInnerHTML={{
                __html: post.excerpt.rendered,
              }}
            />
          </article>
        ))}
      </div>
    </main>
  );
}