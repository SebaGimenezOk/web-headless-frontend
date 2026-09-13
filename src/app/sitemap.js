export default async function sitemap() {
  const baseUrl = 'https://cronicasdeunespectador.com'
  const wpApiUrl = 'https://api.cronicasdeunespectador.com/wp-json' 

  // 1. Páginas estáticas principales
  const staticRoutes = [
    '',
    '/bio',
    '/contacto',
    '/buscador',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))

  // 2. Traer las crónicas/entradas dinámicas desde WordPress REST API
  let dynamicPosts = []
  try {
    // Pedimos las entradas públicas (per_page=100 trae las últimas 100)
    const res = await fetch(`${wpApiUrl}/posts?per_page=100&_fields=slug,modified`, {
      next: { revalidate: 3600 } // Revalida en caché cada hora
    })

    if (res.ok) {
      const posts = await res.json()
      dynamicPosts = posts.map((post) => ({
        url: `${baseUrl}/${post.slug}`,
        lastModified: new Date(post.modified).toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }))
    }
  } catch (error) {
    console.error('Error al generar entradas dinámicas para sitemap:', error)
  }

  // Unimos las rutas estáticas con las entradas dinámicas de WordPress
  return [...staticRoutes, ...dynamicPosts]
}