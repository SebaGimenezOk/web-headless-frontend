import Image from "next/image";

export const metadata = {
  title: 'Bajo Estas Estrellas: Archivo Completo | Crónicas de un Espectador',
  description: 'Colección completa de todas las emisiones grabadas y entrevistas de Bajo Estas Estrellas.',
};

export default function BajoEstasEstrellasPage() {
  // URLs de las playlists oficiales de SoundCloud
  const playlistProgramasUrl = "https%3A//api.soundcloud.com/playlists/1975482434"; // O la URL codificada de tu set de temporada 2026
  const playlistEntrevistasUrl = "https%3A//api.soundcloud.com/playlists/1975482395"; // O la URL codificada de tu set de entrevistas

  return (
    <main
      className="relative w-full py-16 px-4 md:px-6 bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{ backgroundImage: `url('/bg-MiguelAngel.webp')` }}
    >
      {/* Capa de fondo general */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xs pointer-events-none" />

      <div className="relative max-w-5xl mx-auto z-10 space-y-12">
        
        {/* ENCABEZADO TIPO BANNER */}
        <header className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-8 md:p-14 flex items-center min-h-[260px]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/bg-MiguelAngel.webp"
              alt="Fondo Bajo Estas Estrellas"
              fill
              className="object-cover object-center filter brightness-90"
              priority
            />
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-4 text-left">
            <span className="inline-block text-xs uppercase tracking-widest px-3.5 py-1.5 bg-zinc-900 text-white rounded-full font-semibold shadow-sm">
              Archivo Histórico
            </span>
            
            <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-wide uppercase leading-tight">
              Bajo Estas Estrellas: Colección Completa
            </h1>
            
            <p className="text-base md:text-lg text-zinc-700 font-light font-source leading-relaxed max-w-3xl">
              Todas las ediciones que hemos hecho, programas especiales y entrevistas. Un viaje a través de la historia de nuestro programa, con invitados especiales y momentos memorables.
            </p>
            
            <div className="pt-2">
              <div className="h-1 w-24 bg-[#bfa15f] rounded-full opacity-90" />
            </div>
          </div>
        </header>

        {/* LISTADO DE REPRODUCTORES OFICIALES SOUNDCLOUD (LISTA COMPLETA GARANTIZADA) */}
        <div className="flex flex-col gap-10">
          
          {/* MÓDULO 1: TODAS LAS ENTREVISTAS */}
          <div className="rounded-3xl p-6 md:p-10 bg-white/90 backdrop-blur-md shadow-xl border border-zinc-200/80 text-zinc-900 space-y-6">
            <header className="font-source border-b border-zinc-200 pb-4">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-zinc-900">
                Todas las Entrevistas
              </h2>
              <p className="text-sm text-zinc-600 font-light mt-1">
                Charlas y notas exclusivas con nuestros invitados
              </p>
            </header>

            {/* Iframe oficial de SoundCloud para la playlist de Entrevistas */}
            <div className="w-full rounded-2xl overflow-hidden shadow-md">
              <iframe
                width="100%"
                height="450"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/bajoestasestrellas/sets/entrevistas&color=%23bfa15f&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true"
              ></iframe>
            </div>
          </div>

          {/* MÓDULO 2: TODOS LOS PROGRAMAS */}
          <div className="rounded-3xl p-6 md:p-10 bg-white/90 backdrop-blur-md shadow-xl border border-zinc-200/80 text-zinc-900 space-y-6">
            <header className="font-source border-b border-zinc-200 pb-4">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-zinc-900">
                Todos los Programas
              </h2>
              <p className="text-sm text-zinc-600 font-light mt-1">
                Emisiones completas transmitidas al aire
              </p>
            </header>

            {/* Iframe oficial de SoundCloud para la playlist de Programas */}
            <div className="w-full rounded-2xl overflow-hidden shadow-md">
              <iframe
                width="100%"
                height="450"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/bajoestasestrellas/sets/temporada-2026&color=%23bfa15f&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true"
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}