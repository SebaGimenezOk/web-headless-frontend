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

    // Buscamos la playlist y sus tracks
    for (const item of hydrationData) {
      if (item.hydratable === "playlist" && item.data) {
        if (item.data.artwork_url) {
          playlistArtwork = item.data.artwork_url;
        }
        if (item.data.tracks) {
          rawTracks = item.data.tracks;
          break;
        }
      }
    }

    // Si no vino directo en la playlist, recolectamos los sonidos sueltos
    if (rawTracks.length === 0) {
      for (const item of hydrationData) {
        if (item.hydratable === "sound" && item.data) {
          rawTracks.push(item.data);
        }
      }
    }

    // Mapeo robusto con fallbacks para títulos y carátulas vacías
    return rawTracks
      .map((track, index) => {
        const title = track.title || track.permalink || track.description || `Episodio ${index + 1}`;
        const permalink = track.permalink_url || playlistUrl;
        
        // Resolvemos la imagen con múltiples alternativas
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
      .filter((track) => track.title && track.title !== "Sin título"); // Filtramos entradas vacías si las hubiera
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