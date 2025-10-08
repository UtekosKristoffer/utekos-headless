'use client'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'

export const testimonials = [
  {
    quote:
      'Kjøpte en i dun for to år siden, tror det har vært et av de mest praktiske plaggene jeg har, utrolig herlig når man sitter rundt bålpanna i opptil flere kuldegrader og i tillegg er den vannavstøtende.',
    name: 'Victor H.',
    context: 'Livsnyter, Bergen'
  },
  {
    quote:
      'Endelig et plagg som forstår bobil-livet. Lett å slenge på seg og helt genial for å holde varmen på kjølige stopp underveis. Kvaliteten kjennes i hver søm.',
    name: 'Bjørn H.',
    context: 'Bobilentusiast'
  },
  {
    quote:
      'Er veldig fornøyd med produktet. Liker godt at det både er vannavstøtende og vindtett. Herlig i vårsolen😎',
    name: 'Kristin',
    context: 'Hytteeier'
  }
]

export function TestimonialCard({
  testimonial,
  index
}: {
  testimonial: (typeof testimonials)[0]
  index: number
}) {
  const [cardRef, cardInView] = useInView({ threshold: 0.5 })
  const [lineRef, lineInView] = useInView({ threshold: 1 })

  return (
    <div
      ref={cardRef}
      className={cn(
        'will-animate-fade-in-up relative flex flex-col',
        cardInView && 'is-in-view'
      )}
      style={
        {
          '--transition-delay': `${0.5 + index * 0.2}s`
        } as React.CSSProperties
      }
    >
      {/* Vertikal koblingslinje */}
      <div className='absolute -top-12 left-4 h-12 w-0.5'>
        <div
          ref={lineRef}
          className={cn(
            'will-animate-scale-y h-full w-full bg-neutral-800',
            lineInView && 'is-in-view'
          )}
          style={
            {
              '--transition-delay': `${0.4 + index * 0.2}s`
            } as React.CSSProperties
          }
        />
      </div>

      <div className='flex h-full flex-col rounded-xl bg-sidebar-foreground p-8'>
        <blockquote className='flex-grow text-base text-foreground/90'>
          <p>&quot;{testimonial.quote}&quot;</p>
        </blockquote>
        <footer className='mt-6'>
          <p className='font-semibold'>{testimonial.name}</p>
          <p className='text-sm text-muted-foreground'>{testimonial.context}</p>
        </footer>
      </div>
    </div>
  )
}
