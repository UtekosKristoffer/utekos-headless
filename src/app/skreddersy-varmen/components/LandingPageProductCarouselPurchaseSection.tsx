// Path: src/app/skreddersy-varmen/components/LandingPageProductCarouselPurchaseSection.tsx
'use client'

import Image from 'next/image'
import Fade from 'embla-carousel-fade'
import { cn } from '@/lib/utils/className'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { focusRing } from '../utils/constants'
import type { ModelKey, PRODUCT_VARIANTS } from '@/api/constants'

type LandingPageProductCarouselPurchaseSectionProps = {
  selectedModel: ModelKey
  currentConfig: (typeof PRODUCT_VARIANTS)[ModelKey]
}

export function LandingPageProductCarouselPurchaseSection({
  selectedModel,
  currentConfig
}: LandingPageProductCarouselPurchaseSectionProps) {
  return (
    <div className='relative flex w-full flex-col items-center justify-center bg-background min-[900px]:sticky min-[900px]:top-0 min-[900px]:h-[100svh] min-[900px]:self-start min-[900px]:p-8 min-[1280px]:p-12'>
      <BrandBadge
        key={`badge-${selectedModel}`}
        backgroundColor='var(--color-bleached-mauve)'
        textColor='var(--color-background)'
        className='absolute left-4 top-4 z-20 animate-in px-4 py-1.5 text-xs font-semibold tracking-normal shadow-md fade-in slide-in-from-left-2 duration-500 min-[900px]:left-8 min-[900px]:top-8 min-[1280px]:left-12 min-[1280px]:top-12'
      >
        <span className='whitespace-nowrap'>{currentConfig.badge}</span>
      </BrandBadge>

      <Carousel
        key={selectedModel}
        opts={{ loop: currentConfig.images.length > 1, duration: 35 }}
        plugins={currentConfig.images.length > 1 ? [Fade()] : []}
        className='relative w-full min-[900px]:max-w-xl'
      >
        <CarouselContent className='ml-0'>
          {currentConfig.images.map((src, i) => (
            <CarouselItem key={src} className='relative aspect-[4/5] pl-0'>
              <div className='relative h-full w-full overflow-hidden min-[900px]:rounded-2xl min-[900px]:shadow-2xl min-[900px]:ring-1 min-[900px]:ring-background/10'>
                <Image
                  src={src}
                  alt={`${currentConfig.title} – bilde ${i + 1}`}
                  fill
                  className='object-cover'
                  sizes='(max-width: 900px) 100vw, 40vw'
                  priority={i === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {currentConfig.images.length > 1 && (
          <>
            <CarouselPrevious
              aria-label='Forrige bilde'
              className={cn(
                'left-2 size-10 border-background/15 bg-cloud-dancer/90 text-background shadow-md backdrop-blur-md hover:bg-cloud-dancer hover:text-primary md:left-4 md:size-11',
                focusRing
              )}
            />
            <CarouselNext
              aria-label='Neste bilde'
              className={cn(
                'right-2 size-10 border-background/15 bg-cloud-dancer/90 text-background shadow-md backdrop-blur-md hover:bg-cloud-dancer hover:text-primary md:right-4 md:size-11',
                focusRing
              )}
            />
          </>
        )}
      </Carousel>
    </div>
  )
}
