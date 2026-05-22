import Link from 'next/link'
import type { Route } from 'next'
import { ArrowRight, Award } from 'lucide-react'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'

export function MotionContentView() {
  return (
    <div className='mb-8 text-center'>
      <BrandBadge
        backgroundColor='color-mix(in oklab, var(--ancient-water) 9%, transparent)'
        textColor='var(--color-dusted-peri)'
        className='relative mx-auto mb-6 gap-1.5 border border-dusted-peri/75 px-3 py-2 text-[11px] leading-none sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm'
      >
        <Award className='size-4 shrink-0 text-dusted-peri sm:size-5' />
        <span className='whitespace-nowrap px-1.5 font-medium text-cloud-dancer sm:px-2'>
          Funksjonell varme - siden 2020
        </span>
      </BrandBadge>

      <h1 className='mt-6 text-5xl mb-6! font-bold tracking-tight text-shadow-cloud-dancer sm:text-7xl lg:text-[56px] xl:text-8xl'>
        <span
          className='relative -mx-2 inline-block overflow-hidden px-2'
          aria-label='Utekos'
        >
          <UtekosWordmark className='w-[340px] h-auto' />
        </span>

        <span className='my-6 block text-6xl text-xs:6xl lg:text-7xl xl:text-[110px] bg-gradient-to-r from-dusted-peri via-sweet-lavender to-dusted-peri text-transparent bg-clip-text outline-hidden'>
          Skreddersy varmen
        </span>
      </h1>

      <div className='mx-auto mb-12 mt-6 max-w-2xl md:max-w-4xl'>
        <p
          data-nosnippet='false'
          className='text-lg leading-relaxed text-shadow-cloud-dancer lg:text-2xl'
        >
          Kompromissløs komfort. Overlegen allsidighet.{' '}
          <span className='relative inline-flex items-center justify-center px-1'>
            <span className='absolute inset-0 -z-10 -rotate-1 rounded-lg border border-comfrey/45 bg-gradient-to-br from-mountain-view/24 via-comfrey/30 to-mountain-view/16' />
            <span className='relative z-10 inline-block font-semibold text-foreground'>
              Juster, form og nyt.
            </span>
          </span>
        </p>
      </div>

      <div data-nosnippet className='justify-center md:flex'>
        <Link
          href={'/skreddersy-varmen' as Route}
          className='group relative inline-flex min-h-[44px] items-center justify-center gap-3 px-6 py-6 text-xs font-medium tracking-[0.2em] text-cloud-dancer'
          aria-label='Gå til skreddersy varmen'
          data-track='ReadMoreHeroClick'
        >
          <span>Les mer</span>
          <ArrowRight className='size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none' />
          <span className='absolute bottom-4 left-0 h-px w-full origin-center scale-x-0 bg-gradient-to-r from-transparent via-white to-transparent transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none' />
        </Link>
      </div>
    </div>
  )
}
