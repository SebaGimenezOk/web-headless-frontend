'use client';

import PeekRating from './PeekRating';

export default function RatingObra({ score }) {
  const ratingValue = Number(score) || 0;

  if (!ratingValue) return null;

  return (
    <div className="flex items-center gap-3 my-6 py-2.5 px-4 bg-zinc-900/40 border border-zinc-800/80 rounded-lg w-fit">
      <span className="text-xs uppercase tracking-widest font-medium text-zinc-400">
        Calificación:
      </span>
      <PeekRating
        defaultValue={ratingValue}
        count={5}
        activeColor="#ffffff" // Estrellas activas en blanco para mantener la estética B&W
        idleColor="#3f3f46"   // Estrellas inactivas en gris oscuro
        size={20}
        readOnly={true}
      />
    </div>
  );
}