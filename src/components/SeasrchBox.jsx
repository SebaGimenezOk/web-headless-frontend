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
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.cronicasdeunespectador.com/wp-json";
        
        // CPT registrado en WP con rest_base -> 'podcast'
        const endpoint = `${baseUrl}/wp/v2/podcast?search=${encodeURIComponent(trimmedQuery)}&_embed&per_page=10`;

        const res = await fetch(endpoint);

        if (!res.ok) throw new Error("Error en la respuesta de la API");

        const posts = await res.json();

        // Mapeo seguro de los resultados
        const formattedResults = posts.map((post) => {
          // Limpieza de entitiy tags y HTML en títulos
          const cleanTitle = post.title?.rendered
            ? post.title.rendered.replace(/<[^>]*>?/gm, "").replace(/&#8211;/g, "-").replace(/&#8217;/g, "'")
            : "";

          const cleanExcerpt = post.excerpt?.rendered
            ? post.excerpt.rendered.replace(/<[^>]*>?/gm, "")
            : "";

          // Intentamos obtener la categoría/taxonomía embedded si existe
          const taxonomyTerm = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Podcast";

          return {
            id: post.id,
            title: cleanTitle,
            slug: post.slug,
            excerpt: cleanExcerpt,
            categoryName: taxonomyTerm,
          };
        });

        setResults(formattedResults);
      } catch (error) {
        console.error("Error buscando en la API:", error);
        setResults([]);
      } finally {
        setLoading(false);
        setHasSearched(true);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* INPUT MANTENIDO CON TUS ESTILOS */}
      <div className="max-w-xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Escribe tu búsqueda..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 bg-transparent border-b border-black/20 focus:border-black outline-none transition-colors uppercase text-sm tracking-wider text-center text-black"
        />
      </div>

      {/* ESTADO CARGANDO */}
      {loading && (
        <p className="text-center text-xs uppercase tracking-widest text-neutral-400 animate-pulse">
          Buscando en las crónicas...
        </p>
      )}

      {/* SIN RESULTADOS */}
      {!loading && hasSearched && results.length === 0 && (
        <p className="text-center text-sm italic text-neutral-500">
          No se encontraron publicaciones para &quot;{query}&quot;.
        </p>
      )}

      {/* RESULTADOS LISTADOS */}
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
    </div>
  );
}