import { getProgramasYEntrevistas } from "@/lib/soundcloud";
import TrackRowClient from "@/components/TrackRowClient";
import Image from "next/image";

export const metadata = {
  title: 'Bajo Estas Estrellas: Archivo Completo | Crónicas de un Espectador',
  description: 'Colección completa de todas las emisiones grabadas y entrevistas de Bajo Estas Estrellas.',
};

export default async function BajoEstasEstrellasPage() {
  const data = await getProgramasYEntrevistas();
  
  // Si la API devuelve los elementos invertidos o quieres asegurarte de ver los más recientes primero,
  // puedes usar [...data.entrevistas].reverse() o dejarlos tal cual si ya vienen ordenados.
  const entrevistas = data?.entrevistas ? [...data.entrevistas].reverse() : [];
  const programas = data?.programas ? [...data.programas].reverse() : [];

  return (
    <main
      className="relative w-full py-16 px-4 md:px-6 bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{ backgroundImage: `url('/bg-MiguelAngel.webp')` }}
    >
      {/* Capa de fondo general para mantener el blur y contraste */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-xs pointer-events-none" />

      <div className="relative max-w-5xl mx-auto z-10 space-y-12">
        
        {/* ENCABEZADO TIPO BANNER DE ANCHO COMPLETO CON LA IMAGEN DE FONDO VISIBLE */}
        <header className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-8 md:p-14 flex items-center min-h-[260px]">
          
          {/* Imagen de fondo dentro del banner */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/bg-MiguelAngel.webp"
              alt="Fondo Bajo Estas Estrellas"
              fill
              className="object-cover object-center filter brightness-90"
              priority
            />
            {/* Capa translúcida suave para que la imagen se aprecie y el texto sea 100% legible */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
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

        {/* LISTADO COMPLETO EN 1 SOLA COLUMNA CON MÓDULOS MARRONES SEPARADOS */}
        <div className="flex flex-col gap-10">
          
          {/* MÓDULO 1: TODAS LAS ENTREVISTAS */}
          <div className="rounded-3xl p-6 md:p-10 bg-[#3a2e2b]/85 backdrop-blur-md shadow-2xl border border-white/10 text-white">
            <header className="mb-8 font-source flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#bfa15f]/30 pb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-[#bfa15f]">
                  Todas las Entrevistas ({entrevistas.length})
                </h2>
                <p className="text-sm text-zinc-300 font-light mt-1">
                  Charlas y notas exclusivas con nuestros invitados
                </p>
              </div>
            </header>

            <div className="flex flex-col gap-4 font-source">
              {entrevistas.map((item, index) => (
                <TrackRowClient key={item.id} item={item} index={index} variant="gold" />
              ))}
            </div>
          </div>

          {/* MÓDULO 2: TODOS LOS PROGRAMAS */}
          <div className="rounded-3xl p-6 md:p-10 bg-[#3a2e2b]/85 backdrop-blur-md shadow-2xl border border-white/10 text-white">
            <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-zinc-800">
                  Todos los Programas ({programas.length})
                </h2>
                <p className="text-sm text-zinc-800 font-light mt-1">
                  Emisiones completas transmitidas al aire
                </p>
              </div>
            </header>

            <div className="flex flex-col gap-4 font-source">
              {programas.map((item, index) => (
                <TrackRowClient key={item.id} item={item} index={index} variant="olive" />
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}