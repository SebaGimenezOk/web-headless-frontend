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
      next: { revalidate: 60 }
    });

    if (!res.ok) return [];
    const html = await res.text();

    const tracks = [];
    const matches = [...html.matchAll(/<a itemprop="url" href="([^"]+)">([^<]+)<\/a>/g)];
    
    // Capturamos la imagen real de la playlist
    const imgMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
    const playlistArtwork = imgMatch ? imgMatch[1] : null;

    let count = 0;
    for (const match of matches) {
      if (count >= 4) break; 
      
      const link = match[1];
      const title = match[2].trim();
      if (link.includes("/sets/")) continue;

      const fullUrl = link.startsWith("http") ? link : `https://soundcloud.com${link}`;

      tracks.push({
        id: `track-${count}-${Date.now()}`,
        title: title,
        permalink_url: fullUrl,
        streamUrl: fullUrl, 
        artwork_url: playlistArtwork || "/encabezado-cronicas-mobile.jpg", 
        date: new Date().toLocaleDateString("es-AR")
      });
      count++;
    }
    return tracks;
  } catch (error) {
    console.error(`Error extrayendo tracks:`, error);
    return [];
  }
}

export async function getProgramasYEntrevistas() {
  const URL_PROGRAMAS = "https://soundcloud.com/bajoestasestrellas/sets/programas";
  const URL_ENTREVISTAS = "https://soundcloud.com/bajoestasestrellas/sets/entrevistas";

  const [programas, entrevistas] = await Promise.all([
    getTracksFromStaticPlaylist(URL_PROGRAMAS),
    getTracksFromStaticPlaylist(URL_ENTREVISTAS),
  ]);

  return { programas, entrevistas };
}