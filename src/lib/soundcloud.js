// src/lib/soundcloud.js

async function getPlaylistData(playlistUrl) {
  try {
    // Consultamos el endpoint oembed oficial de SoundCloud para obtener el ID de la playlist
    const oembedUrl = `https://soundcloud.com/oembed?url=${encodeURIComponent(playlistUrl)}&format=json`;
    const res = await fetch(oembedUrl, { next: { revalidate: 60 } });

    if (!res.ok) {
      console.error(`Error OEmbed: ${res.status}`);
      return [];
    }

    const oembedData = await res.json();
    
    // Extraemos el ID numérico del iframe que devuelve SoundCloud
    const iframeHtml = oembedData.html || "";
    const playlistIdMatch = iframeHtml.match(/playlists%2F(\d+)/) || iframeHtml.match(/playlists\/(\d+)/);

    if (!playlistIdMatch) {
      console.error("No se pudo extraer el ID de la playlist");
      return [];
    }

    const playlistId = playlistIdMatch[1];
    const client_id = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;

    // Consultamos la API pública del widget para la playlist
    const widgetApiUrl = `https://api-widget.soundcloud.com/playlists/${playlistId}?representation=full&client_id=${client_id}`;
    const playlistRes = await fetch(widgetApiUrl, { next: { revalidate: 60 } });

    if (!playlistRes.ok) {
      console.error(`Error Widget API: ${playlistRes.status}`);
      return [];
    }

    const playlistData = await playlistRes.json();
    const rawTracks = playlistData.tracks || [];

    return rawTracks.map((track, index) => ({
      id: track.id ? String(track.id) : `track-${index}`,
      title: track.title || "Sin título",
      permalink_url: track.permalink_url,
      streamUrl: track.permalink_url,
      artwork_url: track.artwork_url 
        ? track.artwork_url.replace('-large', '-t500x500') 
        : (oembedData.thumbnail_url || "/encabezado-cronicas-mobile.jpg"),
      date: track.created_at ? new Date(track.created_at).toLocaleDateString("es-AR") : new Date().toLocaleDateString("es-AR")
    }));
  } catch (error) {
    console.error("Error obteniendo playlist de SoundCloud:", error);
    return [];
  }
}

export async function getProgramasYEntrevistas() {
  const URL_PROGRAMAS = "https://soundcloud.com/bajoestasestrellas/sets/temporada-2026";
  const URL_ENTREVISTAS = "https://soundcloud.com/bajoestasestrellas/sets/entrevistas";

  const [programas, entrevistas] = await Promise.all([
    getPlaylistData(URL_PROGRAMAS),
    getPlaylistData(URL_ENTREVISTAS),
  ]);

  return { programas, entrevistas };
}