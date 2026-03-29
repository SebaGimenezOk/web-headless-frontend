const API_URL = process.env.NEXT_PUBLIC_API_URL;

const BASE_ENDPOINT = `${API_URL}/wp-json/wp/v2/podcast`;

export async function getAllPodcasts() {
  try {
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL no está definida");
    }

    const res = await fetch(`${BASE_ENDPOINT}?_embed`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Error HTTP:", res.status, await res.text());
      return [];
    }

    const posts = await res.json();

    if (!Array.isArray(posts)) {
      console.error("Respuesta inválida:", posts);
      return [];
    }

    return posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered?.replace(/<[^>]+>/g, "") || "",
      excerpt: post.excerpt?.rendered || "",
      content: post.content?.rendered || "",
      publishedAt: post.date || null,

      author: post.acf?.author || "Desconocido",
      duration: post.acf?.duration || null,

      imageUrl:
        post.acf?.cover_image?.url ||
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        null,

      audioUrl: post.acf?.audio_url || null,
    }));
  } catch (error) {
    console.error("Fetch falló:", error);
    return [];
  }
}

export async function getPodcastBySlug(slug) {
  try {
    const res = await fetch(
      `${BASE_ENDPOINT}?slug=${slug}&_embed`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error("Error HTTP:", res.status, await res.text());
      return null;
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) return null;

    const post = data[0];

    return {
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered?.replace(/<[^>]+>/g, "") || "",
      excerpt: post.excerpt?.rendered || "",
      content: post.content?.rendered || "",
      publishedAt: post.date || null,

      author: post.acf?.author || "Desconocido",
      duration: post.acf?.duration || null,

      imageUrl:
        post.acf?.cover_image?.url ||
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        null,

      audioUrl: post.acf?.audio_url || null,
    };
  } catch (error) {
    console.error("Fetch slug falló:", error);
    return null;
  }
}