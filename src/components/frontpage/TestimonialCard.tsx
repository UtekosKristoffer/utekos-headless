// Path: src/components/frontpage/TestimonialCard.tsx
'use client'

import React from 'react'
import { Quote } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'
import { PremiumStarRating } from './PremiumStarRating'
import type { Testimonial } from '@/components/frontpage/utils/testimonials'

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const [cardRef, cardInView] = useInView({ threshold: 0.2 })
  const [lineRef, lineInView] = useInView({ threshold: 0.5 })
  const cardDelay = `${0.2 + (index % 3) * 0.15}s`
  const lineDelay = `${0.1 + (index % 3) * 0.1}s`

  return (
    <div
      ref={cardRef}
      className={cn(
        'will-animate-fade-in-up relative flex flex-col group',
        cardInView && 'is-in-view'
      )}
      style={{ '--transition-delay': cardDelay } as React.CSSProperties}
    >
      <div className='absolute -top-12 left-8 h-12 w-0.5 md:left-10 z-0'>
        <div
          ref={lineRef}
          className={cn(
            'will-animate-scale-y h-full w-full origin-top bg-gradient-to-b from-neutral-800 to-sky-900/40 transition-transform duration-700 ease-out',
            lineInView ? 'scale-y-100' : 'scale-y-0'
          )}
          style={{ '--transition-delay': lineDelay } as React.CSSProperties}
        />
      </div>

      <div className='relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 backdrop-blur-md transition-all duration-500 hover:border-sky-500/30 hover:bg-neutral-900/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-900/10'>
        <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none' />

        <Quote className='absolute top-6 right-6 w-16 h-16 text-neutral-800/30 rotate-12 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110' />

        <div className='relative z-10 flex flex-col h-full'>
          <blockquote className='flex-grow mb-8'>
            <p className='text-base md:text-lg leading-relaxed text-neutral-200 font-light italic'>
              &quot;{testimonial.quote}&quot;
            </p>
          </blockquote>

          <footer className='mt-auto pt-6 border-t border-neutral-800/80 flex items-center justify-between'>
            <div className='flex flex-col gap-2'>
              <p className='font-bold text-white text-sm tracking-wide'>
                {testimonial.name}
              </p>

              <PremiumStarRating
                rating={testimonial.rating}
                cardIndex={index}
              />
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
