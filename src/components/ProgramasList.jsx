import { getProgramasYEntrevistas } from "@/lib/soundcloud";
import Image from "next/image";

export default async function ProgramasList() {
  // Llamamos a la nueva función segura
  const { programas, entrevistas } = await getProgramasYEntrevistas();

  // Si ambas listas vienen vacías por algún problema de conexión, no rompemos el layout
  if (programas.length === 0 && entrevistas.length === 0) return null;

  return (
    <section className="w-full border-t border-text/10 py-16 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          
          {/* COLUMNA 1: PROGRAMAS COMPLETOS */}
          <div>
            <header className="mb-6 text-left">
              <h2 className="text-xl md:text-2xl font-black text-text tracking-wide uppercase">
                Programas Completos
              </h2>
              <div className="mt-1.5 h-0.5 w-12 bg-text opacity-80" />
            </header>

            <div className="divide-y divide-text/10">
              {programas.map((item, index) => (
                <TrackRow key={item.id} item={item} index={index} />
              ))}
              {programas.length === 0 && (
                <p className="text-sm text-text/40 py-4">No hay programas disponibles.</p>
              )}
            </div>
          </div>

          {/* COLUMNA 2: ENTREVISTAS */}
          <div>
            <header className="mb-6 text-left">
              <h2 className="text-xl md:text-2xl font-black text-text tracking-wide uppercase">
                Entrevistas Destacadas
              </h2>
              <div className="mt-1.5 h-0.5 w-12 bg-text opacity-80" />
            </header>

            <div className="divide-y divide-text/10">
              {entrevistas.map((item, index) => (
                <TrackRow key={item.id} item={item} index={index} />
              ))}
              {entrevistas.length === 0 && (
                <p className="text-sm text-text/40 py-4">No hay entrevistas disponibles.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function TrackRow({ item, index }) {
  const imageSrc = item.artwork_url 
    ? item.artwork_url.replace("-large.", "-t500x500.") 
    : "/encabezado-cronicas-mobile.jpg"; 

  return (
    <a
      href={item.permalink_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between py-4 group transition-colors duration-200 hover:bg-black/2 rounded-lg px-2 -mx-2"
    >
      <div className="flex items-center gap-4 pr-3">
        <span className="text-xs font-bold text-text/30 w-4 text-right group-hover:text-text">
          {(index + 1).toString().padStart(2, "0")}
        </span>

        <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300">
          <Image
            src={imageSrc}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="font-bold text-text text-sm md:text-base tracking-tight line-clamp-1 group-hover:underline decoration-1 underline-offset-4">
            {item.title}
          </h3>
          {item.date && (
            <p className="text-[11px] text-text/50 mt-0.5">{item.date}</p>
          )}
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-text/15 group-hover:border-text group-hover:bg-text transition-all duration-200">
        <svg
          className="w-3 h-3 text-text group-hover:text-background translate-x-px transition-colors duration-200"
          fill="currentColor"
          viewBox="0 0 24 24"
                >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </a>
  );
}