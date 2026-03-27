// src/lib/wordpress.js

const API_URL = "https://api.cronicasdeunespectador.com/wp-json/wp/v2";

export async function getPodcasts() {
const res = await fetch(`${API_URL}/podcast`, {
  next: { revalidate: 0 },
});

  if (!res.ok) {
    throw new Error("Error al obtener podcasts");
  }

  return res.json();
}
