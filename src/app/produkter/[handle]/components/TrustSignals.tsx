'use client'

import { useRef } from 'react'
import { RotateCcw, Truck, ShieldCheck, Store } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { VippsLogo } from '@/components/logo/payments/VippsLogo'
import { KlarnaLogo } from '@/components/logo/payments/KlarnaLogo'
import { VisaLogo } from '@/components/logo/payments/VisaLogo'
import GooglePayLogo from '@public/logo/Google_Pay_Logo.svg'
import ApplePayLogo from '@public/logo/Apple_Pay_logo.svg'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function TrustSignals() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Fjernet repeatDelay (var 0.5) for å unngå pause mellom syklusene
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 })

      const signals = gsap.utils.toArray<HTMLElement>('.gsap-signal')
      const logos = gsap.utils.toArray<HTMLElement>('.gsap-logo')

      signals.forEach(signal => {
        if (window.getComputedStyle(signal).display === 'none') return

        tl.to(signal, {
          backgroundColor: 'rgba(34, 211, 238, 0.08)',
          borderColor: 'rgba(34, 211, 238, 0.2)',
          scale: 1.02,
          duration: 0.6, // Redusert fra 0.9 til 0.6 for høyere tempo
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 1
        })
      })

      logos.forEach(logo => {
        if (window.getComputedStyle(logo).display === 'none') return

        tl.to(logo, {
          scale: 1.2,
          opacity: 1,
          filter: 'brightness(1.2)',
          duration: 0.4, // Redusert fra 0.6 til 0.4 for kjappere flyt
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        })
      })
    },
    { scope: container }
  )

  return (
    <div
      ref={container}
      className='mt-6 mb-6 rounded-xl bg-slate-900/70 backdrop-blur-sm border border-slate-700/60 overflow-hidden'
      role='complementary'
      aria-label='Trygghetsinformasjon'
    >
      <div className='hidden md:block'>
        <div className='grid grid-cols-3 gap-4 px-6 py-5 border-b border-slate-800/50'>
          <Link
            href='/frakt-og-retur'
            className='gsap-signal flex flex-col items-center text-center gap-2.5 group rounded-lg p-2 border border-transparent transition-all'
            aria-label='Les mer om returpolicy'
          >
            <div className='w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors'>
              <RotateCcw className='w-5 h-5 text-cyan-400' />
            </div>
            <span className='text-sm font-medium text-slate-200 group-hover:text-cyan-300 transition-colors leading-tight'>
              14 dagers åpent kjøp
            </span>
          </Link>

          <Link
            href='/frakt-og-retur'
            className='gsap-signal flex flex-col items-center text-center gap-2.5 group rounded-lg p-2 border border-transparent transition-all'
            aria-label='Les mer om levering'
          >
            <div className='w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors'>
              <Truck className='w-5 h-5 text-cyan-400' />
            </div>
            <span className='text-sm font-medium text-slate-200 group-hover:text-cyan-300 transition-colors leading-tight'>
              Rask levering 2-5 dager
            </span>
          </Link>

          <Link
            href='/frakt-og-retur'
            className='gsap-signal flex flex-col items-center text-center gap-2.5 group rounded-lg p-2 border border-transparent transition-all'
            aria-label='Les mer om betalingsalternativer'
          >
            <div className='w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors'>
              <ShieldCheck className='w-5 h-5 text-cyan-400' />
            </div>
            <span className='text-sm font-medium text-slate-200 group-hover:text-cyan-300 transition-colors leading-tight'>
              Trygg handel
            </span>
          </Link>
        </div>

        <div className='px-6 py-4'>
          <div className='flex items-center justify-center gap-8'>
            <div className='gsap-logo origin-center'>
              <VippsLogo className='h-[20px] w-auto opacity-70 hover:opacity-100 transition-opacity' />
            </div>
            <div className='gsap-logo origin-center'>
              <KlarnaLogo className='h-[18px] w-auto opacity-70 hover:opacity-100 transition-opacity' />
            </div>
            <div className='gsap-logo origin-center'>
              <VisaLogo className='h-[16px] w-auto opacity-70 hover:opacity-100 transition-opacity' />
            </div>
            <div className='gsap-logo origin-center'>
              <Image
                src={GooglePayLogo}
                alt='Google Pay'
                className='h-[20px] w-auto opacity-70 hover:opacity-100 transition-opacity'
              />
            </div>
            <div className='gsap-logo px-2.5 py-1 bg-white rounded-md flex items-center origin-center'>
              <Image
                src={ApplePayLogo}
                alt='Apple Pay'
                className='h-[16px] w-auto'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:hidden'>
        <Link
          href='/frakt-og-retur'
          className='gsap-signal flex items-center gap-3 px-5 py-3.5 hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 border-t border-t-transparent'
          aria-label='Les mer om returpolicy'
        >
          <div className='w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0'>
            <RotateCcw className='w-4.5 h-4.5 text-cyan-400' />
          </div>
          <div>
            <span className='text-sm font-semibold text-slate-100 block leading-tight'>
              14 dagers åpent kjøp
            </span>
            <span className='text-xs text-slate-400 mt-0.5 block'>
              Uten spørsmål
            </span>
          </div>
        </Link>

        <Link
          href='/frakt-og-retur'
          className='gsap-signal flex items-center gap-3 px-5 py-3.5 hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 border-t border-t-transparent'
          aria-label='Les mer om levering'
        >
          <div className='w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0'>
            <Truck className='w-4.5 h-4.5 text-cyan-400' />
          </div>
          <div>
            <span className='text-sm font-semibold text-slate-100 block leading-tight'>
              Rask levering
            </span>
            <span className='text-xs text-slate-400 mt-0.5 block'>
              2–5 virkedager
            </span>
            <span className='mt-1 flex items-center gap-1.5 text-[11px] text-slate-300'>
              <Store className='w-3.5 h-3.5 text-cyan-400' aria-hidden='true' />
              Kan også hentes i butikk
            </span>
          </div>
        </Link>
        <Link
          href='/frakt-og-retur'
          className='gsap-signal flex items-center gap-3 px-5 py-3.5 hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 border-t border-t-transparent'
          aria-label='Les mer om betalingsalternativer'
        >
          <div className='w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0'>
            <ShieldCheck className='w-4.5 h-4.5 text-cyan-400' />
          </div>
          <div>
            <span className='text-sm font-semibold text-slate-100 block leading-tight'>
              Trygg handel
            </span>
            <span className='text-xs text-slate-400 mt-0.5 block'>
              Sikker betaling
            </span>
          </div>
        </Link>

        <div className='px-5 py-4'>
          <div className='flex items-center justify-center gap-6 flex-wrap'>
            <div className='gsap-logo origin-center'>
              <VippsLogo className='h-[18px] w-auto opacity-70' />
            </div>
            <div className='gsap-logo origin-center'>
              <KlarnaLogo className='h-[16px] w-auto opacity-70' />
            </div>
            <div className='gsap-logo origin-center'>
              <VisaLogo className='h-[14px] w-auto opacity-70' />
            </div>
            <div className='gsap-logo origin-center'>
              <Image
                src={GooglePayLogo}
                alt='Google Pay'
                className='h-[18px] w-auto opacity-70'
              />
            </div>
            <div className='gsap-logo px-2.5 py-1 bg-white rounded-md flex items-center origin-center'>
              <Image
                src={ApplePayLogo}
                alt='Apple Pay'
                className='h-[16px] w-auto'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
