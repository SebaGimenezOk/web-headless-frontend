const API_URL = "https://api.cronicasdeunespectador.com";
const BASE_ENDPOINT = `${API_URL}/wp-json/wp/v2/podcast`;


export async function getAllPodcasts() {
  try {
    const res = await fetch(`${BASE_ENDPOINT}?_embed`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const posts = await res.json();

    return posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title:
        post.title?.rendered?.replace(/<[^>]+>/g, "") || "",
      imageUrl:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        null,
    }));
  } catch (error) {
    console.error(error);
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

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.length) return null;

    const post = data[0];

    return {
      id: post.id,
      slug: post.slug,
      title:
        post.title?.rendered?.replace(/<[^>]+>/g, "") || "",
      content: post.content?.rendered || "",
      excerpt: post.excerpt?.rendered || "",
      imageUrl:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        null,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}


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

    return data.map((post) => ({
      id: post.id,
      slug: post.slug,
      title:
        post.title?.rendered?.replace(/<[^>]+>/g, "") || "",
      imageUrl:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        null,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}


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

    return data.map((post) => ({
      id: post.id,
      slug: post.slug,
      title:
        post.title?.rendered?.replace(/<[^>]+>/g, "") || "",
      imageUrl:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        null,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}