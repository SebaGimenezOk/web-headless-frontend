import React from 'react';
import ProgramasList from '@/components/ProgramasList';

export const metadata = {
  title: 'Bajo Las Estrellas | Crónicas de un Espectador',
  description: 'Todas las ediciones grabadas y colecciones de Bajo Las Estrellas.',
};

export default function BajoLasEstrellasPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Renderizamos directamente el componente que contiene todo el diseño y la lógica de SoundCloud */}
      <ProgramasList />
    </main>
  );
}