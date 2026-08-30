import React from 'react'
import { Star } from 'lucide-react'

export function StarRating({ rating = 5, maxStars = 5, size = 16, interactive = false, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, idx) => {
        const starValue = idx + 1
        const isFilled = starValue <= Math.round(rating)

        if (interactive) {
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChange && onChange(starValue)}
              className="focus:outline-none transition-transform hover:scale-110 p-0.5 text-amber-400"
            >
              <Star
                size={size}
                fill={isFilled ? 'currentColor' : 'none'}
                className={isFilled ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}
              />
            </button>
          )
        }

        return (
          <Star
            key={idx}
            size={size}
            fill={isFilled ? 'currentColor' : 'none'}
            className={isFilled ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}
          />
        )
      })}
    </div>
  )
}
