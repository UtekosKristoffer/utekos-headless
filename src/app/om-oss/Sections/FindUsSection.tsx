// Path: src/app/(sections)/FindUsSection.tsx

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { MapPinIcon } from 'lucide-react'
import Image from 'next/image'

type PastEvent = {
  name: string
  location: string
  date: string
  color: string
}

const pastEvents: PastEvent[] = [
  {
    name: 'Boligmesse Sotra',
    location: 'Sotra',
    date: '21.–23. mars 2025',
    color: 'text-sky-800'
  },
  {
    name: 'Julestand Laksevåg Senter',
    location: 'Bergen',
    date: '18.–22. desember 2022',
    color: 'text-emerald-400'
  },
  {
    name: 'Ute & Fritid-dager',
    location: 'Åsane',
    date: 'Vår 2024',
    color: 'text-fuchsia-400'
  }
]

const fairImages = ['/messe-1.webp', '/messe-2.webp', '/messe-3.webp'] as const

export function FindUsSection() {
  return (
    <section className='py-24 sm:py-32'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-16 lg:grid-cols-2'>
          {/* Venstre kolonne: Tekst og gjennomførte besøk */}
          <AnimatedBlock
            className='will-animate-fade-in-left'
            delay='0s'
            threshold={0.3}
          >
            <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              Der du har møtt oss
            </h2>
            <p className='mt-6 text-lg leading-8 text-muted-foreground'>
              Vi elsker å prate med folk – derfor er vi jevnlig på messer og
              stands. Her er noen av stedene du kan ha truffet oss, og hvor vi
              har fått verdifulle innspill fra kunder som faktisk har kjent
              komforten.
            </p>
            <div className='mt-10 space-y-6'>
              {pastEvents.map(event => (
                <div key={`${event.name}-${event.date}`} className='flex gap-4'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-sidebar-foreground'>
                    <MapPinIcon className={`h-5 w-5 ${event.color}`} />
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground'>
                      {event.name}
                    </h3>
                    <p className='text-muted-foreground'>
                      {event.location} – {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedBlock>

          {/* Høyre kolonne: Bildekarusell fra stands/messer */}
          <AnimatedBlock
            className='will-animate-fade-in-right'
            delay='0.06s'
            threshold={0.3}
          >
            <Carousel className='rounded-xl border border-neutral-800'>
              <CarouselContent>
                {fairImages.map((src, index) => (
                  <CarouselItem key={src}>
                    <div className='relative aspect-[4/3]'>
                      <Image
                        src={src}
                        alt={`Bilde fra stand eller messe ${index + 1}`}
                        fill
                        className='rounded-xl object-cover'
                        sizes='(max-width: 1024px) 90vw, 45vw'
                        priority={false}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='left-4' />
              <CarouselNext className='right-4' />
            </Carousel>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
