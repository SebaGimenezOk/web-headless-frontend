"use client";

import { useEffect, useState } from "react";

export default function TestPodcast() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/podcast`)
      .then(res => res.json())
      .then(data => setPodcasts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Podcasts desde WordPress</h1>
      <pre>{JSON.stringify(podcasts, null, 2)}</pre>
    </div>
  );
}
