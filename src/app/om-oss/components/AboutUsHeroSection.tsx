// Path: src/app/om-oss/Sections/AboutUsHeroSection.tsx
import AboutUsOG from '@public/about-use-hero-gemini.png'
import Image from 'next/image'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'

export function AboutUsHeroSection() {
  return (
    <hgroup className='relative flex h-[82svh] flex-col items-center justify-center overflow-hidden bg-maritime-darkest text-center text-cloud-dancer md:min-h-[89vh]'>
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
      {/* Overlays i maritime-darkest blender bildet perfekt inn i resten av siden */}
      <div className='absolute inset-0 z-1 bg-maritime-darkest/60' />
      <div className='absolute inset-x-0 bottom-0 z-1 h-1/3 bg-linear-to-t from-maritime-darkest to-transparent' />

      <div className='relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-6 px-6 py-20'>
        <h1 className='flex flex-col items-center leading-[0.95] tracking-[-0.01em]' aria-label='Om Utekos'>
          <span className='sr-only'>Om Utekos</span>
          <UtekosWordmark
            aria-hidden='true'
            className='h-auto w-[min(76vw,19rem)] text-cloud-dancer md:w-[min(72vw,34rem)] xl:w-2xl'
            style={{ color: 'var(--color-cloud-dancer)' }}
          />
        </h1>

        <BrandBadge
          label='Skreddersy varmen'
          backgroundColor='var(--checkout-button)'
          textColor='var(--background)'
          className='shadow-lg font-utekos-text-medium'
        />

        <p className='mx-auto max-w-2xl text-xl leading-text-paragraph text-cloud-dancer/95 drop-shadow-md md:text-3xl'>
          Drevet av kalde kvelder og et løfte om å aldri la været stoppe de gode øyeblikkene.
        </p>
      </div>
    </hgroup>
  )
}
