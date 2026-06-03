// Path: src/app/skreddersy-varmen/components/Hero.tsx

import Image from 'next/image'
import CinemaOne from '@public/cinema-twilight.webp'
import MobileOne from '@public/skreddersy-varmen-hero-mobile.webp'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import { HeroActions } from '@/app/skreddersy-varmen/components/HeroActions'
import { HeroStars } from '@/app/skreddersy-varmen/components/HeroStars'

export function Hero() {
  return (
    <section
      aria-labelledby='hero-headline'
      className='relative min-h-[calc(100svh-70px)] w-full overflow-hidden bg-background font-google-sans text-foreground xl:min-h-[calc(100svh-86px)]'
    >
      {/* Background — desktop */}
      <div className='absolute inset-0 z-0 hidden md:block'>
        <Image
          src={CinemaOne}
          alt='Utekos kveldsstemning på terrassen'
          fill
          preload
          quality={85}
          sizes='(max-width: 767px) 0px, 100vw'
          placeholder='blur'
          className='object-cover'
        />
      </div>

      {/* Background — mobile / LCP */}
      <div className='absolute inset-0 z-0 block md:hidden'>
        <Image
          src={MobileOne}
          alt='Utekos kveldsstemning'
          fill
          loading='eager'
          fetchPriority='high'
          quality={80}
          sizes='(min-width: 768px) 0px, 100vw'
          placeholder='blur'
          className='object-cover'
        />
      </div>

      {/* Static overlays. No motion values, no JS. */}
      <div
        aria-hidden
        className='absolute inset-0 z-1 bg-linear-to-b from-background/35 via-background/55 via-50% to-background/95'
      />
      <div
        aria-hidden
        className='absolute inset-y-0 left-0 z-1 hidden w-1/2 bg-linear-to-r from-background/80 via-background/20 to-transparent md:block'
      />

      {/* Main content */}
      <div className='relative z-10 mx-auto flex min-h-[calc(100svh-70px)] w-full max-w-[1400px] flex-col items-start justify-center px-6 pb-16 pt-20 md:px-12 md:pt-24 lg:px-20 xl:min-h-[calc(100svh-86px)]'>
        <div className='max-w-2xl'>
          <div
            className='mb-5 aspect-1281/312 h-11 text-overcast drop-shadow-lg sm:h-14 md:mb-6 md:h-16 lg:h-20'
            aria-hidden='true'
          >
            <UtekosWordmark className='size-full text-overcast' />
          </div>

          <h1
            id='hero-headline'
            className='font-google-sans text-left text-4xl font-bold leading-[0.92] tracking-[-0.01em] drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl'
          >
            <span className='block whitespace-nowrap text-foreground'>Skreddersy varmen.</span>
            <span className='mt-3 text-left block max-w-4xl font-google-sans text-3xl font-bold italic text-overcast sm:text-4xl md:text-5xl lg:text-6xl'>
              Forleng kvelden.
            </span>
          </h1>

          <p className='mt-7 max-w-xl font-google-sans text-base leading-text-paragraph text-foreground drop-shadow-md md:text-lg lg:text-xl'>
            Kompromissløs komfort <span>og</span> overlegen allsidighet.
          </p>

          <HeroActions />

          <div
            className='mt-9 flex items-center gap-3 text-sm text-foreground md:text-[15px]'
            aria-label='Kundeanmeldelser'
          >
            <HeroStars />
            <span className='font-semibold text-foreground'>4.8/5</span>
          </div>

          <p
            className='mt-5 flex w-fit max-w-full flex-nowrap items-center whitespace-nowrap font-google-sans text-xs font-medium leading-text-paragraph tracking-normal text-foreground md:text-sm'
            aria-label='På lager, levering 2 til 5 dager, 14 dagers retur'
          >
            <span>På lager</span>
            <span className='mx-2 text-foreground/65' aria-hidden>
              ·
            </span>
            <span>Levering 2–5 dager</span>
            <span className='mx-2 hidden text-foreground/65 lg:inline' aria-hidden>
              ·
            </span>
            <span className='hidden lg:inline'>14 dagers retur</span>
          </p>
        </div>
      </div>
    </section>
  )
}
