import { NextResponse } from 'next/server';

export async function GET() {
  const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID || '4UBpi35NOKe8gSOYeOphEMWyeIjKPXyN';
  const CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET || 'npd7QQFbdpMav9c2mUAdqjA00lMoz7Nk';
  const USER_ID = process.env.SOUNDCLOUD_USER_ID;

  try {
    // Codificar client_id:client_secret en Base64 para el Basic Auth
    const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    // 1. Obtener Access Token mediante Basic Auth Header
    const tokenRes = await fetch('https://secure.soundcloud.com/oauth/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      console.error('Error token SoundCloud:', tokenData);
      throw new Error(`Error autenticando: ${tokenRes.status} - ${JSON.stringify(tokenData)}`);
    }

    const { access_token } = tokenData;

    // 2. Traer todos los tracks paginados
    let allTracks = [];
    let nextUrl = `https://api.soundcloud.com/users/${USER_ID}/tracks?limit=200&linked_partitioning=1`;

    while (nextUrl) {
      const res = await fetch(nextUrl, {
        headers: {
          Authorization: `OAuth ${access_token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Error tracks SoundCloud:', data);
        throw new Error(`Error en tracks: ${res.status} - ${JSON.stringify(data)}`);
      }

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
  } catch (error) {
    console.error('Fallo general API SoundCloud:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}