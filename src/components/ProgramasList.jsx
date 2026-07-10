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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none" />

      {/* Contenido real por encima del background */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
        
        {/* COLUMNA 1: OLIVA CON ALPHA (Transparente) */}
        {/* Cambiamos bg-(--olive) por bg-[color:var(--olive)]/80 para mezclar la variable css con un 80% de opacidad */}
        <div className="rounded-2xl p-6 md:p-8 bg-[color:var(--olive)]/80 backdrop-blur-md shadow-2xl border border-white/5">
          <header className="mb-8">
            <h2 className="text-2xl font-black uppercase text-white tracking-wide">Programas</h2>
            <div className="mt-2 h-1 w-12 bg-white/30" />
          </header>
          <div className="flex flex-col gap-4">
            {programas.map((item, index) => (
              <TrackRowClient key={item.id} item={item} index={index} variant="olive" />
            ))}
          </div>
        </div>

        {/* COLUMNA 2: DORADO MATE #bfa15f CON ALPHA (Transparente) */}
        {/* Usamos bg-[#bfa15f]/80 para darle un 80% de opacidad al color hexadecimal */}
        <div className="rounded-2xl p-6 md:p-8 bg-[#bfa15f]/80 backdrop-blur-md shadow-2xl border border-white/5">
          <header className="mb-8">
            <h2 className="text-2xl font-black uppercase text-white tracking-wide">Entrevistas</h2>
            <div className="mt-2 h-1 w-12 bg-white/30" />
          </header>
          <div className="flex flex-col gap-4">
            {entrevistas.map((item, index) => (
              <TrackRowClient key={item.id} item={item} index={index} variant="gold" />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}