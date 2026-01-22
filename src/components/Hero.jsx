// src/components/Hero.jsx

import Image from "next/image";

export default function Hero() {
  return (
    <>
      {/* HERO VISUAL */}
      <section className="relative w-full h-[80vh] min-h-150 overflow-hidden bg-neutral-100">
        {/* Imagen de fondo */}
        <Image
          src="/wolfangM.png"
          alt="Wolfgang Amadeus Mozart"
          fill
          priority
          className="object-cover object-center opacity-50"
        />

        {/* Overlay opcional */}
        <div className="absolute inset-0 bg-linear-to-r from-neutral-50/90 via-neutral-50/70 to-transparent" />

        {/* Contenido sobre la imagen */}
        <div className="relative z-10 max-w-7xl mx-auto my-12 py-6 h-full px-6 flex items-center">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-6xl md:text-4xl">

            </h1>
            <h1 className="text-5xl md:text-5xl uppercase leading-tight">
              “La música es el arte más sublime, el más emotivo y el más
              misterioso.”
            </h1>
        
            <h3 className="text-2xl uppercase  text-gray-700">
              — Wolfgang Amadeus Mozart
            </h3>
          </div>
        </div>
      </section>

      {/* TEXTO DE BAJADA — DEBAJO DEL HERO */}
      <section className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-center text-center space-y-6">
        <span className="text-xl italic text-gray-600 leading-relaxed max-w-4xl">
          Este es un espacio donde reunimos episodios, análisis y contenidos publicados
          desde nuestro editorial. Que lo disfruten tanto como nosotros en hacerlo.-    A.Dominguez Benavides 
        </span>
      </section>
    </>
  );
}
