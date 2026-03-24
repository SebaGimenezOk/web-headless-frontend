"use client";

import { useReproductor } from "@/context/ReproductorContext";

export default function ArticleMeta({
  author,
  date,
  readingTime,
  audioUrl,
}) {
  const { playTrack } = useReproductor();

  return (
    <div className="mb-8 text-sm text-text flex flex-wrap items-center gap-x-3 gap-y-2">
      
      {/* meta original */}
      <span>{author}</span>
      <span>•</span>
      <time>{date}</time>
      <span>•</span>
      <span>{readingTime} min</span>

      {/* 🎧 separador solo si hay audio */}
      {audioUrl && (
        <>
          <span>•</span>

          <button
            onClick={() => playTrack(audioUrl)}
            className="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs transition"
          >
            ▶ Escuchar
          </button>
        </>
      )}
    </div>
  );
}