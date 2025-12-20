"use client";

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Posts desde WordPress</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
