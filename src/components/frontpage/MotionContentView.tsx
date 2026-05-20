// Path: src/components/frontpage/MotionContentView.tsx

import { forwardRef } from 'react'
import { Award } from 'lucide-react'
import { Shimmer } from '@/components/ai-elements/Shimmer'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ChevronDownSection } from '@/components/frontpage/components/HeroSection/ChevronDown'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark.tsx'

export const MotionContentView = forwardRef<HTMLDivElement, object>(
  (_, ref) => {
    return (
      <div ref={ref} className='mb-8 text-center'>
        <BrandBadge
          backgroundColor='color-mix(in oklab, var(--ancient-water) 9%, transparent)'
          textColor='var(--color-dusted-peri)'
          className='gsap-badge-container invisible relative mx-auto mb-6 gap-1.5 border border-dusted-peri/75 px-3 py-2 text-[11px] leading-none sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm'
        >
          <Award className='size-4 shrink-0 text-dusted-peri sm:size-5' />
          <Shimmer
            as='span'
            className='whitespace-nowrap px-1.5 font-medium [--shimmer-color:var(--color-cloud-dancer)] sm:px-2'
          >
            Funksjonell varme - siden 2020
          </Shimmer>
        </BrandBadge>

        <h1 className='mt-6 text-5xl mb-6! font-bold tracking-tight text-shadow-cloud-dancer sm:text-7xl lg:text-[56px] xl:text-8xl'>
          <span
            className='relative -mx-2 inline-block overflow-hidden px-2'
            aria-label='Utekos'
          >
            <UtekosWordmark
              className='w-[340px] h-auto will-change-transform'
              animated={true}
            />
          </span>

          <div className='overflow-hidden'>
            <h2 className='gsap-subtitle my-6 block text-6xl text-xs:6xl lg:text-7xl xl:text-[110px] bg-gradient-to-r from-dusted-peri via-sweet-lavender to-dusted-peri text-transparent bg-clip-text outline-hidden'>
              Skreddersy varmen
            </h2>
          </div>
        </h1>
        <div className='mx-auto mb-12 mt-6 max-w-2xl md:max-w-4xl'>
          <p
            data-nosnippet='false'
            className='gsap-desc invisible text-lg leading-relaxed text-shadow-cloud-dancer lg:text-2xl'
          >
            Kompromissløs komfort. Overlegen allsidighet.{' '}
            <span className='relative inline-flex items-center justify-center px-1'>
              <span className='gsap-highlight absolute inset-0 -z-10 -skew-x-12 scale-x-0 rounded-md bg-gradient-to-r from-mountain-view via-comfrey to-mountain-view blur-[1px] will-change-transform' />

              <span className='gsap-highlight absolute inset-0 -z-10 -rotate-1 scale-x-0 rounded-lg border border-comfrey/45 bg-gradient-to-br from-mountain-view/24 via-comfrey/30 to-mountain-view/16 will-change-transform' />

              <span className='relative z-10 inline-block font-semibold text-foreground'>
                Juster, form og nyt.
              </span>
            </span>
          </p>
        </div>

        <div
          data-nosnippet
          className='gsap-chevron invisible justify-center md:flex'
        >
          <ChevronDownSection />
        </div>
      </div>
    )
  }
)

MotionContentView.displayName = 'MotionContentView'
