// src/lib/soundcloud.js

async function fetchPlaylistViaHydration(playlistUrl) {
  try {
    const res = await fetch(playlistUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9"
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) return [];

    const html = await res.text();
    const hydrationMatch = html.match(/window\.__sc_hydration\s*=\s*(\[.+?\]);\s*<\/script>/s);
    
    if (!hydrationMatch) return [];

    const hydrationData = JSON.parse(hydrationMatch[1]);
    
    // Mapa global de sonidos indexados por su ID
    const soundsById = new Map();
    let playlistTrackReferences = [];
    let playlistArtwork = null;

    for (const item of hydrationData) {
      // Coleccionamos todos los sonidos completos presentes en el payload 
      if (item.hydratable === "sound" && item.data && item.data.id) {
        soundsById.set(String(item.data.id), item.data);
      }

      // Buscamos la playlist solicitada
      if (item.hydratable === "playlist" && item.data) {
        if (item.data.artwork_url) {
          playlistArtwork = item.data.artwork_url;
        }
        if (Array.isArray(item.data.tracks)) {
          playlistTrackReferences = item.data.tracks;
        }
      }
    }

    // Mapeamos los tracks de la playlist usando el mapa de sonidos completos
    const tracks = playlistTrackReferences.map((trackRef, index) => {
      let track = typeof trackRef === "object" ? trackRef : null;
      const trackId = track ? String(track.id) : String(trackRef);

      // Si el track venía solo como ID numérico, lo buscamos en el mapa global
      if ((!track || !track.title) && soundsById.has(trackId)) {
        track = soundsById.get(trackId);
      }

      if (!track || (!track.title && !track.permalink)) return null;

      const title = track.title || track.permalink || `Pista ${index + 1}`;
      const permalink = track.permalink_url || playlistUrl;
      const artwork = track.artwork_url 
        ? track.artwork_url.replace('-large', '-t500x500') 
        : (playlistArtwork ? playlistArtwork.replace('-large', '-t500x500') : "/encabezado-cronicas-mobile.jpg");

      return {
        id: trackId,
        title: title.trim(),
        permalink_url: permalink,
        streamUrl: permalink,
        artwork_url: artwork,
        date: track.created_at ? new Date(track.created_at).toLocaleDateString("es-AR") : new Date().toLocaleDateString("es-AR")
      };
    }).filter(Boolean);

    return tracks;
  } catch (error) {
    console.error("Error parseando hidratación de SoundCloud:", error);
    return [];
  }
}

export async function getProgramasYEntrevistas() {
  const URL_PROGRAMAS = "https://soundcloud.com/bajoestasestrellas/sets/temporada-2026";
  const URL_ENTREVISTAS = "https://soundcloud.com/bajoestasestrellas/sets/entrevistas";

  const [programas, entrevistas] = await Promise.all([
    fetchPlaylistViaHydration(URL_PROGRAMAS),
    fetchPlaylistViaHydration(URL_ENTREVISTAS),
  ]);

  return { programas, entrevistas };
}