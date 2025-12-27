// Path: src/app/om-oss/Sections/AboutUsHeroSection.tsx
import AboutUsOG from '@public/about-use-hero-gemini.png'
import Image from 'next/image'

export function AboutUsHeroSection() {
  return (
    <section className='relative h-[70vh] flex items-center justify-center text-center text-[#F4F1EA] overflow-hidden bg-[#1F2421]'>
      {/* Bakgrunnsbilde */}
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
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#1F2421]' />
      </div>

      {/* Innhold */}
      <div className='relative z-10 container px-6 max-w-4xl'>
        {/* Kicker / Sub-label i Ember Orange */}
        <span className='inline-block text-[#E07A5F] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
          Vår Historie
        </span>

        <h1 className='text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.1] drop-shadow-xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200'>
          Utekos
        </h1>

        {/* Brødtekst med økt lesbarhet og følelse */}
        <p className='text-lg md:text-2xl font-light leading-relaxed text-[#F4F1EA]/90 drop-shadow-md max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300'>
          Drevet av kalde kvelder og et løfte om å aldri la været stoppe de gode
          øyeblikkene.
        </p>
      </div>
    </section>
  )
}
