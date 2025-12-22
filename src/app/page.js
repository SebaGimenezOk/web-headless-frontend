"use client";

import { useEffect, useState } from "react";
import PodcastList from "../components/PodcastList";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts");

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error al obtener posts:", err);
        setError("Error al obtener posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Cargando podcasts...</div>;
  if (error) return <div>{error}</div>;
  if (posts.length === 0) return <div>No hay podcasts disponibles</div>;

  return <PodcastList posts={posts} />;
}
