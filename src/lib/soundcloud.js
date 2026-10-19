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

    if (!res.ok) {
      console.error(`Error HTTP al obtener SoundCloud: ${res.status}`);
      return [];
    }

    const html = await res.text();

    // SoundCloud almacena los datos de la página en un script con __sc_hydration
    const hydrationMatch = html.match(/window\.__sc_hydration\s*=\s*(\[.+?\]);\s*<\/script>/s);
    
    if (!hydrationMatch) {
      console.error("No se encontró el bloque de hidratación de SoundCloud");
      return [];
    }

    const hydrationData = JSON.parse(hydrationMatch[1]);
    
    // Buscamos el objeto que contenga la playlist o los tracks dentro de la hidratación
    let rawTracks = [];
    
    for (const item of hydrationData) {
      if (item.hydratable === "playlist" && item.data?.tracks) {
        rawTracks = item.data.tracks;
        break;
      }
    }

    // Si no vino directo en la playlist, buscamos chunks de sonidos
    if (rawTracks.length === 0) {
      for (const item of hydrationData) {
        if (item.hydratable === "sound" && item.data) {
          rawTracks.push(item.data);
        }
      }
    }

    return rawTracks.map((track, index) => ({
      id: track.id ? String(track.id) : `track-${index}-${Date.now()}`,
      title: track.title || "Sin título",
      permalink_url: track.permalink_url,
      streamUrl: track.permalink_url,
      artwork_url: track.artwork_url 
        ? track.artwork_url.replace('-large', '-t500x500') 
        : "/encabezado-cronicas-mobile.jpg",
      date: track.created_at ? new Date(track.created_at).toLocaleDateString("es-AR") : new Date().toLocaleDateString("es-AR")
    }));
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