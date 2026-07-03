"use client";

import { useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="max-w-xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Escribe tu búsqueda..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 bg-transparent border-b border-black/20 focus:border-black outline-none transition-colors uppercase text-sm tracking-wider text-center"
        />
      </div>

      {/* Resultados Mockeados */}
      <div className="grid gap-8 mt-8 opacity-40">
        <p className="text-center text-sm italic">Resultados de muestra (Lorem Ipsum):</p>
        {[1, 2].map((i) => (
          <div key={i} className="border-b border-black/5 pb-6">
            <span className="text-xs uppercase tracking-widest opacity-60">Temporada X • Categoría Y</span>
            <h2 className="text-xl uppercase tracking-wider my-2 font-normal">
              Título de la Crónica de Muestra {i}
            </h2>
            <p className="text-sm normal-case tracking-normal text-neutral-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam id lorem tincidunt consequat.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}