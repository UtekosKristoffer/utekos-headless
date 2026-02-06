// Path: src/components/ui/PremiumStarRating.tsx
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

  return (
    <div
      className='relative flex items-center gap-1'
      aria-label={`${rating} av 5 stjerner`}
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
