// Path: src/app/om-oss/Sections/FindUsSection.tsx

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { MapPinIcon } from 'lucide-react'
import Image from 'next/image'

type PastEvent = {
  name: string
  location: string
  date: string
}

const pastEvents: PastEvent[] = [
  {
    name: 'Boligmesse Sotra',
    location: 'Sotra',
    date: '21.–23. mars 2025'
  },
  {
    name: 'Smien, Laksevåg',
    location: 'Bergen',
    date: '3.–4. desember 2022'
  },
  {
    name: 'Båt- og caravan messe',
    location: 'Ålesund',
    date: '3.-5. mars 2023'
  }
]

const fairImages = ['/messe-1.webp', '/messe-2.webp', '/erling-messe.JPEG', '/messe-3.webp'] as const

export function FindUsSection() {
  return (
    <section className='relative isolate overflow-hidden bg-overcast py-24 text-havdyp sm:py-32'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-[6%] top-20 size-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ancient-water)_58%,transparent)_0%,transparent_72%)] blur-3xl' />
        <div className='absolute bottom-12 right-[8%] size-80 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--very-peri)_22%,transparent)_0%,transparent_72%)] blur-3xl' />
      </div>

      <div className='container mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-16 lg:grid-cols-2'>
          <AnimatedBlock className='will-animate-fade-in-left' delay='0s' threshold={0.3}>
            <BrandBadge
              label='Møteplasser'
              backgroundColor='var(--background)'
              textColor='var(--cloud-dancer)'
              className='mb-6 shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--cloud-dancer)_80%,transparent)]'
            />
            <h2 className='mb-6 text-4xl leading-[0.95] font-bold font-google-sans   text-background sm:text-5xl'>
              Der du har møtt oss
            </h2>
            <p className='mb-10 text-lg leading-text-paragraph     text-background'>
              Vi elsker å prate med folk – derfor er vi jevnlig på messer og stands. Her er noen av stedene du
              kan ha truffet oss, og hvor vi har fått verdifulle innspill fra kunder som faktisk har kjent
              komforten.
            </p>

            <div className='space-y-6'>
              {pastEvents.map(event => (
                <div key={`${event.name}-${event.date}`} className='group flex items-start gap-5'>
                  <div className='flex size-12 shrink-0 items-center justify-center rounded-full border border-havdyp/14 bg-havdyp text-foreground transition-transform duration-300 group-hover:scale-105'>
                    <MapPinIcon className='size-5' strokeWidth={2} />
                  </div>

                  <div className='pt-1'>
                    <h3 className='mb-1 text-xl leading-nonefont-semibold   text-background'>{event.name}</h3>
                    <p className='text-sm leading-text-paragraph font-medium   text-background/80'>
                      {event.location}
                      <span className='mx-2 text-havdyp'>•</span>
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedBlock>

          {/* Right column: carousel */}
          <AnimatedBlock className='will-animate-fade-in-right' delay='0.1s' threshold={0.3}>
            <div className='relative'>
              <div className='absolute -inset-4 -rotate-2 rounded-sm bg-cloud-dancer/38' />

              <Carousel className='relative overflow-hidden rounded-sm border border-cloud-dancer/65 bg-cloud-dancer shadow-2xl shadow-havdyp/10'>
                <CarouselContent>
                  {fairImages.map((src, index) => (
                    <CarouselItem key={src}>
                      <div className='relative aspect-[4/3]'>
                        <Image
                          src={src}
                          alt={`Bilde fra stand eller messe ${index + 1}`}
                          fill
                          className='object-cover'
                          sizes='(max-width: 1024px) 90vw, 45vw'
                          priority={false}
                        />
                        <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/52 to-transparent' />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className='left-4 border-cloud-dancer/80 bg-cloud-dancer/92 text-havdyp shadow-md hover:border-very-peri hover:bg-very-peri hover:text-background' />
                <CarouselNext className='right-4 border-cloud-dancer/80 bg-cloud-dancer/92 text-havdyp shadow-md hover:border-very-peri hover:bg-very-peri hover:text-background' />
              </Carousel>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
