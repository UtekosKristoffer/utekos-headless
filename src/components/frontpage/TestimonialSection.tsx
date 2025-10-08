'use client'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'
import { TestimonialCard, testimonials } from './TestimonialCard'
export function TestimonialSection() {
  const [hLineRef, hLineInView] = useInView({ threshold: 0.5 })

  return (
    <>
      <div className='relative'>
        {/* Horisontal "Databus"-linje */}
        <div
          ref={hLineRef}
          className={cn(
            'will-animate-scale-x absolute top-4 left-0 h-0.5 w-full bg-gradient-to-r from-blue-500 via-pink-500 to-green-500',
            hLineInView && 'is-in-view'
          )}
          style={{ '--transition-delay': '0.2s' } as React.CSSProperties}
        />
      </div>
      <div className='grid grid-cols-1 gap-x-8 gap-y-16 pt-16 lg:grid-cols-3'>
        {testimonials.map((testimonial, i) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
            index={i}
          />
        ))}
      </div>
    </>
  )
}
