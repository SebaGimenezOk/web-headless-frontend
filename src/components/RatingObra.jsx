'use client';

import PeekRating from './PeekRating'; 
export default function RatingObra({ score }) {
  const ratingValue = Number(score) || 0;

  // Si no se cargó puntuación en WordPress, no renderiza nada
  if (!ratingValue) return null;

  return (
    <div className="flex items-center gap-3 my-4 p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl w-fit">
      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Puntuación:
      </span>
      <PeekRating
        defaultValue={ratingValue}
        count={5}
        shape="star"
        labels={['Mala', 'Regular', 'Buena', 'Muy Buena', 'Excelente']}
        activeColor="#f5b400"
        idleColor="#52525b"
        tipColor="#27272a"
        tipTextColor="#f5f5f5"
        size={28}
        lift={6}
        magnify={1.15}
        riseDuration={320}
        popScale={1.3}
        showTip
        showLabels
        readOnly={true} // Queda solo para mostrar la calificaicón del crítico
      />
    </div>
  );
}