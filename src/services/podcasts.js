const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Obtener TODOS los podcasts
 */
export async function getAllPodcasts() {
  try {
    console.log("URL de WordPress:", process.env.NEXT_PUBLIC_API_URL);
    const res = await fetch(`${API_URL}/wp/v2/podcast?_embed`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error("Error HTTP:", res.status);
      return [];
    }

    const posts = await res.json();

    if (!Array.isArray(posts)) {
      console.error("Respuesta no es array:", posts);
      return [];
    }

    return posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered || "",
      content: post.content?.rendered || "",
      author: post.acf?.author || "Desconocido",
      duration: post.acf?.duration || null,
      imageUrl:
        post.acf?.cover_image?.url ||
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        null,
      audioUrl: post?.acf?.audio_url || null,
    }));
  } catch (error) {
    console.error("Fetch falló:", error);
    return [];
  }
}

/**
 * Obtener UN podcast por slug
 */
export async function getPodcastBySlug(slug) {
  try {
    const res = await fetch(
      `${API_URL}/wp/v2/podcast?slug=${slug}&_embed`,
      {
        cache: "force-cache",
      }
    );

    if (!res.ok) {
      console.error("Error HTTP:", res.status);
      return null;
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const post = data[0];

    return {
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered || "",
      content: post.content?.rendered || "",
      author: post.acf?.author || "Desconocido",
      duration: post.acf?.duration || null,
      imageUrl:
        post.acf?.cover_image?.url ||
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        null,
      audioUrl: post?.acf?.audio_url || null,
    };
  } catch (error) {
    console.error("Fetch slug falló:", error);
    return null;
  }
}