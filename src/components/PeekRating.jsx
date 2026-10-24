'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

export default function PeekRating({
  count = 5,
  defaultValue = 0,
  value,
  readOnly = false,
  size = 16,
  activeColor = 'var(--beige)',
  idleColor = 'var(--border)',
  labels,
  onChange,
}) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentDisplay = hoverIndex !== null 
    ? hoverIndex + 1 
    : (isControlled ? value : internalValue);

  const handleClick = (index) => {
    if (readOnly) return;
    const newValue = index + 1;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

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
        <span
          className="text-xs font-semibold tracking-wide uppercase mt-0.5"
          style={{ color: 'var(--text-strong)' }}
        >
          {labels[currentDisplay - 1]}
        </span>
      )}
    </div>
  );
}