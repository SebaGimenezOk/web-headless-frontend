"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      setLoading(false);
      setHasSearched(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        // Leemos directamente tu variable NEXT_PUBLIC_API_URL ("https://api.cronicasdeunespectador.com/wp-json")
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.cronicasdeunespectador.com/wp-json";
        
        // Construimos la URL agregando solo /wp/v2/posts
        const endpoint = `${baseUrl}/wp/v2/posts?search=${encodeURIComponent(trimmedQuery)}&_embed&per_page=10`;

        const res = await fetch(endpoint);

        if (!res.ok) throw new Error("Error fetching search results");

        const posts = await res.json();

        // Formateamos los resultados para limpiar tags HTML
        const formattedResults = posts.map((post) => {
          const cleanTitle = post.title?.rendered ? post.title.rendered.replace(/<[^>]*>?/gm, "") : "";
          const cleanExcerpt = post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]*>?/gm, "") : "";
          const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Crónica";

          return {
            id: post.id,
            title: cleanTitle,
            slug: post.slug,
            excerpt: cleanExcerpt,
            categoryName,
          };
        });

        setResults(formattedResults);
      } catch (error) {
        console.error("Error al buscar crónicas:", error);
        setResults([]);
      } finally {
        setLoading(false);
        setHasSearched(true);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* INPUT MANTENIDO TAL CUAL */}
      <div className="max-w-xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Escribe tu búsqueda..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 bg-transparent border-b border-black/20 focus:border-black outline-none transition-colors uppercase text-sm tracking-wider text-center"
        />
      </div>

      {/* ESTADO DE CARGA / LOADER */}
      {loading && (
        <p className="text-center text-xs uppercase tracking-widest text-neutral-400 animate-pulse">
          Buscando crónicas, obras y artistas...
        </p>
      )}

      {/* SIN RESULTADOS */}
      {!loading && hasSearched && results.length === 0 && (
        <p className="text-center text-sm italic text-neutral-500">
          No se encontraron crónicas para &quot;{query}&quot;.
        </p>
      )}

      {/* RESULTADOS REALES */}
      {!loading && results.length > 0 && (
        <div className="grid gap-8 mt-8">
          {results.map((item) => (
            <Link 
              key={item.id} 
              href={`/post/${item.slug}`} 
              className="block group border-b border-black/5 pb-6 transition-opacity hover:opacity-80"
            >
              <span className="text-xs uppercase tracking-widest opacity-60 text-black">
                {item.categoryName}
              </span>
              <h2 className="text-xl uppercase tracking-wider my-2 font-normal text-black group-hover:underline">
                {item.title}
              </h2>
              <p className="text-sm normal-case tracking-normal text-neutral-600 line-clamp-2">
                {item.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}