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
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.5,
        defaults: { ease: 'power1.inOut' }
      })

      const items = gsap.utils.toArray<HTMLElement>('.gsap-item')

      items.forEach((item, index) => {
        if (window.getComputedStyle(item).display === 'none') return

        const isSignal = item.classList.contains('gsap-signal')

        tl.to(
          item,
          {
            scale: isSignal ? 1.02 : 1.15,
            opacity: 1,
            backgroundColor: isSignal ? 'rgba(34, 211, 238, 0.08)' : undefined,
            borderColor: isSignal ? 'rgba(34, 211, 238, 0.25)' : undefined,
            filter: !isSignal ? 'brightness(1.2) grayscale(0%)' : undefined,
            duration: 0.35,
            yoyo: true,
            repeat: 1
          },
          index === 0 ? '+=0.2' : '>-0.25'
        )
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
        <div className='grid grid-cols-3 gap-2 px-3 py-4 border-b border-slate-800/50'>
          <Link
            href='/frakt-og-retur'
            className='gsap-item gsap-signal flex flex-col items-center text-center gap-1.5 group rounded-lg p-2 border border-transparent transition-all'
            aria-label='Les mer om returpolicy'
          >
            <div className='w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors mb-1'>
              <RotateCcw className='w-4 h-4 text-cyan-400' />
            </div>
            <div className='flex flex-col leading-none'>
              <span className='text-[11px] font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors'>
                14 dager
              </span>
              <span className='text-[10px] text-slate-400 mt-0.5'>
                Åpent kjøp
              </span>
            </div>
          </Link>

          <Link
            href='/frakt-og-retur'
            className='gsap-item gsap-signal flex flex-col items-center text-center gap-1.5 group rounded-lg p-2 border border-transparent transition-all'
            aria-label='Les mer om levering'
          >
            <div className='w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors mb-1'>
              <Truck className='w-4 h-4 text-cyan-400' />
            </div>
            <div className='flex flex-col leading-none'>
              <span className='text-[11px] font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors'>
                Rask levering
              </span>
              <span className='text-[10px] text-slate-400 mt-0.5'>
                2-5 dager
              </span>
            </div>
          </Link>

          <Link
            href='/frakt-og-retur'
            className='gsap-item gsap-signal flex flex-col items-center text-center gap-1.5 group rounded-lg p-2 border border-transparent transition-all'
            aria-label='Les mer om betalingsalternativer'
          >
            <div className='w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors mb-1'>
              <ShieldCheck className='w-4 h-4 text-cyan-400' />
            </div>
            <div className='flex flex-col leading-none'>
              <span className='text-[11px] font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors'>
                Trygg handel
              </span>
              <span className='text-[10px] text-slate-400 mt-0.5'>
                Sikker betaling
              </span>
            </div>
          </Link>
        </div>

        <div className='px-4 py-3'>
          <div className='flex items-center justify-center gap-6 xl:gap-8'>
            <div className='gsap-item gsap-logo origin-center opacity-60 grayscale filter transition-all'>
              <VippsLogo className='h-[18px] w-auto' />
            </div>
            <div className='gsap-item gsap-logo origin-center opacity-60 grayscale filter transition-all'>
              <KlarnaLogo className='h-[16px] w-auto' />
            </div>
            <div className='gsap-item gsap-logo origin-center opacity-60 grayscale filter transition-all'>
              <VisaLogo className='h-[14px] w-auto' />
            </div>
            <div className='gsap-item gsap-logo origin-center opacity-60 grayscale filter transition-all'>
              <Image
                src={GooglePayLogo}
                alt='Google Pay'
                className='h-[18px] w-auto'
              />
            </div>
            <div className='gsap-item gsap-logo px-2 py-0.5 bg-white/90 rounded-sm flex items-center origin-center opacity-60 filter grayscale transition-all'>
              <Image
                src={ApplePayLogo}
                alt='Apple Pay'
                className='h-[12px] w-auto'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:hidden'>
        <Link
          href='/frakt-og-retur'
          className='gsap-item gsap-signal flex items-center gap-3 px-5 py-3.5 border-b border-slate-800/50 border-t border-t-transparent transition-all'
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
          className='gsap-item gsap-signal flex items-center gap-3 px-5 py-3.5 border-b border-slate-800/50 border-t border-t-transparent transition-all'
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
          className='gsap-item gsap-signal flex items-center gap-3 px-5 py-3.5 border-b border-slate-800/50 border-t border-t-transparent transition-all'
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
            <div className='gsap-item gsap-logo origin-center opacity-60 grayscale filter'>
              <VippsLogo className='h-[18px] w-auto' />
            </div>
            <div className='gsap-item gsap-logo origin-center opacity-60 grayscale filter'>
              <KlarnaLogo className='h-[16px] w-auto' />
            </div>
            <div className='gsap-item gsap-logo origin-center opacity-60 grayscale filter'>
              <VisaLogo className='h-[14px] w-auto' />
            </div>
            <div className='gsap-item gsap-logo origin-center opacity-60 grayscale filter'>
              <Image
                src={GooglePayLogo}
                alt='Google Pay'
                className='h-[18px] w-auto'
              />
            </div>
            <div className='gsap-item gsap-logo px-2.5 py-1 bg-white/90 rounded-sm flex items-center origin-center opacity-60 grayscale filter'>
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
