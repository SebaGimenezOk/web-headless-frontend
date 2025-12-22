export async function getPodcasts() {
  const res = await fetch("https://web-headless.local/wp-json/wp/v2/podcast?_embed");
  if (!res.ok) throw new Error("Error al obtener los podcasts");
  return res.json();
}
