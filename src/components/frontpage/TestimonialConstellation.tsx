'use client'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'

const testimonials = [
  {
    quote:
      'Har blitt min faste følgesvenn på hytta. Følelsen av å kunne sitte ute i en stjerneklar natt uten å tenke på kulden er rett og slett uvurderlig.',
    name: 'Kari L.',
    context: 'Hytteeier, Valdres'
  },
  {
    quote:
      'Endelig et plagg som forstår bobil-livet. Lett å slenge på seg og helt genial for å holde varmen på kjølige stopp underveis. Kvaliteten kjennes i hver søm.',
    name: 'Bjørn H.',
    context: 'Bobilentusiast'
  },
  {
    quote:
      'Kjøpte denne før sommeren, og den har forlenget utallige kvelder i båten med venner. Flere har spurt hvor den er fra. Verdt hver eneste krone.',
    name: 'Anne og Per',
    context: 'Båteiere'
  }
]

function TestimonialCard({
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

export function TestimonialConstellation() {
  const [hLineRef, hLineInView] = useInView({ threshold: 0.5 })

  return (
    <section className='mx-auto max-w-[95%] py-24 sm:py-32 md:max-w-7xl'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Hva sier andre livsnytere?
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
            Ekte tilbakemeldinger fra kunder som, i likhet med deg, verdsetter
            komfort og kvalitetstid.
          </p>
        </div>

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

          {/* Grid for testimoniene */}
          <div className='grid grid-cols-1 gap-x-8 gap-y-16 pt-16 lg:grid-cols-3'>
            {testimonials.map((testimonial, i) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
