'use client'

import ComfyRainy from '@public/comfy_rainy.webp'
import ComfyRobe from '@public/comfyrobe.webp'
import Image from 'next/image'
import { useRef } from 'react'
import Fade from 'embla-carousel-fade'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { AnimatedBlock } from '@/components/AnimatedBlock'

export function ComfyrobeImageCarousel() {
  const fadePlugin = useRef(Fade())

  return (
    <AnimatedBlock className='will-animate-fade-in-left'>
      <Carousel
        plugins={[fadePlugin.current]}
        opts={{ loop: true }}
        className='w-full rounded-2xl shadow-2xl'
      >
        <CarouselContent className='relative aspect-[3/4]'>
          <CarouselItem className='absolute inset-0'>
            <div className='relative h-full w-full'>
              <Image
                src={ComfyRobe}
                alt='Person som nyter en kaffekopp på hytta iført en Comfyrobe.'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 50vw'
                priority
              />
            </div>
          </CarouselItem>
          <CarouselItem className='absolute inset-0'>
            <div className='relative h-full w-full'>
              <Image
                src={ComfyRainy}
                alt='Comfyrobe som tåler regnvær, vist i et norsk kystlandskap.'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 50vw'
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </AnimatedBlock>
  )
}
