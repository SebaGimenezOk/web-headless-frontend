const API_URL = "https://api.cronicasdeunespectador.com";
const BASE_ENDPOINT = `${API_URL}/wp-json/wp/v2/podcast?_embed`;

/**
 * 🛠️ Función auxiliar para obtener la URL de un ID de medio directamente de WordPress
 */
async function fetchImageUrlById(mediaId) {
  if (!mediaId || typeof mediaId !== "number") return null;
  try {
    const res = await fetch(`${API_URL}/wp-json/wp/v2/media/${mediaId}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const mediaData = await res.json();
    return mediaData?.source_url || mediaData?.guid?.rendered || null;
  } catch (error) {
    console.error(`Error buscando imagen ID ${mediaId}:`, error);
    return null;
  }
}

/**
 * 🔥 Mapper central (Resuelve URLs, Objetos ACF e IDs numéricos asincrónicamente)
 */
async function mapPost(post) {
  const temporadas =
    post._embedded?.["wp:term"]?.[0]?.map((t) => t.name) || [];

  const categorias =
    post._embedded?.["wp:term"]?.[1]?.map((c) => c.name) || [];

  const rawAcf = post.acf || {};
  const acfResolved = {};

  // Procesamos todas las claves de ACF
  const acfKeys = Object.keys(rawAcf);
  
  for (const key of acfKeys) {
    const val = rawAcf[key];

    if (!val) continue;

    // Caso 1: String directo (URL)
    if (typeof val === "string" && val.startsWith("http")) {
      acfResolved[key] = val;
    }
    // Caso 2: Objeto ACF con .url
    else if (typeof val === "object" && val?.url) {
      acfResolved[key] = val.url;
    }
    // Caso 3: ID numérico (ej: 69, 74, 80) -> Consulta la API REST de media de WordPress
    else if (typeof val === "number" && val > 0) {
      const fetchedUrl = await fetchImageUrlById(val);
      if (fetchedUrl) {
        acfResolved[key] = fetchedUrl;
      }
    }
  }

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

    // 🔥 OBJETO ACF CON LAS URLS RESUELTAS
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
    return await Promise.all(data.map(mapPost));
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

    return await mapPost(data[0]);
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
    return Array.isArray(data) ? await Promise.all(data.map(mapPost)) : [];
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
    return Array.isArray(data) ? await Promise.all(data.map(mapPost)) : [];
  } catch (error) {
    console.error("Error getPodcastsByCategoriaId:", error);
    return [];
  }
}