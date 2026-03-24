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