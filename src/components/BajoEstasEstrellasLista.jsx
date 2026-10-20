'use client';

import { useState, useEffect } from 'react';
import image from 'next/image';


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

  return (
    <main 
      className="relative w-full py-16 px-4 md:px-6 bg-cover bg-center bg-no-repeat bg-fixed min-h-screen" 
      style={{ backgroundImage: "url('/bg-MiguelAngel.webp')" }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xs pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto z-10 space-y-12">
        {/* HEADER DE LA VISTA */}
        <header className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-8 md:p-14 flex items-center min-h-65">
          <div className="absolute inset-0 z-0">
            <image
              alt="Fondo Bajo Estas Estrellas" 
              className="object-cover object-center filter brightness-90" 
              src="/bg-MiguelAngel.webp" 
              style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px' }} 
            />
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl space-y-4 text-left">
            <span className="inline-block text-xs uppercase tracking-widest px-3.5 py-1.5 bg-zinc-900 text-white rounded-full font-semibold shadow-sm">
              Archivo Histórico
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-wide uppercase leading-tight">
              Bajo Estas Estrellas: Colección Completa
            </h1>
            <p className="text-base md:text-lg text-zinc-700 font-light leading-relaxed max-w-3xl">
              Todas las ediciones que hemos hecho, programas especiales y entrevistas. Un viaje a través de la historia de nuestro programa.
            </p>
            <div className="pt-2">
              <div className="h-1 w-24 bg-[#bfa15f] rounded-full opacity-90"></div>
            </div>
          </div>
        </header>

        {/* LISTADOS DE ENTREVISTAS */}
        <div className="flex flex-col gap-10">
          <div className="rounded-3xl p-6 md:p-10 bg-white/90 backdrop-blur-md shadow-xl border border-zinc-200/80 text-zinc-900">
            <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-zinc-900">
                  Todas las Entrevistas <span className="text-[#bfa15f]">({interviews.length})</span>
                </h2>
                <p className="text-sm text-zinc-600 font-light mt-1">Charlas y notas exclusivas con nuestros invitados</p>
              </div>
            </header>

            {loading ? (
              <div className="py-8 text-center text-zinc-500">Cargando entrevistas desde SoundCloud...</div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">{error}</div>
            ) : (
              <div className="flex flex-col gap-4">
                {interviews.map((track, index) => (
                  <div
                    key={track.id}
                    className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-xs hover:border-[#bfa15f] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
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
                      <h3 className="text-base md:text-lg font-semibold text-zinc-900 truncate">
                        {track.title}
                      </h3>
                      {track.description && (
                        <p className="text-xs md:text-sm text-zinc-500 line-clamp-2 mt-1">
                          {track.description}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 w-full md:w-auto">
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
            )}
          </div>
        </div>

      </div>
    </main>
  );
}