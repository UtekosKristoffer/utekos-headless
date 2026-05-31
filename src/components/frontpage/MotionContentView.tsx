import Link from 'next/link'
import type { Route } from 'next'
import { ArrowRight, Award } from 'lucide-react'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'

export function MotionContentView() {
  return (
    <div className='mx-auto mb-7 max-w-4xl text-center sm:mb-10 lg:max-w-6xl xl:max-w-7xl'>
      <BrandBadge
        backgroundColor='var(--ancient-water)'
        textColor='var(--background)'
        className='relative mx-auto mb-5 gap-1.5 border border-cloud-dancer/25 px-3 py-2 text-xs leading-none   shadow-[0_16px_32px_-26px_color-mix(in_oklab,var(--ancient-water)_64%,transparent)] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm'
      >
        <Award className='size-4 shrink-0 text-background sm:size-5' />
        <small className='whitespace-nowrap px-1 text-sm  ! font-medium sm:px-2'>
          Funksjonell varme siden 2020
        </small>
      </BrandBadge>

      <header className='mx-auto mt-5 mb-0 max-w-4xl text-balance font-bold leading-[0.88]   text-cloud-dancer lg:max-w-none'>
        <h1 className='relative inline-block overflow-hidden px-2' aria-label='Utekos'>
          <UtekosWordmark className='h-auto w-[76vw] max-w-[21rem] sm:w-[52vw] sm:max-w-[28rem] lg:w-[29rem] lg:max-w-none xl:w-[34rem]' />
        </h1>

        <h2 className='mt-4 block text-[3.2rem] leading-[0.9]   text-cloud-dancer tablet:whitespace-nowrap tablet:text-[clamp(3rem,8.5vw,5.75rem)] sm:mt-5 lg:text-[5.75rem] xl:text-[6.75rem] 2xl:text-[7.75rem]'>
          Skreddersy varmen
        </h2>
      </header>

      <h3 className='mx-auto mt-5 max-w-[34rem] sm:mt-7 sm:max-w-2xl lg:max-w-3xl'>
        <p className='text-balance text-base leading-[1.45]   text-cloud-dancer sm:text-lg md:text-xl lg:text-2xl'>
          Kompromissløs komfort og overlegen allsidighet.{' '}
          <span className='font-semibold text-dusted-peri tracking-normal'>Juster, form og nyt.</span>
        </p>
      </h3>

      <div data-nosnippet className='mt-7 flex justify-center sm:mt-9'>
        <BrandBadge
          asChild
          backgroundColor='var(--primary)'
          textColor='var(--background)'
          className='min-h-11 gap-2 px-5 py-3 md:text-medium text-sm leading-none shadow-[0_16px_32px_-22px_color-mix(in_oklab,var(--primary)_68%,transparent)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloud-dancer motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-6 md:px-8 md:py-4 lg:px-10 lg:py-5 lg:text-lg'
        >
          <Link
            href={'/skreddersy-varmen' as Route}
            aria-label='Gå til skreddersy varmen'
            data-track='ReadMoreHeroClick'
          >
            <label htmlFor='read-more-hero'>
              Se mer
              <input type='button' />
            </label>
            <ArrowRight className='size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none' />
          </Link>
        </BrandBadge>
      </div>
    </div>
  )
}
