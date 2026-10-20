import { NextResponse } from 'next/server';

export async function GET() {
  const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
  const CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET;
  const PROFILE_URL = process.env.SOUNDCLOUD_PROFILE_URL;

  try {
    const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    // 1. Obtener Token
    const tokenRes = await fetch('https://secure.soundcloud.com/oauth/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) throw new Error('Error de autenticación OAuth');
    const { access_token } = tokenData;

    // 2. Resolver la URL del perfil para obtener el User ID automáticamente
    const resolveRes = await fetch(`https://api.soundcloud.com/resolve?url=${encodeURIComponent(PROFILE_URL)}`, {
      headers: { Authorization: `OAuth ${access_token}` },
    });

    const userData = await resolveRes.json();
    if (!resolveRes.ok || !userData.id) {
      throw new Error('No se pudo resolver el perfil de SoundCloud. Verifique la URL.');
    }

    const userId = userData.id;

    // 3. Traer todos los tracks usando el ID obtenido
    let allTracks = [];
    let nextUrl = `https://api.soundcloud.com/users/${userId}/tracks?limit=200&linked_partitioning=1`;

    while (nextUrl) {
      const res = await fetch(nextUrl, {
        headers: { Authorization: `OAuth ${access_token}` },
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

    const sortedTracks = allTracks.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return NextResponse.json(sortedTracks);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}