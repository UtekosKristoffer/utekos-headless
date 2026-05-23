// Path: src/app/produkter/(oversikt)/components/ComfyrobeImageCarousel.tsx

'use client'

import ComfyRainy from '@public/comfy_rainy.webp'
import ComfyRobe from '@public/comfy-front.png'
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
    <AnimatedBlock className='will-animate-fade-in-left h-full min-h-full'>
      <Carousel
        plugins={[fadePlugin.current]}
        opts={{ loop: true }}
        className='h-full w-full overflow-hidden rounded-[1.35rem] border border-cloud-dancer/12 bg-maritime-darkest/60 shadow-[0_24px_70px_-48px_color-mix(in_oklch,var(--maritime-darkest)_90%,transparent)]'
      >
        <CarouselContent className='relative aspect-[4/5] h-full min-h-[32rem] lg:aspect-auto lg:min-h-[38rem]'>
          <CarouselItem className='absolute inset-0 pl-0'>
            <div className='relative size-full overflow-hidden bg-[radial-gradient(circle_at_50%_28%,color-mix(in_oklch,var(--maritime-blue)_54%,var(--maritime-darkest)_46%)_0%,var(--maritime-darkest)_72%)]'>
              <Image
                src={ComfyRobe}
                alt='Comfyrobe produktbilde.'
                fill
                quality={95}
                className='object-contain object-center p-6 transition-transform duration-500 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:p-8 lg:p-10'
                sizes='(max-width: 1024px) 92vw, 40vw'
              />
            </div>
          </CarouselItem>

          <CarouselItem className='absolute inset-0 pl-0'>
            <div className='relative size-full overflow-hidden bg-maritime-darkest'>
              <Image
                src={ComfyRainy}
                alt='Comfyrobe som tåler regnvær, vist i et norsk kystlandskap.'
                fill
                quality={95}
                className='object-cover object-center transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100'
                sizes='(max-width: 1024px) 92vw, 40vw'
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </AnimatedBlock>
  )
}
