'use client';

import { useState, useEffect } from 'react';

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
        const data = await res.json();

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
    return <div className="p-6 text-center text-gray-400">Cargando todas las entrevistas...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400">
        Bajo Estas Estrellas — Entrevistas ({interviews.length})
      </h1>

      <div className="space-y-4">
        {interviews.map((track) => (
          <div
            key={track.id}
            className="p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-yellow-500/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <span className="text-xs text-gray-400">
                {new Date(track.created_at).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <h2 className="text-lg font-semibold text-gray-100 mt-1">
                {track.title}
              </h2>
              {track.description && (
                <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                  {track.description}
                </p>
              )}
            </div>

            <div className="w-full md:w-auto flex items-center gap-3">
              <a
                href={track.permalink_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold rounded transition-colors"
              >
                Escuchar
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}