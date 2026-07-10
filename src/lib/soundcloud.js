// =========================================================================
// 1. TU FUNCIÓN ORIGINAL (Intacta y clave para conseguir los streams)
// =========================================================================
export async function resolveTrack(url) {
  const client_id = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;

  const res = await fetch(
    `https://api.soundcloud.com/resolve?url=${url}&client_id=${client_id}`
  );

  const data = await res.json();

  return {
    streamUrl: `${data.stream_url}?client_id=${client_id}`,
    title: data.title,
    id: data.id,
    artwork_url: data.artwork_url || null
  };
}

// =========================================================================
// 2. LOGICA MEJORADA: Rascar URLs y resolver sus Streams reales
// =========================================================================
async function getHydratedTracks(playlistUrl) {
  const client_id = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;
  
  try {
    const res = await fetch(playlistUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
      next: { revalidate: 60 }
    });

    if (!res.ok) return [];
    const html = await res.text();
    const matches = html.matchAll(/<a itemprop="url" href="([^"]+)">([^<]+)<\/a>/g);
    
    const urlsAResolver = [];
    let count = 0;

    for (const match of matches) {
      if (count >= 4) break;
      const link = match[1];
      if (link.includes("/sets/")) continue;

      const fullUrl = link.startsWith("http") ? link : `https://soundcloud.com${link}`;
      urlsAResolver.push(fullUrl);
      count++;
    }

    // 🔥 LA MAGIA: Convertimos cada URL web en data real de reproductor en paralelo
    const tracksHidratados = await Promise.all(
      urlsAResolver.map(async (url) => {
        try {
          const trackData = await resolveTrack(url);
          return {
            id: trackData.id,
            title: trackData.title,
            permalink_url: url,
            streamUrl: trackData.streamUrl,
            artwork_url: trackData.artwork_url,
            date: new Date().toLocaleDateString("es-AR")
          };
        } catch {
          return null; // Si uno falla, no rompemos toda la lista
        }
      })
    );

    // Filtramos si alguno devolvió null por error
    return tracksHidratados.filter(t => t !== null);

  } catch (error) {
    console.error(`Error hidratando tracks de ${playlistUrl}:`, error);
    return [];
  }
}

export async function getProgramasYEntrevistas() {
  const URL_PROGRAMAS = "https://soundcloud.com/bajoestasestrellas/sets/programas-completos";
  const URL_ENTREVISTAS = "https://soundcloud.com/bajoestasestrellas/sets/entrevistas";

  const [programas, entrevistas] = await Promise.all([
    getHydratedTracks(URL_PROGRAMAS),
    getHydratedTracks(URL_ENTREVISTAS),
  ]);

  console.log("--- AUDIO REPRODUCTOR CONFIGURADO ---");
  console.log("Programas listos para sonar:", programas.length);
  console.log("Entrevistas listas para sonar:", entrevistas.length);

  return { programas, entrevistas };
}