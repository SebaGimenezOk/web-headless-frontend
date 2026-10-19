import { getProgramasYEntrevistas } from "@/lib/soundcloud";
import TrackRowClient from "@/components/TrackRowClient";
import Image from "next/image";


export const dynamic = 'force-dynamic';
export const revalidate = 0;


export const metadata = {
  title: 'Bajo Estas Estrellas: Archivo Completo | Crónicas de un Espectador',
  description: 'Colección completa de todas las emisiones grabadas y entrevistas de Bajo Estas Estrellas.',
};

export default async function BajoEstasEstrellasPage() {
  const data = await getProgramasYEntrevistas();
  
<<<<<<< HEAD
  // Aseguramos que los más recientes aparezcan primero invirtiendo el array si es necesario
=======
  // Invertimos para mostrar los más recientes al principio en el archivo completo
>>>>>>> develop
  const entrevistas = data?.entrevistas ? [...data.entrevistas].reverse() : [];
  const programas = data?.programas ? [...data.programas].reverse() : [];

  return (
    <main
      className="relative w-full py-16 px-4 md:px-6 bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{ backgroundImage: `url('/bg-MiguelAngel.webp')` }}
    >
<<<<<<< HEAD
      {/* Capa de fondo general */}
=======
>>>>>>> develop
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
<<<<<<< HEAD
              Todas las ediciones que hemos hecho, programas especiales y entrevistas. Un viaje a través de la historia de nuestro programa, con la participación de invitados especiales y momentos memorables.
=======
              Todas las ediciones que hemos hecho, programas especiales y entrevistas. Un viaje a través de la historia de nuestro programa.
>>>>>>> develop
            </p>
            
            <div className="pt-2">
              <div className="h-1 w-24 bg-[#bfa15f] rounded-full opacity-90" />
            </div>
          </div>
        </header>

<<<<<<< HEAD
        {/* LISTADO EN CONTENEDORES CLAROS Y LIMPIOS (TIPO ProgramasList) */}
=======
        {/* CONTENEDORES CON LAS TARJETAS TrackRowClient */}
>>>>>>> develop
        <div className="flex flex-col gap-10">
          
          {/* MÓDULO 1: TODAS LAS ENTREVISTAS */}
          <div className="rounded-3xl p-6 md:p-10 bg-white/90 backdrop-blur-md shadow-xl border border-zinc-200/80 text-zinc-900">
            <header className="mb-8 font-source flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-zinc-900">
                  Todas las Entrevistas <span className="text-[#bfa15f]">({entrevistas.length})</span>
                </h2>
                <p className="text-sm text-zinc-600 font-light mt-1">
                  Charlas y notas exclusivas con nuestros invitados
                </p>
              </div>
            </header>

            <div className="flex flex-col gap-4 font-source">
              {entrevistas.map((item, index) => (
                <TrackRowClient key={item.id} item={item} index={index} variant="default" />
              ))}
            </div>
          </div>

          {/* MÓDULO 2: TODOS LOS PROGRAMAS */}
          <div className="rounded-3xl p-6 md:p-10 bg-white/90 backdrop-blur-md shadow-xl border border-zinc-200/80 text-zinc-900">
            <header className="mb-8 font-source flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-zinc-900">
                  Todos los Programas <span className="text-[#bfa15f]">({programas.length})</span>
                </h2>
                <p className="text-sm text-zinc-600 font-light mt-1">
                  Emisiones completas transmitidas al aire
                </p>
              </div>
            </header>

            <div className="flex flex-col gap-4 font-source">
              {programas.map((item, index) => (
                <TrackRowClient key={item.id} item={item} index={index} variant="default" />
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}