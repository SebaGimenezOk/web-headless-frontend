// src/lib/soundcloud.js

async function getSoundCloudToken() {
  const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID || '4UBpi35NOKe8gSOYeOphEMWyeIjKPXyN';
  const CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET || 'npd7QQFbdpMav9c2mUAdqjA00lMoz7Nk';

  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const res = await fetch('https://secure.soundcloud.com/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
    next: { revalidate: 3600 }, // El token dura 1 hora
  });

  if (!res.ok) {
    throw new Error('Error al obtener el token de SoundCloud');
  }

  const data = await res.json();
  return data.access_token;
}

export async function getProgramasYEntrevistas() {
  try {
    const token = await getSoundCloudToken();
    const PROFILE_URL = 'https://soundcloud.com/bajoestasestrellas';

    // 1. Obtener ID del perfil
    const resolveRes = await fetch(
      `https://api.soundcloud.com/resolve?url=${encodeURIComponent(PROFILE_URL)}`,
      {
        headers: { Authorization: `OAuth ${token}` },
        next: { revalidate: 60 },
      }
    );

    if (!resolveRes.ok) {
      return { programas: [], entrevistas: [] };
    }

    const userData = await resolveRes.json();
    const userId = userData.id;

    // 2. Traer todos los tracks mediante la API oficial
    let allTracks = [];
    let nextUrl = `https://api.soundcloud.com/users/${userId}/tracks?limit=200&linked_partitioning=1`;

    while (nextUrl) {
      const res = await fetch(nextUrl, {
        headers: { Authorization: `OAuth ${token}` },
        next: { revalidate: 60 },
      });

      if (!res.ok) break;
      const data = await res.json();

      if (data.collection) {
        allTracks = [...allTracks, ...data.collection];
        nextUrl = data.next_href || null;
      } else if (Array.isArray(data)) {
        allTracks = [...allTracks, ...data];
        nextUrl = null;
      } else {
        nextUrl = null;
      }
    }

    // Formatear cada pista para coincidir con lo que esperan tus componentes (TrackRowClient)
    const formatted = allTracks.map((track, index) => ({
      id: String(track.id),
      title: track.title || `Pista ${index + 1}`,
      permalink_url: track.permalink_url,
      streamUrl: track.permalink_url,
      artwork_url: track.artwork_url 
        ? track.artwork_url.replace('-large', '-t500x500') 
        : '/bg-MiguelAngel.webp',
      created_at: track.created_at,
      date: track.created_at 
        ? new Date(track.created_at).toLocaleDateString('es-AR') 
        : new Date().toLocaleDateString('es-AR'),
    }));

    // Separar o distribuir entrevistas y programas
    const entrevistas = formatted.filter(t => 
      t.title.toLowerCase().includes('entrevista') || t.title.toLowerCase().includes('nota')
    );
    const programas = formatted.filter(t => 
      !t.title.toLowerCase().includes('entrevista') && !t.title.toLowerCase().includes('nota')
    );

    // Si la separación por título no aplica, asignamos fallback
    return {
      programas: programas.length > 0 ? programas : formatted,
      entrevistas: entrevistas.length > 0 ? entrevistas : formatted,
    };
  } catch (error) {
    console.error('Error en getProgramasYEntrevistas:', error);
    return { programas: [], entrevistas: [] };
  }
}