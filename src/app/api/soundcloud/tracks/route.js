import { NextResponse } from 'next/server';

export async function GET() {
  const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID || '4UBpi35NOKe8gSOYeOphEMWyeIjKPXyN';
  const CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET || 'npd7QQFbdpMav9c2mUAdqjA00lMoz7Nk';
  const USER_ID = process.env.SOUNDCLOUD_USER_ID;

  try {
    const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

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
      return NextResponse.json({ error: `Error autenticando: ${JSON.stringify(tokenData)}` }, { status: 401 });
    }

    const { access_token } = tokenData;

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
        break;
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

    const sortedTracks = allTracks.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return NextResponse.json(sortedTracks);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}