import { getProgramasYEntrevistas } from "@/lib/soundcloud";
import TrackRowClient from "@/components/TrackRowClient";
import Image from "next/image";

export const metadata = {
  title: 'Bajo Estas Estrellas: Archivo Completo | Crónicas de un Espectador',
  description: 'Colección completa de todas las emisiones grabadas y entrevistas de Bajo Estas Estrellas.',
};

export default async function BajoEstasEstrellasPage() {
  const { programas, entrevistas } = await getProgramasYEntrevistas();

  return (
    <main
      className="relative w-full py-16 px-4 md:px-6 bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{ backgroundImage: `url('/bg-MiguelAngel.webp')` }}
    >
      {/* Capa de fondo general para mantener el blur y contraste */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-xs pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10 space-y-12">
        
        {/* ENCABEZADO TIPO BANNER DE ANCHO COMPLETO CON LA IMAGEN DE FONDO Y BORDES REDONDEADOS */}
        <header className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-8 md:p-14 flex items-center">
          
          {/* Imagen de fondo dentro del banner con posicionamiento absoluto */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/bg-MiguelAngel.webp"
              alt="Fondo Bajo Estas Estrellas"
              fill
              className="object-cover object-center filter brightness-90"
              priority
            />
            {/* Capa translúcida sobre la imagen para asegurar legibilidad perfecta del texto */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-md" />
          </div>

          {/* Contenido de texto superpuesto sobre el banner */}
          <div className="relative z-10 max-w-4xl space-y-4 text-left">
            <span className="inline-block text-xs uppercase tracking-widest px-3.5 py-1.5 bg-black/80 text-white rounded-full font-semibold shadow-sm">
              Archivo Histórico
            </span>
            
            <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-wide uppercase leading-tight">
              Bajo Estas Estrellas: Colección Completa
            </h1>
            
            <p className="text-base md:text-lg text-zinc-800 font-light font-source leading-relaxed max-w-3xl">
              Todas las ediciones que hemos hecho, programas especiales y entrevistas. Un viaje a través de la historia de nuestro programa, con la participación de invitados especiales y momentos memorables.
            </p>
            
            <div className="pt-2">
              <div className="h-1 w-24 bg-[#bfa15f] rounded-full opacity-90" />
            </div>
          </div>
        </header>

        {/* LISTADO COMPLETO EN DOS COLUMNAS AMPLIAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* COLUMNA 1: TODOS LOS PROGRAMAS */}
          <div className="rounded-2xl p-6 md:p-10 bg-(--olive)/50 backdrop-blur-md shadow-2xl border border-white/10">
            <header className="mb-8">
              <h2 className="text-2xl font-bold uppercase text-zinc-800 tracking-wide">
                Todos los Programas ({programas.length})
              </h2>
              <div className="mt-2 h-1 w-16 bg-white/40" />
            </header>
            <div className="flex flex-col gap-4 font-source">
              {programas.map((item, index) => (
                <TrackRowClient key={item.id} item={item} index={index} variant="olive" />
              ))}
            </div>
          </div>

          {/* COLUMNA 2: TODAS LAS ENTREVISTAS */}
          <div className="rounded-2xl p-6 md:p-10 bg-[#bfa15f]/50 backdrop-blur-md shadow-2xl border border-white/10">
            <header className="mb-8 font-source">
              <h2 className="text-2xl font-bold uppercase text-zinc-800 tracking-wide">
                Todas las Entrevistas ({entrevistas.length})
              </h2>
              <div className="mt-2 h-1 w-16 bg-white/40" />
            </header>
            <div className="flex flex-col gap-4 text-zinc-700" style={{ fontFamily: "var(--font-body)" }}>
              {entrevistas.map((item, index) => (
                <TrackRowClient key={item.id} item={item} index={index} variant="gold" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}