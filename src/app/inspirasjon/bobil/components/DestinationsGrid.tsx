import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { MapPinIcon } from '@heroicons/react/24/outline'
import type { Destination } from '../types'
import { bobilDestinationCardTheme } from '../utils/destinationCardThemes'

export function DestinationsGrid({ destinations }: { destinations: Destination[] }) {
  return (
    <section className='bg-overcast py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-3xl md:max-w-4xl text-center'>
          <h2 className='text-fluid-display-bold text-background'>
            <span className='block'>Populære destinasjoner</span>
            <span className='mt-[0.08em] inline-flex items-baseline justify-center gap-x-[0.18em] whitespace-nowrap'>
              <span>med</span>
              <UtekosWordmark
                className='h-[0.78em] w-auto shrink-0 translate-y-[0.06em]'
                style={{ color: 'var(--background)' }}
              />
            </span>
          </h2>

          <p className='mx-auto mt-4 max-w-xl utekos-section-lead text-background/82'>
            Norges vakreste bobildestinasjoner venter — nyt dem i komfort hele sesongen
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {destinations.map((destination, destinationIndex) => {
            const theme = bobilDestinationCardTheme

            return (
              <AnimatedBlock
                key={destination.name}
                className='will-animate-fade-in-up'
                delay={`${destinationIndex * 0.08}s`}
                rootMargin='0px 0px -8% 0px'
                threshold={0.18}
              >
                <Card
                  className={`@container group relative h-full overflow-hidden border ${theme.border} ${theme.surface} ${theme.text} transition-[transform,border-color] duration-300 ease-out motion-safe:hover:-translate-y-1`}
                >
                  <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                    <div className={`absolute inset-0 ${theme.glow}`} />
                    <div className='absolute inset-x-0 top-0 h-px bg-cloud-dancer/24' />
                  </div>

                  <CardContent className='relative flex h-full flex-col p-6'>
                    <div className='mb-5 flex items-center gap-4'>
                      <div
                        className='flex size-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5'
                        style={{ backgroundColor: `var(${destination.backgroundColor})` }}
                      >
                        <MapPinIcon
                          className={`size-5 transition-colors duration-300 ${destination.color}`}
                          aria-hidden
                        />
                      </div>
                      <h3 className={`text-xl tracking-[-0.01em] ${theme.text}`}>{destination.name}</h3>
                    </div>

                    <p className={`  mb-2 ${theme.mutedText}`}>{destination.highlight}</p>
                    <div className='mt-4'>
                      <BrandBadge
                        label={destination.season}
                        backgroundColor={theme.badgeBackground}
                        textColor={theme.badgeText}
                      />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedBlock>
            )
          })}
        </div>
      </div>
    </section>
  )
}
