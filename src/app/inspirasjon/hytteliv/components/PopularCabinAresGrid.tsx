import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import { cn } from '@/lib/utils/className'
import { MapPinIcon } from 'lucide-react'
import type { Destination } from '../types'

export const popularAreasData: Destination[] = [
  {
    name: 'Trysil og Hemsedal',
    season: 'Vinter og vår',
    highlight: 'Varme etter skituren',
    bgColor: 'bg-ancient-water',
    iconBgColor: 'bg-ancient-water-light',
    iconColor: 'text-maritime-darkest',
    textColor: 'text-maritime-darkest'
  },
  {
    name: 'Sørlandskysten',
    season: 'Sommer',
    highlight: 'Varme på kjølige sommerkvelder',
    bgColor: 'bg-dusted-peri',
    iconBgColor: 'bg-dusted-peri-light',
    iconColor: 'text-maritime-darkest',
    textColor: 'text-cloud-dancer'
  },
  {
    name: 'Hafjell og Geilo',
    season: 'Hele året',
    highlight: 'Komfort i fjellet, hele året',
    bgColor: 'bg-overcast',
    iconBgColor: 'bg-overcast-light',
    iconColor: 'text-maritime-darkest',
    textColor: 'text-maritime-darkest'
  },
  {
    name: 'Hardanger',
    season: 'Vår og høst',
    highlight: 'Nyt fjordutsikten lenger',
    bgColor: 'bg-bleached-mauve',
    iconBgColor: 'bg-bleached-mauve-light',
    iconColor: 'text-maritime-darkest',
    textColor: 'text-maritime-darkest'
  }
]

export function PopularCabinAreasGrid({ destinations }: { destinations: Destination[] }) {
  return (
    <section className='bg-havdyp py-24 text-cloud-dancer'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-3xl lg:max-w-4xl text-center'>
          <h2 className='text-cloud-dancer'>
            <span className='block'>Populære hytteområder</span>
            <span className='inline-flex items-baseline justify-center gap-x-[0.18em] whitespace-nowrap'>
              <span>med</span>
              <UtekosWordmark
                className='h-[0.78em] w-auto shrink-0 translate-y-[0.06em]'
                style={{ color: 'var(--cloud-dancer)' }}
              />
            </span>
          </h2>
          <p className='mt-4 utekos-section-lead text-cloud-dancer'>
            Fra fjell til fjord får du mer tid ute, også når temperaturen faller.
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
                className={cn(
                  'border-cloud-dancer/18 py-0 shadow-[0_24px_58px_-42px_rgba(14,18,35,0.62)] transition-[border-color,box-shadow] hover:border-cloud-dancer/28 hover:shadow-[0_28px_64px_-40px_rgba(14,18,35,0.68)]',
                  destination.bgColor
                )}
              >
                <CardContent className='p-6'>
                  <div className='mb-3 flex items-center gap-3'>
                    <div
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-full',
                        destination.iconBgColor
                      )}
                    >
                      <MapPinIcon className={cn('size-4', destination.iconColor)} aria-hidden />
                    </div>
                    <h3
                      className={cn(
                        'min-w-0 flex-1 text-lg font-semibold leading-[1.15] tracking-tight',
                        destination.textColor
                      )}
                    >
                      {destination.name}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      'mb-2 font-utekos-text text-sm italic leading-[1.45] tracking-tight opacity-82',
                      destination.textColor
                    )}
                  >
                    {destination.season}
                  </p>
                  <p
                    className={cn(
                      'font-utekos-text text-base leading-[1.45] tracking-tight',
                      destination.textColor
                    )}
                  >
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
