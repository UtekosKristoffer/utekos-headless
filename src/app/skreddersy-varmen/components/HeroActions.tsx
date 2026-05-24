// Path: src/app/skreddersy-varmen/components/HeroActions.tsx

'use client'

import { ArrowRight, ChevronDown } from 'lucide-react'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { scrollToElement } from '@/lib/gsap/scrollToElement'

const SCROLL_TARGETS = {
  purchase: 'purchase-section',
  solution: 'section-solution'
} as const

function smoothScrollTo(id: string) {
  const reducedMotion =
    typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  void scrollToElement(id, {
    offsetY: 72,
    reducedMotion
  })
}

export function HeroActions() {
  return (
    <>
      <div className='mt-9 flex w-full max-w-[19rem] flex-col items-stretch gap-3'>
        <BrandBadge
          asChild
          backgroundColor='var(--color-cloud-dancer)'
          textColor='var(--color-maritime-darkest)'
          className='h-12 w-full px-5 py-0 text-sm font-semibold leading-none tracking-normal shadow-xl transition-[filter,transform] hover:brightness-95 active:scale-[0.97] md:h-14 md:text-base'
        >
          <button
            type='button'
            onClick={() => smoothScrollTo(SCROLL_TARGETS.purchase)}
            data-track='HeroCtaSkreddersyVarmen'
            className='group inline-flex items-center gap-2 leading-none'
          >
            <span className='block leading-none'>Finn din favoritt</span>
            <ArrowRight
              className='size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1'
              aria-hidden
            />
          </button>
        </BrandBadge>

        <BrandBadge
          asChild
          backgroundColor='var(--color-overcast)'
          textColor='var(--color-maritime-darkest)'
          className='h-12 w-full px-5 py-0 text-sm font-semibold leading-none tracking-normal shadow-sm transition-[filter,transform] hover:brightness-95 active:scale-[0.97] md:h-14 md:text-base'
        >
          <button
            type='button'
            onClick={() => smoothScrollTo(SCROLL_TARGETS.solution)}
            data-track='HeroSecondaryCtaSkreddersyVarmen'
            className='group inline-flex items-center gap-2 leading-none'
          >
            <span className='block leading-none'>Se løsningen</span>
            <ChevronDown className='size-4 shrink-0' aria-hidden />
          </button>
        </BrandBadge>
      </div>

      <button
        type='button'
        onClick={() => smoothScrollTo(SCROLL_TARGETS.solution)}
        aria-label='Bla videre'
        className='absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cloud-dancer/75 transition-[opacity,transform] duration-300 hover:translate-y-1 hover:opacity-100 md:flex'
      >
        <span className='text-[10px] font-semibold tracking-normal'>
          Bla videre
        </span>
        <ChevronDown size={20} aria-hidden />
      </button>
    </>
  )
}
