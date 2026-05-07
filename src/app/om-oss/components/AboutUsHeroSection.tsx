// Path: src/app/om-oss/Sections/AboutUsHeroSection.tsx
import AboutUsOG from '@public/about-use-hero-gemini.png'
import Image from 'next/image'
import { UtekosWordmark } from '@/components/branding/UtekosWordmark'
import { Separator } from '@/components/ui/separator'

export function AboutUsHeroSection() {
  return (
    <section className='relative flex h-[100vh] flex-col items-center justify-center overflow-hidden bg-[#1F2421] text-center text-[#F4F1EA] md:h-[89vh]'>
      <div className='absolute inset-0 z-0'>
        <Image
          src={AboutUsOG}
          alt='Stemningsfullt bilde av norsk natur i skumringen'
          quality={95}
          fill
          sizes='100vw'
          className='object-cover'
          priority
        />
      </div>

      <div className='relative z-10 mx-auto mb:16 xs:mb-18 md:mb-20 lg:mb-24 xl:mb-28 flex w-[99%] max-w-screen md:w-[1280px] lg:w-screen justify-center self-center flex-col items-center gap-4 px-4 py-16'>
        <h1 className='wordmark'>
          <UtekosWordmark className='!text-7xl -ml-2 !font-black !leading-[1.05] md:!text-8xl lg:!text-9xl xl:!text-[200px]' />
        </h1>

        <Separator orientation='horizontal' className='opacity-0' />

        <h2 className='underline decoration-color-skreddersy-orange underline-offset-6 box-decoration-slice text-lg font-bold uppercase tracking-[0.1em] text-color-skreddersy-orange text-balance md:text-2xl'>
          Skreddersy varmen
        </h2>

        <Separator orientation='horizontal' className='opacity-0' />

        <h3 className='mx-auto max-w-2xl font-sans text-xl leading-relaxed text-[#F4F1EA]/90 drop-shadow-md md:text-3xl'>
          Drevet av kalde kvelder og et løfte om å aldri la været stoppe de gode
          øyeblikkene.
        </h3>
      </div>
    </section>
  )
}
