'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function PeekRating({
  defaultValue = 0,
  count = 5,
  labels = ['Mala', 'Regular', 'Buena', 'Muy Buena', 'Excelente'],
  activeColor = '#f5b400',
  idleColor = '#52525b',
  size = 28,
  readOnly = false,
  onChange,
}) {
  const [rating, setRating] = useState(defaultValue);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleClick = (index) => {
    if (readOnly) return;
    const newRating = index + 1;
    setRating(newRating);
    if (onChange) onChange(newRating);
  };

  const currentDisplay = hoverIndex !== null ? hoverIndex + 1 : rating;

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => {
          const isActive = i < currentDisplay;
          return (
            <button
              key={i}
              type="button"
              disabled={readOnly}
              onClick={() => handleClick(i)}
              onMouseEnter={() => !readOnly && setHoverIndex(i)}
              onMouseLeave={() => !readOnly && setHoverIndex(null)}
              className={`transition-transform duration-200 focus:outline-none ${
                readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-125'
              }`}
              style={{
                transform: hoverIndex === i ? 'translateY(-4px) scale(1.15)' : 'none',
              }}
            >
              <Star
                size={size}
                fill={isActive ? activeColor : 'none'}
                color={isActive ? activeColor : idleColor}
                strokeWidth={1.5}
              />
            </button>
          );
        })}
      </div>
      {labels && currentDisplay > 0 && (
        <span className="text-xs font-medium text-neutral-400 mt-1">
          {labels[currentDisplay - 1]}
        </span>
      )}
    </div>
  );
}