// Path: src/app/om-oss/Sections/FindUsSection.tsx

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
}

// Fjernet individuelle farger for et roligere, mer eksklusivt uttrykk
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

const fairImages = [
  '/messe-1.webp',
  '/messe-2.webp',
  '/erling-messe.JPEG',
  '/messe-3.webp'
] as const

export function FindUsSection() {
  return (
    <section className='py-24 sm:py-32 bg-[#F9F8F6] text-[#2C2420]'>
      <div className='container mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-16 lg:grid-cols-2'>
          
          {/* Venstre kolonne: Tekst og liste */}
          <AnimatedBlock
            className='will-animate-fade-in-left'
            delay='0s'
            threshold={0.3}
          >
            <span className='text-[#E07A5F] font-bold tracking-[0.2em] uppercase text-xs block mb-4'>
              Møteplasser
            </span>
            <h2 className='text-4xl font-serif font-medium text-[#2C2420] sm:text-5xl mb-6'>
              Der du har møtt oss
            </h2>
            <p className='text-lg leading-relaxed text-[#2C2420]/70 font-light mb-10'>
              Vi elsker å prate med folk – derfor er vi jevnlig på messer og
              stands. Her er noen av stedene du kan ha truffet oss, og hvor vi
              har fått verdifulle innspill fra kunder som faktisk har kjent
              komforten.
            </p>
            
            <div className='space-y-6'>
              {pastEvents.map(event => (
                <div key={`${event.name}-${event.date}`} className='flex gap-5 items-start group'>
                  {/* Ikon boks - Varmere stil */}
                  <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E07A5F]/20 bg-[#E07A5F]/5 text-[#E07A5F] group-hover:bg-[#E07A5F] group-hover:text-white transition-colors duration-300'>
                    <MapPinIcon className='h-5 w-5' strokeWidth={2} />
                  </div>
                  
                  <div className='pt-1'>
                    <h3 className='font-serif text-xl text-[#2C2420] mb-1'>
                      {event.name}
                    </h3>
                    <p className='text-sm text-[#2C2420]/60 uppercase tracking-wider font-medium'>
                      {event.location} <span className='mx-2 text-[#E07A5F]'>•</span> {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedBlock>

          {/* Høyre kolonne: Karusell */}
          <AnimatedBlock
            className='will-animate-fade-in-right'
            delay='0.1s'
            threshold={0.3}
          >
            <div className='relative'>
              {/* Dekorativ ramme bak */}
              <div className='absolute -inset-4 bg-[#2C2420]/5 rounded-sm -rotate-2 transform' />
              
              <Carousel className='relative rounded-sm overflow-hidden shadow-2xl shadow-[#2C2420]/10'>
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
                        {/* Gradient overlay i bunn for dybde */}
                        <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent' />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Custom styling på piler */}
                <CarouselPrevious className='left-4 bg-white/90 text-[#2C2420] hover:bg-[#E07A5F] hover:text-white border-none shadow-md' />
                <CarouselNext className='right-4 bg-white/90 text-[#2C2420] hover:bg-[#E07A5F] hover:text-white border-none shadow-md' />
              </Carousel>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}