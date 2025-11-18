// Path: src/components/MikrofiberSection/MikrofiberImageSection.tsx

'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
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
        'will-animate-fade-in-scale relative',
        isInView && 'is-in-view'
      )}
    >
      <Carousel className='w-full overflow-hidden rounded-2xl'>
        <CarouselContent>
          <CarouselItem>
            <div className='w-full'>
              <AspectRatio ratio={1} className='bg-transparent'>
                <Image
                  src={LinnKate}
                  alt='Utekos Mikrofiber™ - Lettvekt og allsidig'
                  fill
                  className='object-cover transition-transform duration-500 hover:scale-105'
                  sizes='(max-width: 1024px) 80vw, 40vw'
                  priority
                />
              </AspectRatio>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className='w-full'>
              <AspectRatio ratio={1} className='bg-transparent'>
                <Image
                  src={MikroPicFront}
                  alt='Utekos Mikrofiber™ - Forsiden'
                  fill
                  className='object-cover transition-transform duration-500 hover:scale-105'
                  sizes='(max-width: 1024px) 80vw, 40vw'
                />
              </AspectRatio>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className='w-full'>
              <AspectRatio ratio={1} className='bg-transparent'>
                <Image
                  src={MikroPicBack}
                  alt='Utekos Mikrofiber™ - Baksiden'
                  fill
                  className='object-cover transition-transform duration-500 hover:scale-105'
                  sizes='(max-width: 1024px) 80vw, 40vw'
                />
              </AspectRatio>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='left-4 hidden sm:inline-flex' />
        <CarouselNext className='right-4 hidden sm:inline-flex' />
      </Carousel>
    </div>
  )
}
