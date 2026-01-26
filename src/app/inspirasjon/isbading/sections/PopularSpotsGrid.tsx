// Path: src/app/inspirasjon/isbading/sections/PopularSpotsGrid.tsx

import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { MapPinIcon } from 'lucide-react'
import type { Destination } from '../types'

export const popularSpotsData: Destination[] = [
  {
    name: 'Oslofjorden & Sauna',
    season: 'Hele året',
    highlight: 'Kombinasjon av badstu og fjord',
    color: 'text-orange-400'
  },
  {
    name: 'Lofoten & Arktis',
    season: 'Vinter',
    highlight: 'Det ultimate isbadet i nordlys',
    color: 'text-cyan-400'
  },
  {
    name: 'Fjellvann & Innlandet',
    season: 'Vinter/Vår',
    highlight: 'Hugg hull i isen for stillhet',
    color: 'text-blue-500'
  },
  {
    name: 'Vestlandskysten',
    season: 'Høst/Vinter',
    highlight: 'Røft vær og friskt hav',
    color: 'text-slate-400'
  }
]

export function PopularSpotsGrid({
  destinations
}: {
  destinations: Destination[]
}) {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Hvor tar du ditt neste dykk?
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Fra urbane badstuer til øde fjellvann – Utekos er med deg der vannet
            er kaldt.
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
              <Card className='border-neutral-800 bg-sidebar-foreground transition-colors hover:bg-sidebar-foreground/80'>
                <CardContent className='p-6'>
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
