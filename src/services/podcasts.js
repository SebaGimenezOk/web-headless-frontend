const API_URL = "https://api.cronicasdeunespectador.com";
const BASE_ENDPOINT = `${API_URL}/wp-json/wp/v2/podcast?_embed`;

/**
 * 🔥 Mapper central (Resuelve datos de WP, Taxonomías e imágenes ACF)
 */
function mapPost(post) {
  const temporadas =
    post._embedded?.["wp:term"]?.[0]?.map((t) => t.name) || [];

  const categorias =
    post._embedded?.["wp:term"]?.[1]?.map((c) => c.name) || [];

  // Mapeo inteligente de campos ACF (Soporta URL string, Objeto ACF e IDs numéricos de WP)
  const rawAcf = post.acf || {};
  const acfResolved = {};

  Object.keys(rawAcf).forEach((key) => {
    const val = rawAcf[key];

    if (!val) return;

    // Caso 1: String directo (URL)
    if (typeof val === "string" && val.startsWith("http")) {
      acfResolved[key] = val;
    }
    // Caso 2: Objeto ACF con propiedad .url
    else if (typeof val === "object" && val?.url) {
      acfResolved[key] = val.url;
    }
    // Caso 3: ID numérico -> Busca la URL real en los medios embebidos (_embedded)
    else if (typeof val === "number" && post._embedded?.["wp:attachment"]) {
      const media = post._embedded["wp:attachment"].find((item) => item.id === val);
      if (media?.source_url) {
        acfResolved[key] = media.source_url;
      }
    }
  });

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

    // 🔥 CAMPOS ACF INDIVIDUALES
    author: post.acf?.author || "Autor desconocido",
    bajada: post.acf?.bajada || "",
    audioUrl: post.acf?.audio_url || null,
    duration: post.acf?.duration || null,
    location: post.acf?.ubicacion || post.acf?.location || null,
    plateanetUrl: post.acf?.link_plateanet || null,
    alternativaUrl: post.acf?.alternativa_teatral || null,

    // 🔥 OBJETO ACF COMPLETO TRADUCIDO
    acf: acfResolved,

    // 🔥 TAXONOMÍAS
    category: categorias.length ? categorias.join(", ") : "Sin categoría",
    temporada: temporadas.length ? temporadas.join(", ") : "Sin temporada",

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
    const res = await fetch(`${BASE_ENDPOINT}&slug=${slug}`, {
      next: { revalidate: 60 },
    });

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
    const res = await fetch(`${BASE_ENDPOINT}&temporada=${temporadaId}`, {
      next: { revalidate: 60 },
    });

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
    const res = await fetch(`${BASE_ENDPOINT}&categoria=${categoriaId}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data.map(mapPost) : [];
  } catch (error) {
    console.error("Error getPodcastsByCategoriaId:", error);
    return [];
  }
}