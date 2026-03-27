const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch genérico a WordPress
 */
async function fetchAPI(endpoint) {
  if (!API_URL) {
    throw new Error("WordPress API URL no definida");
  }

  const res = await fetch(`${API_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error(`Error al obtener WordPress API: ${endpoint}`);
  }

  return res.json();
}

/**
 * Obtener posts
 * - Compatible con export estático
 */
export async function getPosts() {
  return fetchAPI("/wp/v2/posts?_embed&per_page=100");
}

/**
 * Obtener páginas
 * - Compatible con export estático
 */
export async function getPages() {
  return fetchAPI("/wp/v2/pages?_embed&per_page=100");
}