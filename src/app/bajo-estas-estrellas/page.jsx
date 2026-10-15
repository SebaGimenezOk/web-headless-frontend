import React from 'react';
import ProgramasList from '@/components/ProgramasList';

export const metadata = {
  title: 'Bajo Las Estrellas | Crónicas de un Espectador',
  description: 'Espacio radial y contenidos exclusivos de Bajo Las Estrellas.',
};

export default function BajoLasEstrellasPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Hero / Encabezado del programa */}
      <section className="relative py-20 px-6 md:px-12 border-b border-neutral-800 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-widest px-3 py-1 bg-white/10 text-neutral-300 rounded-full border border-white/20">
            Transmisión Radial
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Bajo Las Estrellas
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Un recorrido por la cultura, la música, entrevistas en vivo y el análisis de la realidad bajo una mirada íntima y reflexiva.
          </p>
        </div>
      </section>

      {/* Contenido Principal y Listado de Programas */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white border-l-4 border-white pl-4">
            Emisiones y Programas Recientes
          </h2>
          <p className="text-neutral-400">
            Explora las últimas rutinas, archivos de audio y detalles de cada emisión.
          </p>
        </div>

        {/* Componente de listado actualizado */}
        <ProgramasList />
      </section>
    </main>
  );
}