// Path: src/SpecialOfferSection/SpecialOfferImageSection.tsx

'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import specialEditionImage from '@public/special/kate.jpg'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'

export function SpecialOfferImageSection() {
  const [ref, isInView] = useInView({ threshold: 0.5 })

  return (
    <div
      ref={ref}
      className={cn(
        'will-animate-fade-in-scale relative flex h-auto items-center justify-center',
        isInView && 'is-in-view'
      )}
    >
      <Carousel className='w-full overflow-hidden rounded-2xl'>
        <CarouselContent>
          <CarouselItem>
            <div className='w-full'>
              <AspectRatio ratio={2 / 3} className='bg-transparent'>
                <Image
                  src={specialEditionImage}
                  alt='Utekos Special Edition'
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
              <AspectRatio ratio={2 / 3} className='bg-transparent'>
                <Image
                  src='/special_bag.webp'
                  alt='Inkludert Utekos-bag'
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
