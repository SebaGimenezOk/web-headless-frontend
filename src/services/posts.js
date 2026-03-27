// src/services/posts.js
const WP_API = process.env.NEXT_PUBLIC_API_URL;

/**
 * Obtener todos los podcasts desde WordPress
 * Compatible con export estático
 */
export async function getAllPosts() {
  try {
    if (!WP_API) {
      throw new Error("WP API URL no definida");
    }

    const res = await fetch(`${WP_API}/wp/v2/podcast?_embed`);

    if (!res.ok) {
      throw new Error("Error al obtener podcasts de WordPress");
    }

    const posts = await res.json();

    const normalized = posts.map((post) => {
      const contentRaw = post.content?.rendered || "";
      const excerptRaw = post.excerpt?.rendered || "";

      const stripHtml = (html) =>
        html.replace(/<[^>]*>?/gm, "").trim();

      const excerpt =
        stripHtml(excerptRaw) ||
        stripHtml(contentRaw).slice(0, 140) ||
        "";

      return {
        id: post.id,
        slug: post.slug,
        title: post.title?.rendered || "Sin título",
        content: stripHtml(contentRaw),
        excerpt,
        author: post.acf?.author || "Desconocido",
        duration: post.acf?.duration || null,
        imageUrl:
          post.acf?.cover_image?.url ||
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          null,
        audioUrl: post?.acf?.audio_url || null,
      };
    });

    return normalized;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}