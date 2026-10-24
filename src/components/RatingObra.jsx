'use client';

import PeekRating from './PeekRating';

export default function RatingObra({ score }) {
  const ratingValue = Number(score) || 0;

  if (!ratingValue) return null;

  return (
    <div className="flex items-center gap-1.5 align-middle">
      <PeekRating
        defaultValue={ratingValue}
        count={5}
        activeColor="#ffffff"
        idleColor="#52525b"
        size={16}
        readOnly={true}
      />
    </div>
  );
}