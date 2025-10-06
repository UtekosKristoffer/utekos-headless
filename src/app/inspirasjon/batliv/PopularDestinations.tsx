// Path: src/app/inspirasjon/batliv/BoatingClientComponents.tsx

import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { MapPinIcon } from 'lucide-react'

interface Destination {
  name: string
  season: string
  highlight: string
  color: string
}

export const popularDestinationsData: Destination[] = [
  {
    name: 'Sørlandskysten',
    season: 'Sommer',
    highlight: 'For sene kvelder i uthavn',
    color: 'text-amber-400'
  },
  {
    name: 'Vestlandskysten',
    season: 'Vår/Sommer',
    highlight: 'Perfekt i uforutsigbart vær',
    color: 'text-emerald-500'
  },
  {
    name: 'Oslofjorden',
    season: 'Vår/Høst',
    highlight: 'Forleng pendlersesongen',
    color: 'text-blue-500'
  },
  {
    name: 'Helgelandskysten',
    season: 'Sommer',
    highlight: 'For lyse, men kjølige netter',
    color: 'text-cyan-400'
  }
]

export function PopularDestinations({
  destinations
}: {
  destinations: Destination[]
}) {
  return (
    <section className='py-24 bg-background' id='populære-destinasjoner'>
      <div className='container mx-auto px-4'>
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
                    <MapPinIcon className={`h-5 w-5 ${destination.color}`} />
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
