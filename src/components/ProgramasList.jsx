import { getProgramasYEntrevistas } from "@/lib/soundcloud";
import TrackRowClient from "./TrackRowClient";
import Image from "next/image";
import BajoEstrellasCTA from "./BajoEstrellasCTA";

export default async function ProgramasList() {
  const { programas, entrevistas } = await getProgramasYEntrevistas();

  // Limitamos para mostrar solo los más recientes en esta versión compacta
  const programasRecientes = programas.slice(0, 4);
  const entrevistasRecientes = entrevistas.slice(0, 4);

  return (
    <section
      className="relative w-full py-20 px-4 md:px-6 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('/bg-MiguelAngel.webp')` }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-xs pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        <header className="mb-16 max-w-5xl mx-auto bg-transparent p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="relative w-45 h-45 shrink-0 overflow-hidden rounded-2xl">
              <Image
                src="/portada cuadrada fantasia.webp"
                alt="Conductores"
                width={180}
                height={180}
                className="object-contain"
                priority
              />
            </div>

            <div className="text-center sm:text-left flex-1">
              <h1 className="md:text-4xl font-bold text-zinc-900 tracking-wide uppercase">
                PODCAST
              </h1>
              <h2 className=" md:text-4xl font-medium text-zinc-900 tracking-wide uppercase">
                BAJO ESTAS ESTRELLAS
              </h2>
              <p className="mt-3 text-sm md:text-base text-zinc-700 font-light font-source leading-relaxed">
                Emitido en vivo todos los jueves desde los estudios de Radio Grote. 
              </p>
              <div className="mt-4 h-0.5 w-16 bg-[#bfa15f] mx-auto sm:mx-0 opacity-80" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* COLUMNA 1: Programas Recientes */}
          <div className="rounded-2xl p-6 md:p-8 bg-(--olive)/40 backdrop-blur-md shadow-2xl border border-white/5">
            <header className="mb-8">
              <h2 className="text-xl font-bold uppercase text-zinc-700 tracking-wide">
                Últimos Programas
              </h2>
              <div className="mt-2 h-1 w-12 bg-white/30" />
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

          {/* COLUMNA 2: Entrevistas Recientes */}
          <div className="rounded-2xl p-6 md:p-8 bg-[#bfa15f]/40 backdrop-blur-md shadow-2xl border border-white/5">
            <header className="mb-8 font-source">
              <h2 className="text-xl font-bold uppercase text-zinc-700 tracking-wide">
                Últimas Entrevistas
              </h2>
              <div className="mt-2 h-1 w-12 bg-white/30" />
            </header>
            <div
              className="flex flex-col gap-4 text-zinc-700"
              style={{ fontFamily: "var(--font-body)" }}
            >
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
        </div>
      </div>
      <BajoEstrellasCTA />
    </section>
  );
}
