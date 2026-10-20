import { NextResponse } from 'next/server';

export async function GET() {
  const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
  const CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET;
  const USER_ID = process.env.SOUNDCLOUD_USER_ID;

  try {
    // 1. Obtener Access Token del servidor de SoundCloud
    const tokenRes = await fetch('https://secure.soundcloud.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      next: { revalidate: 3600 }, // Caché de 1 hora
    });

    if (!tokenRes.ok) {
      throw new Error(`Error autenticando con SoundCloud: ${tokenRes.status}`);
    }

    const { access_token } = await tokenRes.json();

    // 2. Traer todos los tracks paginados usando el Access Token
    let allTracks = [];
    let nextUrl = `https://api.soundcloud.com/users/${USER_ID}/tracks?limit=200&linked_partitioning=1`;

    while (nextUrl) {
      const res = await fetch(nextUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error en la llamada a SoundCloud: ${res.status}`);
      }

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

    // 3. Ordenar del más reciente al más antiguo
    const sortedTracks = allTracks.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return NextResponse.json(sortedTracks);
  }  catch (error) {
    console.error('Fallo general en API SoundCloud:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}