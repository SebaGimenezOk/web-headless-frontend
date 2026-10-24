'use client';

import PeekRating from './PeekRating';

const LABELS = ['Mala', 'Regular', 'Buena', 'Muy Buena', 'Excelente'];

export default function RatingObra({ score }) {
  const ratingValue = Number(score) || 0;

  if (!ratingValue) return null;

  return (
    <div className="my-5 flex items-center gap-8">
      <span
        className="text-xs uppercase tracking-widest font-medium"
        style={{ color: 'var(--text)' }}
      >
        Calificación:
      </span>

      <PeekRating
        value={ratingValue}
        defaultValue={ratingValue}
        count={5}
        size={17}
        readOnly={true}
        activeColor="#d2c4b2" // var(--beige) de globals.css
        idleColor="#b5bfc6"   // var(--border) de globals.css
        labels={LABELS}
      />
    </div>
  );
}