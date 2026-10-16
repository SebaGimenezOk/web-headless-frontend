// src/lib/soundcloud.js

export async function resolveTrack(url) {
  const client_id = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;
  const res = await fetch(`https://api.soundcloud.com/resolve?url=${url}&client_id=${client_id}`);
  const data = await res.json();
  return { streamUrl: url, title: data.title };
}

async function getTracksFromRSS(playlistUrl) {
  try {
    // Convertimos la URL de la playlist al endpoint RSS oficial de SoundCloud
    // Formato RSS: https://feeds.soundcloud.com/users/soundcloud:users:[USER_ID]/sounds.rss o mediante oEmbed extendido
    // Como alternativa directa y robusta, consultamos la API oEmbed para obtener el ID y armar el feed o parsear los ítems
    
    const res = await fetch(`https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(playlistUrl)}&maxheight=3000`, {
      next: { revalidate: 0 }
    });

    if (!res.ok) return [];
    const data = await res.json();
    const html = data.html || "";
    const playlistArtwork = data.thumbnail_url || "/encabezado-cronicas-mobile.jpg";

    // Extraemos los datos del widget con una expresión regular ampliada
    const matches = [...html.matchAll(/href="([^"]+)"[^>]*>([^<]+)<\/a>/g)];
    
    const tracksMap = new Map();

    let count = 0;
    for (const match of matches) {
      let link = match[1];
      const title = match[2].trim();

      if (link.includes("/sets/") || link === "https://soundcloud.com" || title.toLowerCase().includes("by") || title.toLowerCase().includes("soundcloud")) continue;

      if (!link.startsWith("http")) {
        link = `https://soundcloud.com${link}`;
      }

      // Evitamos duplicados que a veces trae el HTML
      if (!tracksMap.has(link)) {
        tracksMap.set(link, {
          id: `track-${count}-${Date.now()}`,
          title: title,
          permalink_url: link,
          streamUrl: link,
          artwork_url: playlistArtwork,
          date: new Date().toLocaleDateString("es-AR")
        });
        count++;
      }
    }

    return Array.from(tracksMap.values());
  } catch (error) {
    console.error(`Error en feed de playlist:`, error);
    return [];
  }
}

export async function getProgramasYEntrevistas() {
  const URL_PROGRAMAS = "https://soundcloud.com/bajoestasestrellas/sets/temporada-2026";
  const URL_ENTREVISTAS = "https://soundcloud.com/bajoestasestrellas/sets/entrevistas";

  const [programas, entrevistas] = await Promise.all([
    getTracksFromRSS(URL_PROGRAMAS),
    getTracksFromRSS(URL_ENTREVISTAS),
  ]);

  return { programas, entrevistas };
}