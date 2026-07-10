import { getProgramasYEntrevistas } from "@/lib/soundcloud";
import TrackRowClient from "./TrackRowClient";
import Image from "next/image"; 

export default async function ProgramasList() {
  const { programas, entrevistas } = await getProgramasYEntrevistas();

  return (
    /* 1. CONTENEDOR CON IMAGEN DE BACKGROUND SE MANTIENE FIJO CON TAILWIND */
    <section
      className="relative w-full py-20 px-4 md:px-6 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('/teatrowidevacio.png')` }}
    >
      {/* Capa oscura superior con desenfoque para dar contraste */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-none" />

      {/* Contenido real por encima del background */}
      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* 🌟 ENCABEZADO PRINCIPAL */}
        <header className="text-center mb-16 max-w-4xl mx-auto">
          
          {/* Contenedor Flex con la imagen primero (a la izquierda en pantallas sm) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-4">
            
            {/* IMAGEN DE LOS CONDUCTORES (Ahora a la izquierda) */}
            <div className="relative w-45 h-45 md:w-62.5 md:h-62.5 max-w-75 max-h-75 shrink-0">
              <Image
                src="/conductores.png" 
                alt="Conductores"
                width={300}
                height={300}
                className="object-contain"
                priority
              />
            </div>

            {/* Título: sm:text-right para que apunte estéticamente hacia la imagen */}
            <h1 className="text-2xl md:text-4xl font-medium text-white tracking-wide uppercase drop-shadow-md text-center sm:text-left">
              Bajo Estas Estrellas:{" "}
              <span className="font-light text-white/80">Colección</span>
            </h1>

          </div>
          
          {/* Bajada: Aplicamos la clase font-source (Source Sans 3) */}
          <p className="mt-4 text-sm md:text-base text-white/70 font-light font-source leading-relaxed drop-shadow">
            Todas las editions grabadas de cada temporada, en cada estación
            donde se realizaron.
          </p>
          <div className="mt-6 h-0.5 w-16 bg-[#bfa15f] mx-auto opacity-80" />
        </header>

        {/* CONTENEDOR GRID SÓLO PARA LAS LISTAS (2 Columnas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* COLUMNA 1: OLIVA CON ALPHA */}
          <div className="rounded-2xl p-6 md:p-8 bg-(--olive)/40 backdrop-blur-md shadow-2xl border border-white/5">
            <header className="mb-8 font-source"> 
              <h2 className="text-xl font-bold uppercase text-white tracking-wide">
                Programas
              </h2>
              <div className="mt-2 h-1 w-12 bg-white/30" />
            </header>
            
            <div className="flex flex-col gap-4 font-source">
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

          {/* COLUMNA 2: DORADO MATE CON ALPHA */}
          <div className="rounded-2xl p-6 md:p-8 bg-[#bfa15f]/40 backdrop-blur-md shadow-2xl border border-white/5">
            <header className="mb-8 font-source"> 
              <h2 className="text-xl font-bold uppercase text-white tracking-wide">
                Entrevistas
              </h2>
              <div className="mt-2 h-1 w-12 bg-white/30" />
            </header>
            
            <div className="flex flex-col gap-4 font-source">
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
      </div>
    </section>
  );
}