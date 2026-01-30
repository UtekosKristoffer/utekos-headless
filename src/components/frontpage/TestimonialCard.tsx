// Path: src/components/frontpage/TestimonialCard.tsx
'use client'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'

export const testimonials = [
  {
    quote:
      'Veldig fin passform og kvalitet! Blir deilig å ha ute på hytta og gjør at utesesongen på terrassen kan starte enda tidligere! Blir nok kjøpt inn noen flere.',
    name: 'Heidi',
    context: 'Hytteeier - Utekos TechDown™'
  },
  {
    quote:
      'Etter en hyggelig prat med kundeservice fikk vi tilpasset Utekosen perfekt. Varm og god, samtidig som den er veldig lett og heldekkende med hette. Holder deg varm fra hode til tå.',
    name: 'Knut Arne N.',
    context: 'Verifisert kjøper'
  },
  {
    quote:
      'Helt genialt å dra frem i veldig mange situasjoner. Raskt og problemfritt, akkurat som lovet. Anbefales på det sterkeste!',
    name: 'Mathias',
    context: 'Fornøyd kunde'
  },
  {
    quote:
      'Enkelt å bestille, rask levering og flott produkt! Veldig fornøyd med hele kjøpsopplevelsen. 😊👍',
    name: 'Karin H.',
    context: 'Verifisert kjøper'
  },
  {
    quote: 'Kona ble kjempefornøyd! Enkel handel og rask levering.',
    name: 'Richard R.',
    context: 'Gavekjøper'
  },
  {
    quote:
      'Super utekosdress 🤩 Helt fin passform og fulgte med dunkåpen jeg bestilte.',
    name: 'Synnøve K.',
    context: 'Verifisert kjøper'
  }
]

export function TestimonialCard({
  testimonial,
  index
}: {
  testimonial: (typeof testimonials)[0]
  index: number
}) {
  const [cardRef, cardInView] = useInView({ threshold: 0.2 })
  const [lineRef, lineInView] = useInView({ threshold: 0.5 })

  return (
    <div
      ref={cardRef}
      className={cn(
        'will-animate-fade-in-up relative flex flex-col',
        cardInView && 'is-in-view'
      )}
      style={
        {
          '--transition-delay': `${0.2 + (index % 3) * 0.15}s`
        } as React.CSSProperties
      }
    >
      {/* Vertikal koblingslinje */}
      <div className='absolute -top-12 left-8 h-12 w-0.5 md:left-4'>
        <div
          ref={lineRef}
          className={cn(
            'will-animate-scale-y h-full w-full origin-top bg-neutral-800 transition-transform duration-700 ease-out',
            lineInView ? 'scale-y-100' : 'scale-y-0'
          )}
          style={
            {
              '--transition-delay': `${0.1 + (index % 3) * 0.1}s`
            } as React.CSSProperties
          }
        />
      </div>

      <div className='flex h-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/40 p-8 backdrop-blur-sm transition-colors hover:border-neutral-700'>
        <blockquote className='flex-grow text-base leading-relaxed text-foreground/90'>
          <p>&quot;{testimonial.quote}&quot;</p>
        </blockquote>
        <footer className='mt-6 border-t border-neutral-800 pt-4'>
          <p className='font-semibold text-foreground'>{testimonial.name}</p>
          <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
            {testimonial.context}
          </p>
        </footer>
      </div>
    </div>
  )
}
