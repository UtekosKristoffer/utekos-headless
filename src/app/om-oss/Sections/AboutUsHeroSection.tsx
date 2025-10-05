
import AboutUsOG from '@public/norsk-kveld.webp'
import Image from 'next/image'

export function AboutUsHeroSection() {
  return (
    <section className='relative h-[60vh] flex items-center justify-center text-center text-white overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <Image
          src={AboutUsOG}
          alt='Stemningsfullt bilde av norsk natur i skumringen'
          quality={100}
          fill
          sizes='100vw'
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-black/60' />
      </div>
      <div className='relative z-10 container px-4'>
        <h1 className='text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
          Utekos™ - Vår historie
        </h1>
        <p className='mt-6 text-lg max-w-2xl mx-auto leading-8 text-white/80'>
          Drevet av kalde kvelder og et ønske om å aldri la komfort stoppe de
          gode øyeblikkene.
        </p>
      </div>
    </section>
  )
}
