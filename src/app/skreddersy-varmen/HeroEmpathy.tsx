// Path: src/components/frontpage/HeroEmpathy.tsx
'use client'

import Image from 'next/image'
import { Star, ChevronDown, ArrowRight, Quote } from 'lucide-react'
import CinemaOne from '@public/cinema-twilight.png'
import MobileOne from '@public/terrace-4-5.png'
import Balpanne from '@public/empathy-bonfire.png' // Sjekk at denne stien stemmer med bildet du viste
export function HeroAndEmpathy() {
  const scrollToModel = () => {
    const element = document.getElementById('section-solution')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className='relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#2C2420]'>
        <div className='hidden md:block absolute inset-0 z-0'>
          <Image
            src={CinemaOne}
            alt='Utekos stemning på terrassen'
            fill
            priority
            className='object-cover animate-slow-zoom opacity-90'
            quality={95}
          />
        </div>

        <div className='block md:hidden absolute inset-0 z-0'>
          <Image
            src={MobileOne}
            alt='Utekos stemning mobil'
            fill
            priority
            className='object-cover opacity-100'
            quality={95}
          />
        </div>

        <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-60% to-[#1F2421] to-95%' />

        <div className='relative z-10 w-full h-full flex flex-col items-center justify-start pt-32 md:justify-center md:pt-0 px-6'>
          <h1 className='font-serif text-4xl md:text-7xl mb-4 md:mb-6 drop-shadow-xl text-center text-balance leading-[1.1] tracking-tight'>
            <span className='bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900 bg-clip-text text-transparent'>
              Skreddersy varmen.
            </span>{' '}
            <br className='hidden md:block' />
            <span className='font-light italic opacity-90 block mt-2 text-2xl md:text-6xl text-[#E07A5F]'>
              Forleng de gode stundene.
            </span>
          </h1>

          <p className='font-sans text-lg md:text-2xl text-[#F4F1EA]/90 mb-8 md:mb-12 max-w-xs md:max-w-3xl text-center font-light antialiased leading-relaxed drop-shadow-md'>
            Utekos® definerer en ny standard for utendørs velvære, der funksjon
            møter kompromissløs komfort. Juster, form og nyt.
          </p>

          <div className='flex flex-col items-center gap-6 w-full'>
            <button
              onClick={scrollToModel}
              className='group relative bg-[#E07A5F] hover:bg-[#D06A4F] text-white px-8 py-4 rounded-full text-lg font-medium tracking-wide transition-all active:scale-95 shadow-2xl w-auto flex items-center gap-3'
            >
              Finn din favoritt
              <ChevronDown className='w-5 h-5 group-hover:translate-y-1 transition-transform' />
            </button>

            <div className='flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300'>
              <div className='flex gap-1 text-[#FFD700] mb-2 drop-shadow-md'>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} fill='currentColor' size={16} />
                ))}
              </div>
              <p className='text-sm text-[#F4F1EA]/90 font-medium tracking-wide shadow-black'>
                4.8/5 - i snitt fra våre livsnytere
              </p>
            </div>
          </div>
        </div>

        <div className='absolute bottom-8 animate-bounce text-[#F4F1EA]/50 z-20 hidden md:block'>
          <ChevronDown size={32} />
        </div>
      </section>

      <section className='relative w-full bg-[#F4F1EA] text-[#2C2420] py-24 md:py-40 overflow-hidden'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div className='flex flex-col lg:flex-row items-center gap-16 lg:gap-32'>
            <div className='lg:w-1/2 relative'>
              <span className='inline-block text-[#E07A5F] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-6 border-b border-[#E07A5F]/30 pb-2'>
                Ditt sosiale rom
              </span>

              <h2 className='font-serif text-4xl md:text-6xl lg:text-7xl text-[#2C2420] mb-8 leading-[1.05] tracking-tight'>
                Når øyeblikket er for godt til å avsluttes.
              </h2>

              <div className='prose prose-lg md:prose-xl text-[#2C2420]/75 font-serif leading-relaxed space-y-8'>
                <p>
                  <span className='float-left text-6xl md:text-7xl text-[#E07A5F] font-serif pr-4 pt-2 leading-[0.8]'>
                    D
                  </span>
                  u kjenner følelsen. Praten går lett rundt bålpannen, flammene
                  danser, og roen har endelig senket seg over hyttetunet. Men så
                  kommer den – den snikende trekken som truer med å bryte
                  magien.
                </p>

                <div className='relative py-4'>
                  <p className='font-serif text-3xl md:text-4xl text-[#2C2420] italic font-medium leading-tight ml-8 md:ml-12'>
                    &ldquo;Det begynner å bli kaldt. <br />
                    Skal vi trekke inn?&rdquo;
                  </p>

                  <div className='absolute left-0 top-6 bottom-6 w-1 bg-[#E07A5F]' />
                </div>

                <p className='font-sans text-base md:text-lg tracking-wide text-[#2C2420]/90'>
                  Med Utekos® er svaret nei. Vi har skapt en kolleksjon
                  designet for å ta kvelden tilbake. Fra lett mikrofiber til
                  eksklusiv dun – våre løsninger pakker deg inn i en beskyttende
                  kokong av varme, slik at du kan bli sittende.
                  <br />
                  <br />
                  <span className='italic'>Glem kulden. Forleng kvelden.</span>
                </p>
              </div>

              <div className='mt-12'>
                <button
                  onClick={scrollToModel}
                  className='group inline-flex items-center gap-4 text-[#2C2420] font-bold uppercase tracking-widest text-sm border-b border-[#2C2420] pb-2 hover:text-[#E07A5F] hover:border-[#E07A5F] transition-all duration-300'
                >
                  Utforsk kolleksjonen
                  <ArrowRight className='w-4 h-4 group-hover:translate-x-2 transition-transform' />
                </button>
              </div>
            </div>

            <div className='lg:w-1/2 w-full'>
              <div className='relative w-full aspect-[4/5] md:aspect-square'>
                <div className='relative h-full w-full rounded-sm overflow-hidden shadow-2xl shadow-[#2C2420]/20'>
                  <Image
                    src={Balpanne}
                    alt='Stemningsbilde av bålpanne og varme føtter'
                    fill
                    className='object-cover transform hover:scale-105 transition-transform duration-[3s] ease-in-out'
                    sizes='(max-width: 768px) 100vw, 50vw'
                  />

                  <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent' />
                  <div className='absolute bottom-8 left-8 right-8 text-[#F4F1EA]'>
                    <div className='flex items-center gap-3 mb-2 opacity-80'>
                      <div className='w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse' />
                      <span className='text-xs font-mono uppercase tracking-widest'>
                        Stemning
                      </span>
                    </div>
                    <p className='font-serif text-2xl italic leading-none'>
                      &ldquo;Klokken er 23:15.
                      <br />
                      Ingen vil gå inn.&rdquo;
                    </p>
                  </div>
                </div>

                <div className='absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-[#2C2420]/5 rounded-sm hidden md:block' />
              </div>
            </div>
          </div>
        </div>

        <div id='section-solution' className='absolute bottom-0' />
      </section>
    </>
  )
}
