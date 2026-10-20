'use client';

import { useState, useEffect } from 'react';
import BajoEstrellasCTA from './BajoEstrellasCTA';

export default function BajoEstasEstrellas() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTracks() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/soundcloud/tracks');
        const text = await res.text();
        let data;

        try {
          data = JSON.parse(text);
        } catch {
          throw new Error('El servidor devolvió una respuesta no válida.');
        }

        if (!res.ok) {
          throw new Error(data.error || 'Error en la petición');
        }

        setInterviews(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-zinc-400">Cargando todas las entrevistas de SoundCloud...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-heading mb-8 text-[#bfa15f] tracking-wide uppercase">
        Bajo Estas Estrellas — Entrevistas ({interviews.length})
      </h1>

      <div className="space-y-4">
        {interviews.map((track, index) => (
          <div
            key={track.id}
            className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm hover:border-[#bfa15f]/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md bg-[#bfa15f]/15 text-[#bfa15f] tracking-wider">
                  Ep. {(index + 1).toString().padStart(2, '0')}
                </span>
                <span className="text-xs text-zinc-400">
                  {new Date(track.created_at).toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <h2 className="text-base md:text-lg font-semibold text-zinc-900 group-hover:text-[#bfa15f] transition-colors truncate">
                {track.title}
              </h2>
              {track.description && (
                <p className="text-xs md:text-sm text-zinc-500 line-clamp-2 mt-1">
                  {track.description}
                </p>
              )}
            </div>

            <div className="shrink-0 w-full md:w-auto flex items-center gap-3">
              <a
                href={track.permalink_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-2.5 bg-[#f8f5ee] hover:bg-[#bfa15f] text-neutral-800 hover:text-white border border-[#e5e0d8] hover:border-[#bfa15f] text-xs uppercase tracking-wider transition-all rounded-xl font-medium shadow-xs"
              >
                Escuchar 🎙️
              </a>
            </div>
          </div>
        ))}
      </div>
      <BajoEstrellasCTA/>
    </div>
  );
}