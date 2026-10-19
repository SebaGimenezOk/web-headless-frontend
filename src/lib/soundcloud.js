// src/lib/soundcloud.js

async function fetchSoundCloudPlaylist(playlistUrl) {
  const client_id = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;

  // 1. Intento primario: API oficial v2 /resolve mediante Client_ID
  if (client_id) {
    try {
      const resolveUrl = `https://api-v2.soundcloud.com/resolve?url=${encodeURIComponent(playlistUrl)}&client_id=${client_id}`;
      const res = await fetch(resolveUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        next: { revalidate: 60 }
      });

      if (res.ok) {
        const data = await res.json();
        const rawTracks = data.tracks || [];

        if (rawTracks.length > 0) {
          return rawTracks.map((track, index) => ({
            id: track.id ? String(track.id) : `track-${index}`,
            title: track.title || "Sin título",
            permalink_url: track.permalink_url,
            streamUrl: track.permalink_url,
            artwork_url: track.artwork_url 
              ? track.artwork_url.replace('-large', '-t500x500') 
              : (data.artwork_url ? data.artwork_url.replace('-large', '-t500x500') : "/encabezado-cronicas-mobile.jpg"),
            date: track.created_at ? new Date(track.created_at).toLocaleDateString("es-AR") : new Date().toLocaleDateString("es-AR")
          }));
        }
      }
    } catch (err) {
      console.warn("API v2 no disponible, intentando vía OEmbed...", err);
    }
  }

  // 2. Fallback: Resolución vía OEmbed + Widget API (para entornos de producción/preview)
  try {
    const oembedUrl = `https://soundcloud.com/oembed?url=${encodeURIComponent(playlistUrl)}&format=json`;
    const resOembed = await fetch(oembedUrl, { next: { revalidate: 60 } });

    if (!resOembed.ok) return [];

    const oembedData = await resOembed.json();
    const iframeHtml = oembedData.html || "";
    const playlistIdMatch = iframeHtml.match(/playlists%2F(\d+)/) || iframeHtml.match(/playlists\/(\d+)/);

    if (!playlistIdMatch) return [];

    const playlistId = playlistIdMatch[1];
    const widgetUrl = `https://api-widget.soundcloud.com/playlists/${playlistId}?representation=full${client_id ? `&client_id=${client_id}` : ''}`;

    const resWidget = await fetch(widgetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://soundcloud.com/"
      },
      next: { revalidate: 60 }
    });

    if (!resWidget.ok) return [];

    const widgetData = await resWidget.json();
    const tracks = widgetData.tracks || [];

    return tracks.map((track, index) => ({
      id: track.id ? String(track.id) : `track-widget-${index}`,
      title: track.title || "Sin título",
      permalink_url: track.permalink_url,
      streamUrl: track.permalink_url,
      artwork_url: track.artwork_url 
        ? track.artwork_url.replace('-large', '-t500x500') 
        : (oembedData.thumbnail_url || "/encabezado-cronicas-mobile.jpg"),
      date: track.created_at ? new Date(track.created_at).toLocaleDateString("es-AR") : new Date().toLocaleDateString("es-AR")
    }));
  } catch (error) {
    console.error("Error al obtener playlist de SoundCloud:", error);
    return [];
  }
}

export async function getProgramasYEntrevistas() {
  const URL_PROGRAMAS = "https://soundcloud.com/bajoestasestrellas/sets/temporada-2026";
  const URL_ENTREVISTAS = "https://soundcloud.com/bajoestasestrellas/sets/entrevistas";

  const [programas, entrevistas] = await Promise.all([
    fetchSoundCloudPlaylist(URL_PROGRAMAS),
    fetchSoundCloudPlaylist(URL_ENTREVISTAS),
  ]);

  return { programas, entrevistas };
}