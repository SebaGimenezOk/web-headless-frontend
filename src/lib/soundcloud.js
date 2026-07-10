// =========================================================================
// 1. TU FUNCIÓN ORIGINAL (La dejamos por compatibilidad)
// =========================================================================
export async function resolveTrack(url) {
  const client_id = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;
  const res = await fetch(
    `https://api.soundcloud.com/resolve?url=${url}&client_id=${client_id}`
  );
  const data = await res.json();
  return {
    streamUrl: url, // Cambiado: le pasamos la url pública que le gusta a tu iframe
    title: data.title,
  };
}

// =========================================================================
// 2. PARSEO ADAPTADO A TU REPRODUCTOR (Iframe-Friendly)
// =========================================================================
async function getTracksFromStaticPlaylist(playlistUrl) {
  try {
    const res = await fetch(playlistUrl, {
      headers: { 
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" 
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) return [];
    const html = await res.text();

    const tracks = [];
    
    // Rascamos las urls públicas directas de los tracks dentro de la playlist
    const matches = [...html.matchAll(/<a itemprop="url" href="([^"]+)">([^<]+)<\/a>/g)];
    
    let count = 0;
    for (const match of matches) {
      if (count >= 4) break; // Límite de 4 items por sección
      
      const link = match[1];
      const title = match[2].trim();

      // Saltamos si el link es el de la playlist misma
      if (link.includes("/sets/")) continue;

      const fullUrl = link.startsWith("http") ? link : `https://soundcloud.com${link}`;

      tracks.push({
        id: `track-${count}-${Date.now()}`, // ID temporal para iterar en React
        title: title,
        permalink_url: fullUrl,
        // 🔥 ESTA ES LA CLAVE: Tu context tiene que guardar la URL pública normal,
        // porque es la que tu componente Player inyecta en el iframe de SoundCloud
        streamUrl: fullUrl, 
        artwork_url: null, 
        date: new Date().toLocaleDateString("es-AR")
      });
      
      count++;
    }

    return tracks;

  } catch (error) {
    console.error(`Error extrayendo tracks para el Widget:`, error);
    return [];
  }
}

export async function getProgramasYEntrevistas() {
  const URL_PROGRAMAS = "https://soundcloud.com/bajoestasestrellas/sets/programas-completos";
  const URL_ENTREVISTAS = "https://soundcloud.com/bajoestasestrellas/sets/entrevistas";

  const [programas, entrevistas] = await Promise.all([
    getTracksFromStaticPlaylist(URL_PROGRAMAS),
    getTracksFromStaticPlaylist(URL_ENTREVISTAS),
  ]);

  console.log("--- CONFIGURACIÓN PARA IFRAME LISTA ---");
  return { programas, entrevistas };
}