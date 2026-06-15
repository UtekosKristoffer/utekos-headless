import Link from 'next/link'
import type { Route } from 'next'
import { ArrowRight, Award } from 'lucide-react'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { TypographyFrontpageHeroSectionH1 } from '../typography/TypographyH1'

export function MotionContentView() {
  return (
    <div className='relative w-full align-center overflow-hidden mx-auto mb-7 flex flex-col items-center justify-center max-w-[95%] text-center sm:mb-10'>
      <BrandBadge
        backgroundColor='var(--background)'
        textColor='var(--white-sand)'
        className='text-xs relative mx-auto tracking-tight rounded-2xl mb-5 py-1 md:py-3 gap-1.5 text-foreground! font-utekos-text border border-foreground/60 px-3 sm:gap-2 leading-none  md:text-[1.05rem] lg:text-[1.1rem] xl:text-[1.15]'
      >
        <Award className='size-3 px-0 shrink-0 text-foreground sm:size-4 md:size-5' />
        <small className='whitespace-nowrap px-0  tracking-0'>Funksjonell varme siden 2020</small>
      </BrandBadge>

      <header className='mx-auto w-full align-center mb-0 md:pb-2 text-foreground'>
        <TypographyFrontpageHeroSectionH1 />
      </header>
      <p className='hidden mt-4 font-utekos-text px-16 mx-auto tekst-lg lg:text-2xl tracking-normal leading-5 md:block'>
        Kompromissløs komfort og og overlegen allsidighet.
      </p>

      <p className='md:mt-2 md:hidden mx-auto text-sm font-utekos-text md:text-lg lg:text-2xl tracking-normal leading-5'>
        Kompromissløs komfort og
      </p>
      <p className='md:mt-2 md:hidden mx-auto text-sm font-utekos-text md:text-lg lg:text-2xl tracking-normal leading-5'>
        overlegen allsidighet.
      </p>
      <p className='max-w-4xl px-16 max-sm:mt-2 mx-auto font-utekos-text-medium text-sm lg:text-2xl tracking-normal leading-5'>
        Juster, form og nyt
      </p>

      <div data-nosnippet className='mt-7 flex justify-center sm:mt-9'>
        <BrandBadge
          asChild
          backgroundColor='var(--checkout-button)'
          textColor='var(--quet-tide-primary-monochromatic)'
          className='min-h-11 gap-2 px-5 py-3 font-utekos-text-medium text-sm leading-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-6 md:px-8 md:py-4 lg:px-10 lg:py-5 lg:text-lg'
        >
          <Link
            href={'/skreddersy-varmen' as Route}
            aria-label='Gå til skreddersy varmen'
            data-track='ReadMoreHeroClick'
          >
            <span>Se mer</span>
            <ArrowRight className='size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none' />
          </Link>
        </BrandBadge>
      </div>
    </div>
  )
}
