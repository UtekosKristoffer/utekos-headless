import Image from 'next/image'
import { Star, ChevronDown } from 'lucide-react'
import CinemaOne from '@public/cinema-twilight.png'
import MobileOne from '@public/terrace-4-5.png'
import { ScrollToButton } from './ScrollToButton' // Importer den lille klient-komponenten

export function HeroSection() {
  return (
    <section className='relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#2C2420]'>
      <div className='hidden md:block absolute inset-0 z-0'>
        <Image
          src={CinemaOne}
          alt='Utekos stemning på terrassen - nyt kvelden lenger'
          fill
          priority
          placeholder='blur' // Bra for UX på tregt hyttenett
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
          placeholder='blur'
          className='object-cover opacity-100'
          quality={95}
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-60% to-[#1F2421] to-95%' />

      <div className='relative z-10 w-full h-full flex flex-col items-center justify-start pt-32 md:justify-center md:pt-0 px-6'>
        <h1 className='font-serif text-4xl md:text-7xl text-[#F4F1EA] mb-4 md:mb-6 drop-shadow-xl text-center text-balance leading-[1.1] tracking-tight'>
          Skreddersy varmen <br className='hidden md:block' />
          <span className='font-light italic opacity-90 block mt-2 text-2xl md:text-6xl text-[#E07A5F]'>
            Forleng de gode stundene
          </span>
        </h1>

        <p className='font-sans text-lg md:text-2xl text-[#F4F1EA]/90 mb-8 md:mb-12 max-w-xs md:max-w-3xl text-center font-light antialiased leading-relaxed drop-shadow-md'>
          Utekos® definerer en ny standard for utendørs velvære. Juster, form
          og nyt – uansett sted og temperatur.
        </p>

        <div className='flex flex-col items-center gap-6 w-full'>
          {/* Her bruker vi Client Componenten */}
          <ScrollToButton />

          <div className='flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300'>
            <div className='flex gap-1 text-[#FFD700] mb-2 drop-shadow-md'>
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} fill='currentColor' size={16} />
              ))}
            </div>
            <p className='text-sm text-[#F4F1EA]/90 font-medium tracking-wide shadow-black'>
              4.8/5 - fra våre livsnytere
            </p>
          </div>
        </div>
      </div>

      <div className='absolute bottom-8 animate-bounce text-[#F4F1EA]/50 z-20 hidden md:block'>
        <ChevronDown size={32} />
      </div>
    </section>
  )
}
