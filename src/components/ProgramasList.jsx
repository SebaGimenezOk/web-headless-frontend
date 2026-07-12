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
        
        {/* 🌟 ENCABEZADO PRINCIPAL (Estructurado como CARD transparente) */}
        <header className="mb-16 max-w-5xl mx-auto bg-transparent p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            
            {/* IMAGEN Fija en 180x180 */}
            <div className="relative w-45 h-45 shrink-0 overflow-hidden rounded-2xl">
              <Image
                src="/Alejandro-Claudia.png" 
                alt="Conductores"
                width={180}
                height={180}
                className="object-contain"
                priority
              />
            </div>

            {/* BLOQUE DE TEXTOS (Título y frase alineados juntos a la derecha de la foto) */}
            <div className="text-center sm:text-left flex-1">
              {/* Título ligero */}
              <h1 className="text-2xl md:text-4xl font-medium text-white tracking-wide uppercase drop-shadow-md">
                Bajo Estas Estrellas: Colección
              </h1>
              
              {/* Frase descriptiva integrada en la misma tarjeta */}
              <p className="mt-3 text-sm md:text-base text-white/70 font-light font-source leading-relaxed drop-shadow">
                Todas las ediciones grabadas de cada temporada, en cada estación
                donde se realizaron.
              </p>
              
              {/* Línea decorativa alineada al texto */}
              <div className="mt-4 h-0.5 w-16 bg-[#bfa15f] mx-auto sm:mx-0 opacity-80" />
            </div>

          </div>
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