import { getProgramasYEntrevistas } from "@/lib/soundcloud";
import TrackRowClient from "./TrackRowClient";
import Image from "next/image";
import BajoEstrellasCTA from "./BajoEstrellasCTA";

export default async function ProgramasList() {
  const { programas, entrevistas } = await getProgramasYEntrevistas();

  // Seleccionamos exactamente los últimos 2 programas y las últimas 3 entrevistas
  const programasRecientes = programas.slice(0, 2);
  const entrevistasRecientes = entrevistas.slice(0, 3);

  return (
    <section
      className="relative w-full py-20 px-4 md:px-6 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('/bg-MiguelAngel.webp')` }}
    >
      {/* Capa de contraste con desenfoque suave */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-xs pointer-events-none" />

      <div className="relative max-w-5xl mx-auto z-10 space-y-12">
        {/* 🌟 ENCABEZADO PRINCIPAL */}
        <header className="max-w-5xl mx-auto bg-transparent p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="relative w-45 h-45 shrink-0 overflow-hidden rounded-2xl">
              <Image
                src="/portada cuadrada fantasia.webp"
                alt="Conductores"
                width={480}
                height={480}
                className="object-contain"
                priority
              />
            </div>

            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-wide uppercase">
                BAJO ESTAS ESTRELLAS
              </h1>
              <h2 className="text-xl md:text-3xl font-medium text-zinc-800 tracking-wide uppercase mt-1">
                EL PODCAST
              </h2>
              <p className="mt-3 text-sm md:text-base text-zinc-700 font-light font-source leading-relaxed">
                Emitido en vivo todos los jueves desde los estudios de Radio Grote.
              </p>
              <div className="mt-4 h-0.5 w-16 bg-[#bfa15f] mx-auto sm:mx-0 opacity-80" />
            </div>
          </div>
        </header>

        {/* 🟤 MÓDULO ÚNICO CON FONDO MARRÓN UNIFICADO */}
        <div className="rounded-3xl p-6 md:p-10 bg-[#3a2e2b]/80 backdrop-blur-md shadow-2xl border border-white/10 text-white space-y-10">
          
          {/* SECCIÓN 1: ÚLTIMAS 3 ENTREVISTAS */}
          <div>
            <header className="mb-6 font-source">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-[#bfa15f]">
                Últimas Entrevistas
              </h2>
              <div className="mt-2 h-1 w-16 bg-[#bfa15f]/40" />
            </header>

            <div className="flex flex-col gap-4 font-source">
              {entrevistasRecientes.map((item, index) => (
                <TrackRowClient
                  key={item.id}
                  item={item}
                  index={index}
                  variant="gold"
                />
              ))}
            </div>
          </div>

          {/* DIVISOR INTERNO SUTIL */}
          <div className="h-px bg-white/10 w-full" />

          {/* SECCIÓN 2: ÚLTIMOS 2 PROGRAMAS */}
          <div>
            <header className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-zinc-200">
                Últimos Programas
              </h2>
              <div className="mt-2 h-1 w-16 bg-white/30" />
            </header>

            <div className="flex flex-col gap-4 font-source">
              {programasRecientes.map((item, index) => (
                <TrackRowClient
                  key={item.id}
                  item={item}
                  index={index}
                  variant="olive"
                />
              ))}
            </div>
          </div>

        </div>

        {/* 🚀 CALL TO ACTION (DEBAJO DEL MÓDULO) */}
        <div className="pt-4">
          <BajoEstrellasCTA />
        </div>
      </div>
    </section>
  );
}