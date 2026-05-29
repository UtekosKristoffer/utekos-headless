// Path: src/app/produkter/(oversikt)/components/ComfyrobeImageCarousel.tsx

'use client'

import ComfyRainy from '@public/comfy_rainy.webp'
import ComfyRobe from '@public/comfy-1600x1600.webp'
import Image from 'next/image'
import { useRef } from 'react'
import Fade from 'embla-carousel-fade'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { AnimatedBlock } from '@/components/AnimatedBlock'

export function ComfyrobeImageCarousel() {
  const fadePlugin = useRef(Fade())

  return (
    <AnimatedBlock className='will-animate-fade-in-left items-center place-items-center justify-center mx-auto size-full'>
      <Carousel
        plugins={[fadePlugin.current]}
        opts={{ loop: true }}
        className='w-full overflow-hidden rounded-[1.35rem] items-center justify-center mx-auto bg-maritime-darkest/60 shadow-[0_24px_70px_-48px_color-mix(in_oklch,var(--maritime-darkest)_90%,transparent)] size-full'
      >
        <CarouselContent className='relative aspect-square w-full'>
          <CarouselItem className='absolute inset-0 pl-0'>
            <div className='relative size-full overflow-hidden items-center justify-center mx-auto bg-[radial-gradient(circle_at_50%_28%,color-mix(in_oklch,var(--havdyp)_54%,var(--maritime-darkest)_46%)_0%,var(--maritime-darkest)_72%)]'>
              <Image
                src={ComfyRobe}
                alt='Comfyrobe produktbilde.'
                fill
                quality={95}
                className='mx-auto max-sm:ml-6 object-contain transition-transform duration-500 motion-reduce:translate-x-0 motion-reduce:scale-100 translate-x-0 scale-100 p-4'
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
                className='object-cover transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100'
                sizes='(max-width: 1024px) 92vw, 40vw'
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </AnimatedBlock>
  )
}
