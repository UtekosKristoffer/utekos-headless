// Path: src/components/frontpage/TestimonialCard.tsx
'use client'

import { Star, Quote } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'

// --- Updated Data with Ratings ---
export const testimonials = [
  {
    quote:
      'Veldig fin passform og kvalitet! Blir deilig å ha ute på hytta og gjør at utesesongen på terrassen kan starte enda tidligere! Blir nok kjøpt inn noen flere.',
    name: 'Heidi',
    rating: 5
  },
  {
    quote:
      'Etter en hyggelig prat med kundeservice fikk vi tilpasset Utekosen perfekt. Varm og god, samtidig som den er veldig lett og heldekkende med hette. Holder deg varm fra hode til tå.',
    name: 'Knut Arne N.',
    rating: 5
  },
  {
    quote:
      'Helt genialt å dra frem i veldig mange situasjoner. Raskt og problemfritt, akkurat som lovet. Anbefales på det sterkeste!',
    name: 'Mathias',
    rating: 5
  },
  {
    quote:
      'Enkelt å bestille, rask levering og flott produkt! Veldig fornøyd med hele kjøpsopplevelsen. 😊👍',
    name: 'Karin H.',
    rating: 5
  },
  {
    quote: 'Kona ble kjempefornøyd! Enkel handel og rask levering.',
    name: 'Richard R.',
    rating: 4.5 // Changed to 4.5 as requested
  },
  {
    quote:
      'Super utekosdress 🤩 Helt fin passform og fulgte med dunkåpen jeg bestilte.',
    name: 'Synnøve K.',
    rating: 5
  }
]

// --- Helper: Shimmering Star Component ---
function StarRating({ rating }: { rating: number }) {
  // Lager en array med 5 posisjoner
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <div
      className='relative flex items-center gap-1'
      aria-label={`${rating} av 5 stjerner`}
    >
      {/* Definer en CSS-animasjon for shimmer lokalt hvis den ikke finnes i config */}
      <style jsx>{`
        @keyframes shine-sweep {
          0% {
            transform: translateX(-150%) skewX(-25deg);
          }
          100% {
            transform: translateX(250%) skewX(-25deg);
          }
        }
        .star-shimmer {
          animation: shine-sweep 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {stars.map(starIndex => {
        const isHalf = rating + 0.5 === starIndex
        const isFull = rating >= starIndex

        return (
          <div key={starIndex} className='relative'>
            {/* Base: Grå stjerne (bakgrunn) */}
            <Star className='w-4 h-4 text-neutral-800 fill-neutral-800/50' />

            {/* Overlay: Gullstjerne (klippet for halv eller hel) */}
            {(isFull || isHalf) && (
              <div
                className={cn(
                  'absolute inset-0 overflow-hidden',
                  isHalf ? 'w-[50%]' : 'w-full'
                )}
              >
                <div className='relative'>
                  <Star className='w-4 h-4 text-amber-400 fill-amber-400' />

                  {/* Shimmer Effect: Et hvitt lys som sveiper over stjernen */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-[50%] h-full star-shimmer opacity-70 mix-blend-overlay pointer-events-none' />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

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
        'will-animate-fade-in-up relative flex flex-col group',
        cardInView && 'is-in-view'
      )}
      style={
        {
          '--transition-delay': `${0.2 + (index % 3) * 0.15}s`
        } as React.CSSProperties
      }
    >
      {/* Vertikal koblingslinje (Beholdt fra original for "constellation" følelsen) */}
      <div className='absolute -top-12 left-8 h-12 w-0.5 md:left-10 z-0'>
        <div
          ref={lineRef}
          className={cn(
            'will-animate-scale-y h-full w-full origin-top bg-gradient-to-b from-neutral-800 to-sky-900/40 transition-transform duration-700 ease-out',
            lineInView ? 'scale-y-100' : 'scale-y-0'
          )}
          style={
            {
              '--transition-delay': `${0.1 + (index % 3) * 0.1}s`
            } as React.CSSProperties
          }
        />
      </div>

      {/* --- Selve Kortet --- */}
      <div className='relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 backdrop-blur-md transition-all duration-500 hover:border-sky-500/30 hover:bg-neutral-900/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-900/10'>
        {/* Dekorativ Bakgrunnseffekt (Spotlight gradient) */}
        <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none' />

        {/* Stort Sitat-ikon i bakgrunnen for tekstur */}
        <Quote className='absolute top-6 right-6 w-16 h-16 text-neutral-800/30 rotate-12 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110' />

        {/* Innhold */}
        <div className='relative z-10 flex flex-col h-full'>
          <blockquote className='flex-grow mb-8'>
            <p className='text-base md:text-lg leading-relaxed text-neutral-200 font-light italic'>
              &quot;{testimonial.quote}&quot;
            </p>
          </blockquote>

          <footer className='mt-auto pt-6 border-t border-neutral-800/80 flex items-center justify-between'>
            <div className='flex flex-col gap-1.5'>
              <p className='font-bold text-white text-sm tracking-wide'>
                {testimonial.name}
              </p>

              {/* Viser nå stjerner i stedet for tekst */}
              <StarRating rating={testimonial.rating} />
            </div>

            {/* Valgfritt: Legg til en liten sirkel eller avatar-placeholder hvis ønskelig, 
                men her holder vi det rent med stjernene som fokus. */}
          </footer>
        </div>
      </div>
    </div>
  )
}
