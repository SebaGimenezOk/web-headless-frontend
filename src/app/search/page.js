"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

useEffect(() => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      setResults([]);
      setLoading(false);
      setHasSearched(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.cronicasdeunespectador.com/wp-json";
        
        
     const endpoint = `https://api.cronicasdeunespectador.com/wp-json/wp/v2/podcast?per_page=100&_embed`;

        const res = await fetch(endpoint);

        if (!res.ok) throw new Error("Error en la respuesta de la API");

        const posts = await res.json();

        // Filtramos en cliente para abarcar títulos, slugs, resúmenes y taxonomías
        const filteredPosts = posts.filter((post) => {
          const title = post.title?.rendered ? post.title.rendered.toLowerCase() : "";
          const slug = post.slug ? post.slug.toLowerCase() : "";
          const excerpt = post.excerpt?.rendered ? post.excerpt.rendered.toLowerCase() : "";

          return (
            title.includes(trimmedQuery) ||
            slug.includes(trimmedQuery) ||
            excerpt.includes(trimmedQuery)
          );
        });

        const formattedResults = filteredPosts.map((post) => {
          const cleanTitle = post.title?.rendered
            ? post.title.rendered
                .replace(/<[^>]*>?/gm, "")
                .replace(/&#8211;/g, "-")
                .replace(/&#8217;/g, "'")
            : "";

          const cleanExcerpt = post.excerpt?.rendered
            ? post.excerpt.rendered.replace(/<[^>]*>?/gm, "")
            : "";

          const categoryTerm = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Podcast";

          return {
            id: post.id,
            title: cleanTitle,
            slug: post.slug,
            excerpt: cleanExcerpt,
            categoryName: categoryTerm,
          };
        });

        setResults(formattedResults);
      } catch (error) {
        console.error("Error al buscar podcasts:", error);
        setResults([]);
      } finally {
        setLoading(false);
        setHasSearched(true);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <main className="w-full max-w-4xl mx-auto px-4 py-12">
      {/* INPUT */}
      <div className="max-w-xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Escribe tu búsqueda..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 bg-transparent border-b border-black/20 focus:border-black outline-none transition-colors uppercase text-sm tracking-wider text-center text-black"
        />
      </div>

      {/* CARGANDO */}
      {loading && (
        <p className="text-center text-xs uppercase tracking-widest text-neutral-400 animate-pulse">
          Buscando en las crónicas y podcasts...
        </p>
      )}

      {/* SIN RESULTADOS */}
      {!loading && hasSearched && results.length === 0 && (
        <p className="text-center text-sm italic text-neutral-500">
          No se encontraron publicaciones para &quot;{query}&quot;.
        </p>
      )}

      {/* RESULTADOS REALES */}
      {!loading && results.length > 0 && (
        <div className="grid gap-8 mt-8">
          {results.map((item) => (
            <Link 
              key={item.id} 
              href={`/podcasts/${item.slug}`}
              className="block group border-b border-black/10 pb-6 transition-opacity hover:opacity-75"
            >
              <span className="text-xs uppercase tracking-widest opacity-60 text-black block mb-1">
                {item.categoryName}
              </span>
              <h2 className="text-xl uppercase tracking-wider mb-2 font-normal text-black group-hover:underline">
                {item.title}
              </h2>
              {item.excerpt && (
                <p className="text-sm normal-case tracking-normal text-neutral-600 line-clamp-2">
                  {item.excerpt}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}