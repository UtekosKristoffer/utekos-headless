// Path: src/components/ComfyrobeSection/ComfyrobeImageSection.tsx

'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'
import ComfyrobeProductImage from '@public/comfyrobe/monica-arne-comfy.png'
export function ComfyrobeImageSection() {
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
              <AspectRatio ratio={1 / 1} className='bg-transparent'>
                <Image
                  src={ComfyrobeProductImage}
                  alt='Comfyrobe™ - Vanntett og vindtett robe'
                  height={1080}
                  width={1080}
                  className='object-cover transition-transform duration-500 hover:scale-105'
                  sizes='(max-width: 1024px) 80vw, 40vw'
                  quality={100}
                  priority
                />
              </AspectRatio>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  )
}
