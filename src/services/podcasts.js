const API_URL = "https://api.cronicasdeunespectador.com";
const BASE_ENDPOINT = `${API_URL}/wp-json/wp/v2/podcast`;


// 🧠 NORMALIZADOR CENTRAL (CLAVE DEL SISTEMA)
function normalizePost(post) {
  const terms = post._embedded?.["wp:term"] || [];

  const category =
    terms.flat().find((t) => t.taxonomy === "category")?.name ||
    "Sin categoría";

  return {
    id: post.id,
    slug: post.slug,

    title:
      post.title?.rendered?.replace(/<[^>]+>/g, "") || "",

    content: post.content?.rendered || "",
    excerpt:
      post.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "",

    imageUrl:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,

    author:
      post._embedded?.author?.[0]?.name || "Autor desconocido",

    category,

    publishedAt: post.date || null,

    // 🎧 ACF (verificar que esté habilitado en WP)
    audioUrl: post.acf?.audio || null,
    duration: post.acf?.duracion || null,
  };
}


// 🔹 TODOS LOS PODCASTS
export async function getAllPodcasts() {
  try {
    const res = await fetch(`${BASE_ENDPOINT}?_embed`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const posts = await res.json();

    return posts.map(normalizePost);
  } catch (error) {
    console.error("getAllPodcasts error:", error);
    return [];
  }
}


// 🔹 PODCAST POR SLUG
export async function getPodcastBySlug(slug) {
  try {
    const res = await fetch(
      `${BASE_ENDPOINT}?slug=${slug}&_embed`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.length) return null;

    return normalizePost(data[0]);
  } catch (error) {
    console.error("getPodcastBySlug error:", error);
    return null;
  }
}


// 🔹 POR TEMPORADA
export async function getPodcastsByTemporadaId(temporadaId) {
  try {
    const res = await fetch(
      `${BASE_ENDPOINT}?temporada=${temporadaId}&_embed`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return data.map(normalizePost);
  } catch (error) {
    console.error("getPodcastsByTemporadaId error:", error);
    return [];
  }
}


// 🔹 POR CATEGORÍA
export async function getPodcastsByCategoriaId(categoriaId) {
  try {
    const res = await fetch(
      `${BASE_ENDPOINT}?categoria=${categoriaId}&_embed`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return data.map(normalizePost);
  } catch (error) {
    console.error("getPodcastsByCategoriaId error:", error);
    return [];
  }
}