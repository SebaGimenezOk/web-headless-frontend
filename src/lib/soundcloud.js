// src/lib/soundcloud.js

async function getTracksFromApiPlaylist(playlistUrl) {
  const client_id = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;
  if (!client_id) {
    console.error("Falta configurar NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID en las variables de entorno.");
    return [];
  }

  try {
    const resolveUrl = `https://api-v2.soundcloud.com/resolve?url=${encodeURIComponent(playlistUrl)}&client_id=${client_id}`;
    const res = await fetch(resolveUrl, { next: { revalidate: 0 } });
    
    if (!res.ok) {
      console.error(`Error al resolver playlist de SoundCloud: ${res.status} - ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    const rawTracks = data.tracks || [];

    return rawTracks.map((track, index) => ({
      id: track.id ? String(track.id) : `track-${index}-${Date.now()}`,
      title: track.title || "Sin título",
      permalink_url: track.permalink_url,
      streamUrl: track.permalink_url,
      artwork_url: track.artwork_url 
        ? track.artwork_url.replace('-large', '-t500x500') 
        : (data.artwork_url ? data.artwork_url.replace('-large', '-t500x500') : "/encabezado-cronicas-mobile.jpg"),
      date: track.created_at ? new Date(track.created_at).toLocaleDateString("es-AR") : new Date().toLocaleDateString("es-AR")
    }));
  } catch (error) {
    console.error("Error consultando la API de SoundCloud:", error);
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