const API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

/**
 * Obtener un podcast por slug
 */
export async function getPodcastBySlug(slug) {
  if (!API_URL) {
    throw new Error("WP API URL no definida");
  }

  const res = await fetch(
    `${API_URL}/wp/v2/podcast?slug=${slug}&_embed`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Error al obtener el podcast");
  }

  const data = await res.json();

  if (!data || data.length === 0) {
    return null;
  }

  const post = data[0];

  const stripHtml = (html) =>
    html.replace(/<[^>]*>?/gm, "").trim();

  const contentRaw = post.content?.rendered || "";
  const excerptRaw = post.excerpt?.rendered || "";

  return {
    id: post.id,
    slug: post.slug,
    title: post.title?.rendered || "Sin título",
    content: post.content?.rendered || "",
    excerpt:
      stripHtml(excerptRaw) ||
      stripHtml(contentRaw).slice(0, 140),
    author: post.acf?.author || "Desconocido",
    duration: post.acf?.duration || null,
    imageUrl:
      post.acf?.cover_image?.url ||
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      null,
      audioUrl: post?.acf?.audio_url,
  };
}
