const API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

/**
 * Fetch genérico a WordPress
 */
async function fetchAPI(endpoint) {
  if (!API_URL) {
    throw new Error("WordPress API URL is not defined");
  }

  const res = await fetch(`${API_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("Failed to fetch WordPress API");
  }

  return res.json();
}

/**
 * Obtener posts
 */
export async function getPosts() {
  return fetchAPI("/wp/v2/posts");
}

/**
 * Obtener páginas
 */
export async function getPages() {
  return fetchAPI("/wp/v2/pages");
}
