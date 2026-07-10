import { getAllPodcasts } from "@/services/podcasts";
import Image from "next/image";

export default async function ProgramasList() {
  // 1. Traemos todos los programas/podcasts desde el servicio de WP
  const todosLosPodcasts = await getAllPodcasts().catch(() => []);

  // 2. Filtramos o limitamos a los últimos 4 o 5 emitidos para no saturar antes del footer
  const ultimosProgramas = todosLosPodcasts.slice(0, 5);

  if (ultimosProgramas.length === 0) return null;

  return (
    <section className="w-full bg-(--background) border-t border-(--text-strong)/10 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado del módulo */}
        <header className="mb-10 text-left">
          <h2 className="text-2xl md:text-3xl font-black text-(--text-strong) tracking-wide uppercase">
            Programas Emitidos
          </h2>
          <p className="text-sm text-(--text-muted) mt-1">
            Reviví las últimas emisiones desde SoundCloud
          </p>
        </header>

        {/* Listado de programas estilo Playlist Editorial */}
        <div className="divide-y divide-(--text-strong)/10">
          {ultimosProgramas.map((programa, index) => (
            <a
              key={programa.id || index}
              href={`/podcasts/${programa.slug}`}
              className="flex items-center justify-between py-5 group transition-colors duration-200 hover:bg-black/[0.02] rounded-lg px-2 -mx-2"
            >
              <div className="flex items-center gap-6 pr-4">
                {/* Número de orden o indicador */}
                <span className="text-sm font-bold text-(--text-muted) tracking-tighter w-4 text-right group-hover:text-(--text-strong)">
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                {/* Miniatura sutil opcional si el objeto la trae */}
                {programa.imageUrl && (
                  <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300">
                    <Image
                      src={programa.imageUrl}
                      alt={programa.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Título del programa */}
                <div>
                  <h3 className="font-bold text-(--text-strong) text-base md:text-lg tracking-tight group-hover:underline decoration-1 underline-offset-4">
                    {programa.title}
                  </h3>
                  {/* Si tenés campo de fecha en el objeto, lo podés meter acá */}
                  {programa.date && (
                    <p className="text-xs text-(--text-muted) mt-0.5">{programa.date}</p>
                  )}
                </div>
              </div>

              {/* Icono de Play interactivo estilo minimalista */}
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-(--text-strong)/20 group-hover:border-(--text-strong) group-hover:bg-(--text-strong) transition-all duration-200">
                <svg
                  className="w-4 h-4 text-(--text-strong) group-hover:text-white translate-x-[1px] transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

            </a>
          ))}
        </div>

      </div>
    </section>
  );
}