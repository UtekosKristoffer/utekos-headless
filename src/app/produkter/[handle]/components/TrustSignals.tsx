// Path: src/components/product/TrustSignals.tsx

'use client'

import { RotateCcw, Truck, ShieldCheck, Store } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { VippsLogo } from '@/components/payments/VippsLogo'
import { KlarnaLogo } from '@/components/payments/KlarnaLogo'
import { VisaLogo } from '@/components/payments/VisaLogo'
import GooglePayLogo from '@public/logo/Google_Pay_Logo.svg'
import ApplePayLogo from '@public/logo/Apple_Pay_logo.svg'
export function TrustSignals() {
  return (
    <div
      className='mb-6 mt-6 overflow-hidden rounded-[1.25rem] border border-cloud-dancer/70 bg-cloud-dancer/72 shadow-xl shadow-maritime-blue/10 backdrop-blur-sm'
      role='complementary'
      aria-label='Trygghetsinformasjon'
    >
      <div className='hidden md:block'>
        <div className='grid grid-cols-3 gap-4 border-b border-maritime-blue/10 px-6 py-5'>
          <Link
            href='/frakt-og-retur'
            className='group flex flex-col items-center gap-2.5 text-center'
            aria-label='Les mer om returpolicy'
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-full border border-maritime-blue/14 bg-maritime-blue text-cloud-dancer transition-transform duration-300 group-hover:scale-105'>
              <RotateCcw className='h-5 w-5' />
            </div>
            <span className='text-sm font-medium leading-tight text-maritime-blue transition-colors group-hover:text-maritime-blue/76'>
              14 dagers åpent kjøp
            </span>
          </Link>

          <Link
            href='/frakt-og-retur'
            className='group flex flex-col items-center gap-2.5 text-center'
            aria-label='Les mer om levering'
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-full border border-maritime-blue/14 bg-maritime-blue text-cloud-dancer transition-transform duration-300 group-hover:scale-105'>
              <Truck className='h-5 w-5' />
            </div>
            <span className='text-sm font-medium leading-tight text-maritime-blue transition-colors group-hover:text-maritime-blue/76'>
              Rask levering 2-5 dager
            </span>
          </Link>

          <Link
            href='/frakt-og-retur'
            className='group flex flex-col items-center gap-2.5 text-center'
            aria-label='Les mer om betalingsalternativer'
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-full border border-maritime-blue/14 bg-maritime-blue text-cloud-dancer transition-transform duration-300 group-hover:scale-105'>
              <ShieldCheck className='h-5 w-5' />
            </div>
            <span className='text-sm font-medium leading-tight text-maritime-blue transition-colors group-hover:text-maritime-blue/76'>
              Trygg handel
            </span>
          </Link>
        </div>

        <div className='px-6 py-4'>
          <div className='flex items-center justify-center gap-5'>
            <VippsLogo className='h-[18px] w-auto opacity-85 transition-opacity hover:opacity-100' />
            <KlarnaLogo className='h-[16px] w-auto opacity-85 transition-opacity hover:opacity-100' />
            <VisaLogo className='h-[14px] w-auto opacity-85 transition-opacity hover:opacity-100' />
            <Image
              src={GooglePayLogo}
              alt='Google Pay'
              className='h-[18px] w-auto opacity-85 transition-opacity hover:opacity-100'
            />
            <div className='flex items-center rounded-md bg-white px-2.5 py-1'>
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
          className='flex items-center gap-3 border-b border-maritime-blue/10 px-5 py-3.5 transition-colors hover:bg-cloud-dancer/70'
          aria-label='Les mer om returpolicy'
        >
          <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-maritime-blue/14 bg-maritime-blue text-cloud-dancer'>
            <RotateCcw className='h-4.5 w-4.5' />
          </div>
          <div>
            <span className='block text-sm font-semibold leading-tight text-maritime-blue'>
              14 dagers åpent kjøp
            </span>
            <span className='mt-0.5 block text-xs text-maritime-blue/62'>
              Uten spørsmål
            </span>
          </div>
        </Link>

        <Link
          href='/frakt-og-retur'
          className='flex items-center gap-3 border-b border-maritime-blue/10 px-5 py-3.5 transition-colors hover:bg-cloud-dancer/70'
          aria-label='Les mer om levering'
        >
          <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-maritime-blue/14 bg-maritime-blue text-cloud-dancer'>
            <Truck className='h-4.5 w-4.5' />
          </div>
          <div>
            <span className='block text-sm font-semibold leading-tight text-maritime-blue'>
              Rask levering
            </span>
            <span className='mt-0.5 block text-xs text-maritime-blue/62'>
              2–5 virkedager
            </span>
            <span className='mt-1 flex items-center gap-1.5 text-[11px] text-maritime-blue/70'>
              <Store className='h-3.5 w-3.5 text-dusted-peri' aria-hidden='true' />
              Kan også hentes i butikk
            </span>
          </div>
        </Link>
        <Link
          href='/frakt-og-retur'
          className='flex items-center gap-3 border-b border-maritime-blue/10 px-5 py-3.5 transition-colors hover:bg-cloud-dancer/70'
          aria-label='Les mer om betalingsalternativer'
        >
          <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-maritime-blue/14 bg-maritime-blue text-cloud-dancer'>
            <ShieldCheck className='h-4.5 w-4.5' />
          </div>
          <div>
            <span className='block text-sm font-semibold leading-tight text-maritime-blue'>
              Trygg handel
            </span>
            <span className='mt-0.5 block text-xs text-maritime-blue/62'>
              Sikker betaling
            </span>
          </div>
        </Link>

        <div className='px-5 py-4'>
          <div className='flex flex-wrap items-center justify-center gap-4'>
            <VippsLogo className='h-[18px] w-auto opacity-90' />
            <KlarnaLogo className='h-[16px] w-auto opacity-90' />
            <VisaLogo className='h-[14px] w-auto opacity-90' />
            <Image
              src={GooglePayLogo}
              alt='Google Pay'
              className='h-[18px] w-auto opacity-90'
            />
            <div className='flex items-center rounded-md bg-white px-2.5 py-1'>
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
