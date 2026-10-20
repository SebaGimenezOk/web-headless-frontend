'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

        // Tomar únicamente las últimas 3 entrevistas
        setEntrevistas(soundcloudData.slice(0, 3));

        // 2. Obtener últimos 2 programas desde WordPress Headless
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

  if (loading) {
    return <div className="p-8 text-center text-zinc-400">Cargando programas y entrevistas...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* SECCIÓN 1: ÚLTIMAS 3 ENTREVISTAS */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-heading text-[#bfa15f] uppercase tracking-wide">
            Últimas Entrevistas
          </h2>
          <Link href="/bajo-estas-estrellas" className="text-xs text-zinc-400 hover:text-[#bfa15f] uppercase tracking-wider">
            Ver todas →
          </Link>
        </div>

        <div className="space-y-3">
          {entrevistas.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-white border border-zinc-200/80 rounded-xl flex items-center justify-between gap-4 hover:border-[#bfa15f]/50 transition-all shadow-sm"
            >
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#bfa15f]/15 text-[#bfa15f] mr-2">
                  Ep. {(index + 1).toString().padStart(2, '0')}
                </span>
                <h3 className="inline text-sm font-semibold text-zinc-900 truncate">
                  {item.title}
                </h3>
              </div>
              <a
                href={item.permalink_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#f8f5ee] hover:bg-[#bfa15f] hover:text-white border border-[#e5e0d8] text-xs uppercase rounded-lg transition-all font-medium shrink-0"
              >
                Escuchar 🎙️
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 2: ÚLTIMOS 2 PROGRAMAS */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-heading text-[#bfa15f] uppercase tracking-wide">
            Últimos Programas
          </h2>
          <Link href="/programas" className="text-xs text-zinc-400 hover:text-[#bfa15f] uppercase tracking-wider">
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programas.map((post) => {
            const featuredImg =
              post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg';

            return (
              <article key={post.id} className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
                <image
                  src={featuredImg}
                  alt={post.title.rendered}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3
                  className="text-lg font-bold text-zinc-900 mb-2 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <Link
                  href={`/podcasts/${post.slug}`}
                  className="inline-block mt-2 text-xs font-semibold uppercase text-[#bfa15f] hover:underline"
                >
                  Ver programa →
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* SECCIÓN CTA / LLAMADA A LA ACCIÓN A BAJO LAS ESTRELLAS */}
      <section className="bg-[#f8f5ee] border border-[#e5e0d8] rounded-2xl p-8 text-center my-8 shadow-xs">
        <h3 className="text-xl md:text-2xl font-heading text-neutral-900 mb-2">
          ¿Querés revivir todos los programas anteriores?
        </h3>
        <p className="text-sm text-zinc-600 max-w-xl mx-auto mb-6">
          Explorá el archivo completo de entrevistas y transmisiones de Bajo Estas Estrellas en nuestro espacio exclusivo.
        </p>
        <Link
          href="/bajo-estas-estrellas"
          className="inline-flex items-center justify-center px-6 py-3 bg-[#bfa15f] hover:bg-[#a88e52] text-white text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-sm"
        >
          Ver archivo completo de entrevistas →
        </Link>
      </section>
    </div>
  );
}