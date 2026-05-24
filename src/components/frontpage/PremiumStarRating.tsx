// Path: src/components/frontpage/PremiumStarRating.tsx

import React from 'react'
import { PremiumStar } from './PremiumStar'

interface PremiumStarRatingProps {
  rating: number
  cardIndex: number
}

export function PremiumStarRating({
  rating,
  cardIndex
}: PremiumStarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
  const baseSeed = (cardIndex + 1) * 100
  const ratingLabel = `${rating} av 5 stjerner`

  return (
    <div
      className='relative flex items-center gap-1'
      role='img'
      aria-label={ratingLabel}
    >
      {stars.map(starIndex => {
        const isHalf = rating + 0.5 === starIndex
        const isFull = rating >= starIndex
        const starSeed = baseSeed + starIndex * 13

        return (
          <PremiumStar
            key={starIndex}
            isFull={isFull}
            isHalf={isHalf}
            seed={starSeed}
          />
        )
      })}
    </div>
  )
}
