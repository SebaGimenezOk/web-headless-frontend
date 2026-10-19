// src/lib/soundcloud.js

// Función auxiliar para obtener los tracks de una playlist mediante la API v2 de SoundCloud
async function getTracksFromApiPlaylist(playlistUrl) {
  const client_id = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID || "4UBpi35NOKe8gSOYeOphEMWyeIjKPXyN";
  
  try {
    // 1. Primero resolvemos la URL de la playlist para obtener su ID numérico y datos de la API
    const resolveRes = await fetch(
      `https://api-v2.soundcloud.com/resolve?url=${encodeURIComponent(playlistUrl)}&client_id=${client_id}`,
      { next: { revalidate: 0 } }
    );

    if (!resolveRes.ok) {
      throw new Error(`No se pudo resolver la playlist: ${resolveRes.status}`);
    }

    const playlistData = await resolveRes.json();
    
    // Si la API nos devuelve los tracks directamente embebidos o necesitamos consultar la playlist completa
    const tracksList = playlistData.tracks || [];

    // Mapeamos los tracks al formato que ya utiliza tu aplicación
    return tracksList.map((track, index) => ({
      id: track.id || `track-${index}-${Date.now()}`,
      title: track.title || "Sin título",
      permalink_url: track.permalink_url,
      streamUrl: track.permalink_url, // Mantenemos la URL para tu reproductor
      artwork_url: track.artwork_url 
        ? track.artwork_url.replace('-large', '-t500x500') 
        : (playlistData.artwork_url ? playlistData.artwork_url.replace('-large', '-t500x500') : "/encabezado-cronicas-mobile.jpg"),
      date: track.created_at ? new Date(track.created_at).toLocaleDateString("es-AR") : new Date().toLocaleDateString("es-AR")
    }));

  } catch (error) {
    console.error(`Error consultando la API de SoundCloud para ${playlistUrl}:`, error);
    return [];
  }
}

export async function getProgramasYEntrevistas() {
  const URL_PROGRAMAS = "https://soundcloud.com/bajoestasestrellas/sets/temporada-2026";
  const URL_ENTREVISTAS = "https://soundcloud.com/bajoestasestrellas/sets/entrevistas";

  const [programas, entrevistas] = await Promise.all([
    getTracksFromApiPlaylist(URL_PROGRAMAS),
    getTracksFromApiPlaylist(URL_ENTREVISTAS),
  ]);

  return { programas, entrevistas };
}