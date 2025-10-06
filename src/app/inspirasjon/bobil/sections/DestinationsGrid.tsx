import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { MapPinIcon } from '@heroicons/react/24/outline'
import type { Destination } from '../types'

export function DestinationsGrid({
  destinations
}: {
  destinations: Destination[]
}) {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Populære destinasjoner med Utekos
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Norges vakreste bobildestinasjoner venter - nyt dem i komfort hele
            sesongen
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {destinations.map((destination, destinationIndex) => (
            <AnimatedBlock
              key={destination.name}
              className='will-animate-fade-in-up'
              delay={`${destinationIndex * 0.1}s`}
              threshold={0.2}
            >
              <Card
                className='@container group relative h-full overflow-hidden border-neutral-800 bg-sidebar-foreground transition-colors hover:bg-sidebar-foreground/80 focus-within:ring-1 focus-within:ring-primary/30'
                tabIndex={-1}
              >
                {/* Diskré bakgrunnsforsterker: subtil gradient-overlay som øker litt på hover */}
                <div className='pointer-events-none absolute inset-0 opacity-15 transition-opacity duration-300 group-hover:opacity-25'>
                  <div className='absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent' />
                </div>

                {/* Svakt indre “glow” ved hover/focus for bedre affordance uten kraftig bevegelse */}
                <div className='pointer-events-none absolute inset-0 rounded-[inherit] ring-0 transition-[box-shadow] duration-300 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_6px_18px_rgba(0,0,0,0.25)]' />

                <CardContent className='relative p-6'>
                  <div className='mb-3 flex items-start justify-between'>
                    <h3 className='text-lg font-semibold'>
                      {destination.name}
                    </h3>
                    <MapPinIcon className={`size-5 ${destination.color}`} />
                  </div>
                  <p className='mb-2 text-sm text-muted-foreground'>
                    {destination.season}
                  </p>
                  <p className='text-sm text-foreground/80'>
                    {destination.highlight}
                  </p>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
