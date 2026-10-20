import { NextResponse } from 'next/server';

export async function GET() {
  const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID || '4UBpi35NOKe8gSOYeOphEMWyeIjKPXyN';
  const CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET || 'npd7QQFbdpMav9c2mUAdqjA00lMoz7Nk';
  const PROFILE_URL = 'https://soundcloud.com/bajoestasestrellas';

  try {
    // 1. Obtener Token mediante Basic Auth
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    const tokenRes = await fetch('https://secure.soundcloud.com/oauth/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      console.error('Error token SoundCloud:', tokenData);
      return NextResponse.json(
        { error: `Error autenticando: ${tokenData.error_description || JSON.stringify(tokenData)}` },
        { status: tokenRes.status }
      );
    }

    const { access_token } = tokenData;

    // 2. Obtener la información del perfil para sacar el ID interno
    const resolveRes = await fetch(`https://api.soundcloud.com/resolve?url=${encodeURIComponent(PROFILE_URL)}`, {
      headers: {
        Authorization: `OAuth ${access_token}`,
      },
    });

    const userData = await resolveRes.json();

    if (!resolveRes.ok || !userData.id) {
      return NextResponse.json(
        { error: `No se encontró el perfil de SoundCloud: ${JSON.stringify(userData)}` },
        { status: 400 }
      );
    }

    const userId = userData.id;

    // 3. Traer todos los audios paginados
    let allTracks = [];
    let nextUrl = `https://api.soundcloud.com/users/${userId}/tracks?limit=200&linked_partitioning=1`;

    while (nextUrl) {
      const res = await fetch(nextUrl, {
        headers: {
          Authorization: `OAuth ${access_token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) break;

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

    // 4. Ordenar cronológicamente (más recientes primero)
    const sortedTracks = allTracks.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return NextResponse.json(sortedTracks);
  } catch (error) {
    console.error('Error general SoundCloud API:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}