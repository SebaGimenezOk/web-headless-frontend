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
    let rawTracks = [];
    let playlistArtwork = null;

    // Buscamos específicamente el objeto 'playlist' dentro de la hidratación que coincida con la URL o contenga los tracks reales
    for (const item of hydrationData) {
      if (item.hydratable === "playlist" && item.data) {
        // Verificamos si esta playlist es la que corresponde a la URL solicitada o tiene los tracks
        const permalink = item.data.permalink_url || "";
        if (playlistUrl.includes(permalink) || (item.data.tracks && item.data.tracks.length > 0)) {
          if (item.data.artwork_url) {
            playlistArtwork = item.data.artwork_url;
          }
          if (item.data.tracks && Array.isArray(item.data.tracks)) {
            // Si los tracks vienen completos como objetos detallados
            rawTracks = item.data.tracks;
            break;
          }
        }
      }
    }

    // Fallback: si el objeto playlist vino con referencias numéricas de IDs en lugar de objetos de tracks completos
    if (rawTracks.length === 0) {
      for (const item of hydrationData) {
        if (item.hydratable === "playlist" && item.data?.tracks) {
          rawTracks = item.data.tracks;
          break;
        }
      }
    }

    // Mapeo estricto evitando elementos vacíos o genéricos cruzados
    return rawTracks
      .map((track, index) => {
        // Si track es solo un ID numérico (referencia), lo ignoramos para evitar desajustes
        if (typeof track === "number") return null;

        const title = track.title || track.permalink;
        if (!title) return null;

        const permalink = track.permalink_url || playlistUrl;
        const artwork = track.artwork_url 
          ? track.artwork_url.replace('-large', '-t500x500') 
          : (playlistArtwork ? playlistArtwork.replace('-large', '-t500x500') : "/encabezado-cronicas-mobile.jpg");

        return {
          id: track.id ? String(track.id) : `track-${index}-${Date.now()}`,
          title: title.trim(),
          permalink_url: permalink,
          streamUrl: permalink,
          artwork_url: artwork,
          date: track.created_at ? new Date(track.created_at).toLocaleDateString("es-AR") : new Date().toLocaleDateString("es-AR")
        };
      })
      .filter(Boolean); // Limpiamos nulos
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