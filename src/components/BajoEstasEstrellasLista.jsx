
"use client";
import { useState, useEffect } from 'react';

export default function BajoEstasEstrellas() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllSoundCloudTracks() {
      setLoading(true);
      setError(null);

     
      const CLIENT_ID = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID; 
      const USER_ID = process.env.NEXT_PUBLIC_SOUNDCLOUD_USER_ID; 

      if (!CLIENT_ID || !USER_ID) {
        // Opción B: Si consumen a través de la API local de Next/WordPress
        // ajustamos el URL al proxy interno
      }

      let allTracks = [];
      let nextUrl = `https://api.soundcloud.com/users/${USER_ID}/tracks?client_id=${CLIENT_ID}&limit=200&linked_partitioning=1`;

      try {
        // Paginación recursiva hasta traer el catálogo completo
        while (nextUrl) {
          const res = await fetch(nextUrl);
          if (!res.ok) {
            throw new Error(`Error en la petición: ${res.status}`);
          }
          const data = await res.json();

          // Manejo del formato con linked_partitioning (collection + next_href)
          if (data.collection) {
            allTracks = [...allTracks, ...data.collection];
            nextUrl = data.next_href ? `${data.next_href}&client_id=${CLIENT_ID}` : null;
          } else if (Array.isArray(data)) {
            allTracks = [...allTracks, ...data];
            nextUrl = null;
          } else {
            nextUrl = null;
          }
        }

        // Ordenar de la más reciente a la primera (descendente por fecha)
        const sorted = allTracks.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setInterviews(sorted);
      } catch (err) {
        console.error("Error cargando entrevistas de SoundCloud:", err);
        setError("No se pudieron cargar todas las entrevistas.");
      } finally {
        setLoading(false);
      }
    }

    fetchAllSoundCloudTracks();
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

            {/* Reproductor embed o enlace directo */}
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