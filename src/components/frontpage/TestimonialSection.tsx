// Path: src/components/frontpage/TestimonialSection.tsx
'use client'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'
import { TestimonialCard, testimonials } from './TestimonialCard'

export function TestimonialSection() {
  const [hLineRef, hLineInView] = useInView({ threshold: 0.5 })

  return (
    <>
      <div className='relative mb-8'>
        <div
          ref={hLineRef}
          className={cn(
            'will-animate-scale-x absolute top-4 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-neutral-700 to-transparent transition-transform duration-1000 ease-out',
            hLineInView ? 'scale-x-100' : 'scale-x-0'
          )}
        />
      </div>

      <div className='grid grid-cols-1 gap-x-6 gap-y-12 px-4 pt-8 md:grid-cols-2 lg:grid-cols-3'>
        {testimonials.map((testimonial, i) => (
          <TestimonialCard
            key={`${testimonial.name}-${i}`}
            testimonial={testimonial}
            index={i}
          />
        ))}
      </div>
    </>
  )
}
