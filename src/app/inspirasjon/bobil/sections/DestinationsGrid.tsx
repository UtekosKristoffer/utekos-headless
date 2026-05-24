import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
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
          <h2 className='text-fluid-display font-brand-sans inline-flex flex-wrap items-baseline justify-center gap-x-[0.18em] leading-[0.95] font-bold tracking-[-0.01em] text-cloud-dancer'>
            <span>Populære destinasjoner med</span>
            <UtekosWordmark className='h-[0.78em] w-auto translate-y-[0.06em]' />
          </h2>
          <p className='font-utekos-text mt-4 text-lg leading-[1.45] tracking-[-0.02em] text-cloud-dancer'>
            Norges vakreste bobildestinasjoner venter – nyt dem i komfort hele
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
                className='@container group relative h-full overflow-hidden border-cloud-dancer/12 bg-dusted-peri transition-colors hover:bg-dusted-purple focus-within:ring-1 focus-within:ring-primary-button/35'
                tabIndex={-1}
              >
                <div className='pointer-events-none absolute inset-0 opacity-15 transition-opacity duration-300 group-hover:opacity-25'>
                  <div className='absolute inset-0 bg-gradient-to-br from-cloud-dancer/6 via-transparent to-transparent' />
                </div>

                <CardContent className='relative p-6'>
                  <div className='mb-4 flex items-start justify-between'>
                    <h3 className='font-brand-sans text-lg leading-[1] font-bold tracking-[-0.01em] text-cloud-dancer'>
                      {destination.name}
                    </h3>
                    <MapPinIcon className={`size-5 ${destination.color}`} />
                  </div>
                  <div className='mb-3'>
                    <BrandBadge
                      label={destination.season}
                      backgroundColor='var(--color-cloud-dancer)'
                      textColor='var(--color-maritime-darkest)'
                    />
                  </div>
                  <p className='font-utekos-text text-sm leading-[1.45] tracking-[-0.02em] text-cloud-dancer'>
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
