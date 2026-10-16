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
      className="relative w-full py-20 px-4 md:px-6 bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{ backgroundImage: `url('/bg-MiguelAngel.webp')` }}
    >
      <div className="absolute inset-0 bg-white/25 backdrop-blur-xs pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10 space-y-16">
        {/* ENCABEZADO EXTENDIDO */}
        <header className="max-w-5xl mx-auto bg-transparent p-4 md:p-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="relative w-48 h-48 shrink-0 overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/Alejandro-Claudia-2.png"
                alt="Conductores Bajo Estas Estrellas"
                width={192}
                height={192}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex-1 space-y-3">
              <span className="text-xs uppercase tracking-widest px-3 py-1 bg-black/10 text-zinc-800 rounded-full font-semibold border border-black/10">
                Archivo Histórico
              </span>
              <h1 className="text-3xl md:text-5xl font-medium text-zinc-900 tracking-wide uppercase">
                Bajo Estas Estrellas: Colección Completa
              </h1>
              <p className="text-base md:text-lg text-zinc-700 font-light font-source leading-relaxed">
                Todas las ediciones que hemos hecho,  programas especiales y entrevistas. Un viaje a través de la historia de nuestro programa, con la participación de invitados especiales y momentos memorables.
              </p>
              <div className="h-0.5 w-20 bg-[#bfa15f] mx-auto sm:mx-0 opacity-90" />
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