import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import { MapPinIcon } from 'lucide-react'
import type { Destination } from '../types'

export const popularAreasData: Destination[] = [
  {
    name: 'Trysil & Hemsedal',
    season: 'Vinter og vår',
    highlight: 'Varme etter skituren',
    color: 'text-ancient-water'
  },
  {
    name: 'Sørlandskysten',
    season: 'Sommer',
    highlight: 'Varme på kjølige sommerkvelder',
    color: 'text-dusted-peri'
  },
  {
    name: 'Hafjell & Geilo',
    season: 'Hele året',
    highlight: 'Komfort i fjellet, hele året',
    color: 'text-mountain-view'
  },
  {
    name: 'Hardanger',
    season: 'Vår og høst',
    highlight: 'Nyt fjordutsikten lenger',
    color: 'text-bleached-mauve'
  }
]

export function PopularCabinAreasGrid({
  destinations
}: {
  destinations: Destination[]
}) {
  return (
    <section className='bg-demitasse py-24 text-cloud-dancer'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display inline-flex flex-col items-center justify-center gap-y-[0.2em] leading-[0.95] font-bold tracking-[-0.01em] text-cloud-dancer lg:flex-row lg:flex-wrap lg:items-baseline lg:gap-x-[0.18em] lg:gap-y-[0.08em]'>
            <span>Populære hytteområder med</span>
            <UtekosWordmark className='h-[0.78em] w-auto shrink-0 translate-y-0 lg:translate-y-[0.06em]' />
          </h2>
          <p className='mt-4 text-lg leading-[1.45] tracking-[-0.01em] text-cloud-dancer'>
            Fra fjell til fjord får du mer tid ute, også når temperaturen
            faller.
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
              <Card className='border-cloud-dancer/18 bg-cloud-dancer py-0 text-maritime-darkest shadow-[0_24px_58px_-42px_rgba(14,18,35,0.62)] transition-colors hover:bg-whispy-clouds'>
                <CardContent className='p-6'>
                  <div className='mb-3 flex items-start justify-between'>
                    <h3 className='text-lg leading-[1] font-semibold tracking-[-0.01em]'>
                      {destination.name}
                    </h3>
                    <MapPinIcon className={`size-5 ${destination.color}`} />
                  </div>
                  <p className='mb-2 text-sm leading-[1.45] tracking-[-0.01em] text-maritime-blue'>
                    {destination.season}
                  </p>
                  <p className='text-sm leading-[1.45] tracking-[-0.01em] text-maritime-darkest/78'>
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
