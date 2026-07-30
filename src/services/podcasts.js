const API_URL = "https://api.cronicasdeunespectador.com";
const BASE_ENDPOINT = `${API_URL}/wp-json/wp/v2/podcast?_embed`;

/**
 * 🔥 Mapper central (LA CLAVE DE TODO)
 */
function mapPost(post) {
  const temporadas =
    post._embedded?.["wp:term"]?.[0]?.map((t) => t.name) || [];

  const categorias =
    post._embedded?.["wp:term"]?.[1]?.map((c) => c.name) || [];

  return {
    id: post.id,
    slug: post.slug,

    title:
      post.title?.rendered?.replace(/<[^>]+>/g, "") || "Sin título",

    content: post.content?.rendered || "",

    excerpt:
      post.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "",

    imageUrl:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      null,

    // 🔥 ACF FIELDS
    author: post.acf?.author || "Autor desconocido",

    bajada: post.acf?.bajada || "",

    audioUrl: post.acf?.audio_url || null,

    duration: post.acf?.duration || null,

    location: post.acf?.ubicacion || post.acf?.location || null,
    
    plateanetUrl: post.acf?.plateanet || null, 

    alternativaUrl: post.acf?.alternativa_teatral || null,

    // 🔥 TAXONOMÍAS
    category: categorias.length
      ? categorias.join(", ")
      : "Sin categoría",

    temporada: temporadas.length
      ? temporadas.join(", ")
      : "Sin temporada",

    publishedAt: post.date || null,
  };
}

/**
 * 🔥 Obtener TODOS los podcasts
 */
export async function getAllPodcasts() {
  try {
    const res = await fetch(BASE_ENDPOINT, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    return data.map(mapPost);
  } catch (error) {
    console.error("Error getAllPodcasts:", error);
    return [];
  }
}

/**
 * 🔥 Obtener por SLUG
 */
export async function getPodcastBySlug(slug) {
  try {
    const res = await fetch(
      `${BASE_ENDPOINT}&slug=${slug}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) return null;

    return mapPost(data[0]);
  } catch (error) {
    console.error("Error getPodcastBySlug:", error);
    return null;
  }
}

/**
 * 🔥 Por temporada
 */
export async function getPodcastsByTemporadaId(temporadaId) {
  try {
    const res = await fetch(
      `${BASE_ENDPOINT}&temporada=${temporadaId}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return Array.isArray(data) ? data.map(mapPost) : [];
  } catch (error) {
    console.error("Error getPodcastsByTemporadaId:", error);
    return [];
  }
}

/**
 * 🔥 Por categoría
 */
export async function getPodcastsByCategoriaId(categoriaId) {
  try {
    const res = await fetch(
      `${BASE_ENDPOINT}&categoria=${categoriaId}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return Array.isArray(data) ? data.map(mapPost) : [];
  } catch (error) {
    console.error("Error getPodcastsByCategoriaId:", error);
    return [];
  }
}