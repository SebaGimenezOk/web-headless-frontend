// 1. Tu función original intacta (Cero riesgos, sigue funcionando igual para el Player)
export async function resolveTrack(url) {
  const client_id = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;

  const res = await fetch(
    `https://api.soundcloud.com/resolve?url=${url}&client_id=${client_id}`
  );

  const data = await res.json();

  return {
    streamUrl: `${data.stream_url}?client_id=${client_id}`,
    title: data.title,
  };
}

// 2. NUEVA FUNCIÓN: Para el módulo antes del footer (No interfiere con lo anterior)
export async function getProgramasYEntrevistas() {
  const client_id = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;
  
  // 🔥 Reemplazá 'tu-usuario-soundcloud' por el slug real de tu perfil de SoundCloud
  const USER_SLUG = "tu-usuario-soundcloud"; 

  try {
    // Primero resolvemos tu usuario para obtener tu ID numérico de SoundCloud de forma dinámica
    const userRes = await fetch(
      `https://api.soundcloud.com/resolve?url=https://soundcloud.com/${USER_SLUG}&client_id=${client_id}`
    );
    if (!userRes.ok) return { programas: [], entrevistas: [] };
    const userData = await userRes.json();
    const userId = userData.id;

    // Traemos los últimos 20 tracks subidos a tu cuenta
    const tracksRes = await fetch(
      `https://api.soundcloud.com/users/${userId}/tracks?client_id=${client_id}&limit=20`,
      { next: { revalidate: 300 } } // Cache por 5 minutos para cuidar la velocidad de carga
    );

    if (!tracksRes.ok) return { programas: [], entrevistas: [] };
    const tracks = await tracksRes.json();

    // Mapeamos los datos que necesitamos
    const tracksMapeados = tracks.map((track) => ({
      id: track.id,
      title: track.title,
      permalink_url: track.permalink_url,
      streamUrl: `${track.stream_url}?client_id=${client_id}`,
      artwork_url: track.artwork_url || userData.avatar_url, // Si el track no tiene foto, usa la de tu perfil
      date: track.created_at ? new Date(track.created_at).toLocaleDateString("es-AR") : "",
    }));

    // Separamos en base a lo que contenga el título del audio (Case-insensitive)
    const programas = tracksMapeados.filter((t) => 
      t.title.toLowerCase().includes("programa completo") || t.title.toLowerCase().includes("programa")
    ).slice(0, 4); // Nos quedamos con los últimos 4

    const entrevistas = tracksMapeados.filter((t) => 
      t.title.toLowerCase().includes("entrevista")
    ).slice(0, 4); // Nos quedamos con los últimos 4

    return { programas, entrevistas };

  } catch (error) {
    console.error("Error obteniendo audios de SoundCloud:", error);
    return { programas: [], entrevistas: [] };
  }
}