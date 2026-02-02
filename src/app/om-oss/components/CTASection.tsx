// Path: src/app/(sections)/CTASection.tsx

import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { ArrowRight, Sparkles, Check } from 'lucide-react'
import { VippsLogo } from '@/components/logo/payments/VippsLogo'
import { KlarnaLogo } from '@/components/logo/payments/KlarnaLogo'

export function CTASection() {
  return (
    <section className='relative overflow-hidden bg-[#1F2421] py-24 sm:py-32'>
      {/* Ambient background glow (Varm atmosfære) */}
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div
          className='absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 blur-[100px]'
          style={{
            background: 'radial-gradient(circle, #E07A5F 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='container mx-auto max-w-4xl px-4'>
        <div className='relative overflow-hidden rounded-sm border border-[#F4F1EA]/10 bg-[#2C2420]/80 backdrop-blur-sm p-12 text-center shadow-2xl shadow-black/50 md:p-16'>
          <div className='absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E07A5F]/50 to-transparent' />
          <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E07A5F]/30 to-transparent' />
          <div className='relative z-10'>
            {/* Badge */}
            <AnimatedBlock
              className='mb-8 inline-flex items-center gap-2 rounded-full border border-[#E07A5F]/30 bg-[#E07A5F]/10 px-4 py-1.5 will-animate-fade-in-scale'
              delay='0s'
              threshold={0.2}
            >
              <Sparkles className='h-4 w-4 text-[#E07A5F]' />
              <span className='text-xs font-bold tracking-[0.15em] uppercase text-[#E07A5F]'>
                Oppdag kolleksjonen
              </span>
            </AnimatedBlock>

            {/* Overskrift */}
            <AnimatedBlock
              className='will-animate-fade-in-up'
              delay='0.08s'
              threshold={0.2}
            >
              <h2 className='text-3xl md:text-5xl font-serif font-medium text-[#F4F1EA] mb-6 leading-tight'>
                Klar til å ta kvelden tilbake?
              </h2>
            </AnimatedBlock>
            <AnimatedBlock
              className='will-animate-fade-in-up'
              delay='0.16s'
              threshold={0.2}
            >
              <p className='mx-auto mt-4 max-w-2xl text-lg md:text-xl leading-relaxed text-[#F4F1EA]/70 font-light'>
                Opplev hvordan ekte norsk design kan forvandle en kjølig kveld
                til ditt favorittøyeblikk.
              </p>
            </AnimatedBlock>
            <AnimatedBlock
              className='mt-10 will-animate-fade-in-up'
              delay='0.24s'
              threshold={0.2}
            >
              <Link
                href='/produkter'
                className='group inline-flex items-center justify-center rounded-sm bg-[#E07A5F] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#E07A5F]/20 transition-all duration-300 hover:scale-105 hover:bg-[#d0694e] hover:shadow-[#E07A5F]/40'
              >
                Se alle produkter
                <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
              </Link>
            </AnimatedBlock>
            <AnimatedBlock
              className='mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-[#F4F1EA]/60 will-animate-fade-in-up'
              delay='0.32s'
              threshold={0.2}
            >
              <div className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-[#E07A5F]' />
                <span>Skapt for norske forhold</span>
              </div>
              <div className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-[#E07A5F]' />
                <span>Fri frakt over 999,-</span>
              </div>
              <div className='flex items-center gap-2'>
                <span>Trygg handel med</span>
                <div className='flex items-center gap-3 ml-1 opacity-80 hover:opacity-100 transition-opacity'>
                  <VippsLogo className='h-[16px] w-auto' />
                  <KlarnaLogo className='h-[14px] w-auto' />
                </div>
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </div>
    </section>
  )
}
