const API_URL = process.env.NEXT_PUBLIC_API_URL;

// =========================
// TEMPORADAS
// =========================

export async function getTemporadas() {
  try {
    const res = await fetch(
      `${API_URL}/wp-json/wp/v2/temporada`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return data.map((t) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
    }));
  } catch (err) {
    console.error("getTemporadas error:", err);
    return [];
  }
}

export async function getTemporadaBySlug(slug) {
  try {
    const res = await fetch(
      `${API_URL}/wp-json/wp/v2/temporada?slug=${slug}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const t = data[0];

    return {
      id: t.id,
      name: t.name,
      slug: t.slug,
      description: t.description || "",
    };
  } catch (err) {
    console.error("getTemporadaBySlug error:", err);
    return null;
  }
}

// =========================
// CATEGORÍAS
// =========================

export async function getCategorias() {
  try {
    const res = await fetch(
      `${API_URL}/wp-json/wp/v2/categoria`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return data.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
    }));
  } catch (err) {
    console.error("getCategorias error:", err);
    return [];
  }
}

export async function getCategoriaBySlug(slug) {
  try {
    const res = await fetch(
      `${API_URL}/wp-json/wp/v2/categoria?slug=${slug}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const c = data[0];

    return {
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || "",
    };
  } catch (err) {
    console.error("getCategoriaBySlug error:", err);
    return null;
  }
}