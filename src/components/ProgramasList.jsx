import { getProgramasYEntrevistas } from "@/lib/soundcloud";
import TrackRowClient from "./TrackRowClient";

export default async function ProgramasList() {
  const { programas, entrevistas } = await getProgramasYEntrevistas();

  return (
    /* 1. CONTENEDOR CON IMAGEN DE BACKGROUND: Usamos una imagen de tu carpeta public/ */
    <section
      className="relative w-full py-20 px-4 md:px-6 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('/teatrowidevacio.png')` }}
    >
      {/* Capa oscura superior opcional para dar contraste y que se lea bien la data */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none" />

      {/* Contenido real por encima del background */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
        {/* 🌟 ENCABEZADO PRINCIPAL DE LA SECCIÓN */}
        <header className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase drop-shadow-md">
            Bajo Estas Estrellas:{" "}
            <span className="font-light text-white/80">Colección</span>
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/70 font-medium italic leading-relaxed drop-shadow">
            Todas las ediciones grabadas de cada temporada, en cada estación
            donde se realizaron.
          </p>
          <div className="mt-6 h-0.5 w-16 bg-[#bfa15f] mx-auto opacity-80" />
        </header>

        {/* COLUMNA 1: OLIVA CON ALPHA (Transparente) */}
        {/* Cambiamos bg-(--olive) por bg-[color:var(--olive)]/80 para mezclar la variable css con un 80% de opacidad */}
        <div className="rounded-2xl p-6 md:p-8 bg-(--olive)/60 backdrop-blur-md shadow-2xl border border-white/5">
          <header className="mb-8">
            <h2 className="text-2xl font-black uppercase text-white tracking-wide">
              Programas
            </h2>
            <div className="mt-2 h-1 w-12 bg-white/30" />
          </header>
          <div className="flex flex-col gap-4">
            {programas.map((item, index) => (
              <TrackRowClient
                key={item.id}
                item={item}
                index={index}
                variant="olive"
              />
            ))}
          </div>
        </div>

        {/* COLUMNA 2: DORADO MATE #bfa15f CON ALPHA (Transparente) */}
        {/* Usamos bg-[#bfa15f]/80 para darle un 80% de opacidad al color hexadecimal */}
        <div className="rounded-2xl p-6 md:p-8 bg-[#bfa15f]/60 backdrop-blur-md shadow-2xl border border-white/5">
          <header className="mb-8">
            <h2 className="text-2xl font-black uppercase text-white tracking-wide">
              Entrevistas
            </h2>
            <div className="mt-2 h-1 w-12 bg-white/30" />
          </header>
          <div className="flex flex-col gap-4">
            {entrevistas.map((item, index) => (
              <TrackRowClient
                key={item.id}
                item={item}
                index={index}
                variant="gold"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
