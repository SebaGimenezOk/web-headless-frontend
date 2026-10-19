// src/lib/soundcloud.js
export async function resolveTrack(url) {
  const client_id = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;
  const res = await fetch(`https://api.soundcloud.com/resolve?url=${url}&client_id=${client_id}`);
  const data = await res.json();
  return { streamUrl: url, title: data.title };
}

async function getTracksFromStaticPlaylist(playlistUrl) {
  try {
    const res = await fetch(playlistUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
      next: { revalidate: 0 }
    });

    if (!res.ok) return [];
    const html = await res.text();

    const tracks = [];
    
    // Regex optimizada para buscar los links de los audios específicos dentro de la playlist
    const matches = [...html.matchAll(/<a[^>]+itemprop="url"[^>]+href="(\/bajoestasestrellas\/[^"]+)"[^>]*>([^<]+)<\/a>/g)];
    
    const imgMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
    const playlistArtwork = imgMatch ? imgMatch[1] : null;

    const seenUrls = new Set();

    for (const match of matches) {
      const link = match[1];
      const title = match[2].trim();

      // Evitamos duplicados y el enlace al propio set
      if (link.includes("/sets/") || seenUrls.has(link)) continue;
      seenUrls.add(link);

      const fullUrl = `https://soundcloud.com${link}`;

      tracks.push({
        id: `track-${tracks.length}-${Date.now()}`,
        title: title,
        permalink_url: fullUrl,
        streamUrl: fullUrl, 
        artwork_url: playlistArtwork || "/encabezado-cronicas-mobile.jpg", 
        date: new Date().toLocaleDateString("es-AR")
      });
    }
    return tracks;
  } catch (error) {
    console.error(`Error extrayendo tracks:`, error);
    return [];
  }
}

export async function getProgramasYEntrevistas() {
  const URL_PROGRAMAS = "https://soundcloud.com/bajoestasestrellas/sets/temporada-2026";
  const URL_ENTREVISTAS = "https://soundcloud.com/bajoestasestrellas/sets/entrevistas";

  const [programas, entrevistas] = await Promise.all([
    getTracksFromStaticPlaylist(URL_PROGRAMAS),
    getTracksFromStaticPlaylist(URL_ENTREVISTAS),
  ]);

  return { programas, entrevistas };
}