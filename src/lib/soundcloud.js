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
      headers: { 
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" 
      },
      next: { revalidate: 0 }
    });

    if (!res.ok) return [];
    const html = await res.text();

    const tracks = [];
    const seenUrls = new Set();

    // 1. Intentamos extraer la estructura JSON-LD embebida que contiene el dataset completo del Set
    const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    
    for (const match of jsonLdMatches) {
      try {
        const jsonData = JSON.parse(match[1]);
        // Si el objeto es un MusicPlaylist o contiene tracklist
        const itemList = jsonData.track || jsonData.itemListElement || [];
        if (Array.isArray(itemList) && itemList.length > 0) {
          itemList.forEach((item, idx) => {
            const trackObj = item.item || item;
            const url = trackObj.url || trackObj['@id'];
            const title = trackObj.name || trackObj.title;

            if (url && !seenUrls.has(url)) {
              seenUrls.add(url);
              const fullUrl = url.startsWith("http") ? url : `https://soundcloud.com${url}`;
              tracks.push({
                id: `track-json-${idx}-${Date.now()}`,
                title: title || "Sin título",
                permalink_url: fullUrl,
                streamUrl: fullUrl,
                artwork_url: jsonData.image || "/encabezado-cronicas-mobile.jpg",
                date: new Date().toLocaleDateString("es-AR")
              });
            }
          });
        }
      } catch (e) {
        // Ignoramos bloques JSON que no sean compatibles
      }
    }

    // 2. Fallback por regex si el JSON-LD no devolvió elementos
    if (tracks.length === 0) {
      const matches = [...html.matchAll(/<a[^>]+itemprop="url"[^>]+href="(\/bajoestasestrellas\/[^"]+)"[^>]*>([^<]+)<\/a>/g)];
      const imgMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
      const playlistArtwork = imgMatch ? imgMatch[1] : null;

      for (const match of matches) {
        const link = match[1];
        const title = match[2].trim();

        if (link.includes("/sets/") || seenUrls.has(link)) continue;
        seenUrls.add(link);

        const fullUrl = `https://soundcloud.com${link}`;

        tracks.push({
          id: `track-regex-${tracks.length}-${Date.now()}`,
          title: title,
          permalink_url: fullUrl,
          streamUrl: fullUrl,
          artwork_url: playlistArtwork || "/encabezado-cronicas-mobile.jpg",
          date: new Date().toLocaleDateString("es-AR")
        });
      }
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