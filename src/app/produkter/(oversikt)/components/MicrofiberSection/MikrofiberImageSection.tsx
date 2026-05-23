// Path: src/app/produkter/(oversikt)/components/MicrofiberSection/MikrofiberImageSection.tsx

'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'
import MikroPicFront from '@public/mikro-front-hvit-bakgrunn-1080.png'
import MikroPicBack from '@public/mikro-bak-1080.png'
import LinnKate from '@public/katelinn.png'

export function MikrofiberImageSection() {
  const [ref, isInView] = useInView({ threshold: 0.5 })

  return (
    <div
      ref={ref}
      className={cn(
        'will-animate-fade-in-scale relative h-full min-h-full',
        isInView && 'is-in-view'
      )}
    >
      <Carousel
        className='h-full w-full overflow-hidden rounded-[1.35rem] border border-maritime-darkest/10 bg-maritime-darkest/5 shadow-[0_24px_70px_-48px_color-mix(in_oklch,var(--maritime-darkest)_72%,transparent)]'
        opts={{ align: 'start', loop: true }}
      >
        <CarouselContent className='h-full'>
          <CarouselItem className='h-full'>
            <div className='relative aspect-square w-full overflow-hidden bg-maritime-darkest/5 lg:h-full lg:min-h-[34rem] lg:aspect-auto'>
              <Image
                src={LinnKate}
                alt='Utekos Mikrofiber™ - Lettvekt og allsidig'
                fill
                className='object-cover transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100'
                sizes='(max-width: 1024px) 92vw, 40vw'
                priority
              />
            </div>
          </CarouselItem>

          <CarouselItem className='h-full'>
            <div className='relative aspect-square w-full overflow-hidden bg-cloud-dancer lg:h-full lg:min-h-[34rem] lg:aspect-auto'>
              <Image
                src={MikroPicFront}
                alt='Utekos Mikrofiber™ - Forsiden'
                fill
                className='object-cover transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100'
                sizes='(max-width: 1024px) 92vw, 40vw'
              />
            </div>
          </CarouselItem>

          <CarouselItem className='h-full'>
            <div className='relative aspect-square w-full overflow-hidden bg-cloud-dancer lg:h-full lg:min-h-[34rem] lg:aspect-auto'>
              <Image
                src={MikroPicBack}
                alt='Utekos Mikrofiber™ - Baksiden'
                fill
                className='object-cover transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100'
                sizes='(max-width: 1024px) 92vw, 40vw'
              />
            </div>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious className='left-4 hidden border-maritime-darkest/10 bg-cloud-dancer/86 text-maritime-darkest backdrop-blur-md hover:bg-primary-button focus-visible:ring-primary-button/70 sm:inline-flex' />
        <CarouselNext className='right-4 hidden border-maritime-darkest/10 bg-cloud-dancer/86 text-maritime-darkest backdrop-blur-md hover:bg-primary-button focus-visible:ring-primary-button/70 sm:inline-flex' />
      </Carousel>
    </div>
  )
}
