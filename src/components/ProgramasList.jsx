'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import image from 'next/image';


export default function ProgramasLista() {
  const [entrevistas, setEntrevistas] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // 1. Obtener entrevistas de SoundCloud
        const soundcloudRes = await fetch('/api/soundcloud/tracks');
        const scText = await soundcloudRes.text();
        let soundcloudData = [];

        try {
          soundcloudData = JSON.parse(scText);
        } catch {
          throw new Error('La API de SoundCloud no devolvió un JSON válido.');
        }

        if (!soundcloudRes.ok) {
          throw new Error(soundcloudData.error || 'Error al obtener entrevistas');
        }

        setEntrevistas(soundcloudData.slice(0, 3));

        // 2. Obtener últimos programas desde WordPress Headless
        const wpRes = await fetch(
          'https://api.cronicasdeunespectador.com/wp-json/wp/v2/posts?per_page=2&_embed'
        );

        if (wpRes.ok) {
          const wpText = await wpRes.text();
          try {
            const wpData = JSON.parse(wpText);
            setProgramas(wpData);
          } catch (e) {
            console.error('Error parseando WordPress:', e);
          }
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section 
      className="relative w-full py-20 px-4 md:px-6 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/bg-MiguelAngel.webp')" }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-xs pointer-events-none"></div>
      
      <div className="relative max-w-5xl mx-auto z-10 space-y-12">
        {/* HEADER DE LA SECCIÓN */}
        <header className="max-w-5xl mx-auto bg-transparent p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="relative w-auto h-auto shrink-0 overflow-hidden rounded-2xl">
              <image 
                alt="Conductores" 
                width="480" 
                height="480" 
                className="object-contain" 
                src="/bg-MiguelAngel.webp" 
              />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl md:text-5xl font-medium text-zinc-900 tracking-wide uppercase">
                BAJO ESTAS ESTRELLAS
              </h1>
              <h2 className="text-2xl md:text-4xl font-medium text-zinc-800 tracking-wide uppercase mt-1">
                EL PODCAST
              </h2>
              <p className="md:mt-3 text-sm md:text-base text-zinc-700 font-light leading-relaxed">
                Emitido en vivo todos los jueves desde los estudios de Radio Grote.
              </p>
              <div className="mt-4 h-0.5 w-16 bg-[#bfa15f] mx-auto sm:mx-0 opacity-80"></div>
            </div>
          </div>
        </header>

        {/* CONTENEDOR PRINCIPAL DE LISTAS */}
        <div className="rounded-3xl p-6 md:p-10 bg-[#3a2e2b]/20 backdrop-blur-md shadow-2xl border border-white/10 text-white space-y-10">
          
          {/* ÚLTIMAS ENTREVISTAS */}
          <div>
            <header className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-zinc-900">
                Últimas Entrevistas
              </h2>
              <div className="mt-2 h-1 w-16 bg-[#bfa15f]/40"></div>
            </header>

            {loading ? (
              <div className="text-sm text-zinc-200">Cargando entrevistas...</div>
            ) : error ? (
              <div className="text-sm text-red-300">Error al cargar: {error}</div>
            ) : (
              <div className="flex flex-col gap-4">
                {entrevistas.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white/90 text-zinc-900 border border-zinc-200/80 rounded-xl flex items-center justify-between gap-4 hover:border-[#bfa15f] transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#bfa15f]/15 text-[#bfa15f] mr-2">
                        Ep. {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <h3 className="inline text-sm font-semibold truncate">
                        {item.title}
                      </h3>
                    </div>
                    <a
                      href={item.permalink_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#f8f5ee] hover:bg-[#bfa15f] hover:text-white border border-[#e5e0d8] text-xs uppercase rounded-lg transition-all font-medium text-zinc-800 shrink-0"
                    >
                      Escuchar 🎙️
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="h-px bg-white/10 w-full"></div>

          {/* ÚLTIMOS PROGRAMAS */}
          <div>
            <header className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-zinc-900">
                Últimos Programas
              </h2>
              <div className="mt-2 h-1 w-16 bg-white/30"></div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {programas.map((post) => {
                const featuredImg =
                  post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg';

                return (
                  <article key={post.id} className="bg-white/90 text-zinc-900 p-4 rounded-xl shadow-md">
                    <image
                      src={featuredImg}
                      alt={post.title.rendered}
                      className="w-full h-36 object-cover rounded-lg mb-3"
                      width={400}
                      height={200}
                    />
                    <h3
                      className="text-sm font-bold line-clamp-2 mb-2"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <Link
                      href={`/podcasts/${post.slug}`}
                      className="text-xs font-semibold text-[#bfa15f] uppercase hover:underline"
                    >
                      Ver programa →
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA EXCLUSIVO (LLAMADO A LA ACCIÓN) */}
        <div className="pt-4">
          <section className="relative w-full my-12 px-4 md:px-6">
            <div className="max-w-5xl mx-auto rounded-3xl bg-neutral-950 border border-[#bfa15f]/30 p-8 md:p-12 shadow-2xl overflow-hidden relative">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#bfa15f]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div className="relative w-28 h-28 md:w-36 md:h-36 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg bg-black/40 flex items-center justify-center">
                  <image 
                    alt="Bajo Estas Estrellas Conductores" 
                    width="140" 
                    height="140" 
                    className="object-contain" 
                    src="/Alejandro-Claudia-2.png" 
                  />
                </div>
                
                <div className="flex-1 space-y-3">
                  <span className="text-[11px] mb-3 uppercase tracking-widest px-3 py-1 bg-[#bfa15f]/20 text-[#bfa15f] rounded-full font-semibold border border-[#bfa15f]/30">
                    Espacio Radial Exclusivo
                  </span>
                  <h2 className="text-2xl md:text-3xl font-medium uppercase text-white tracking-wide">
                    Bajo Estas Estrellas
                  </h2>
                  <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed max-w-xl">
                    Revive todas las ediciones grabadas, entrevistas imperdibles y bloques temáticos de cada estación de radio.
                  </p>
                </div>
                
                <div className="shrink-0">
                  <Link 
                    className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-black bg-[#bfa15f] hover:bg-white transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" 
                    href="/bajo-estas-estrellas"
                  >
                    Explorar Colección →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </section>
  );
}