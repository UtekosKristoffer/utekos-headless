'use client'

import { Price } from '@/components/jsx/Price'
import { ShieldAlert } from 'lucide-react'
import type { ReactNode } from 'react'

export interface PriceActivityPanelProps {
  productHandle: string
  priceAmount: string
  currencyCode: string
  activityNode?: ReactNode
  limitedStockCount?: number
}

const LAUNCH_OFFERS = {
  'utekos-techdown': {
    discountAmount: 449,
    label: 'Lanseringstilbud'
  }
} as const

export default function PriceActivityPanel({
  productHandle,
  priceAmount,
  currencyCode,
  activityNode,
  limitedStockCount
}: PriceActivityPanelProps) {
  const shouldShowLimitedStockNotice =
    typeof limitedStockCount === 'number' && limitedStockCount > 0

  const isSpecialEdition = productHandle === 'utekos-special-edition'

  const launchOffer = LAUNCH_OFFERS[productHandle as keyof typeof LAUNCH_OFFERS]
  const hasLaunchOffer = !!launchOffer

  return (
    <section aria-label='Pris og tilgjengelighet' className='space-y-4'>
      {hasLaunchOffer && (
        <div className='inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:ring-white/20'>
          <div className='relative flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
            <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500' />
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold text-white'>
              {launchOffer.label}
            </span>
            <div className='h-4 w-px bg-white/20' />
            <span className='text-sm font-bold text-emerald-400'>
              Spar totalt kr {launchOffer.discountAmount} 🎉
            </span>
          </div>
        </div>
      )}

      <div className='flex items-baseline gap-3'>
        {hasLaunchOffer ?
          <div className='bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent'>
            <Price amount={priceAmount} currencyCode={currencyCode} />
          </div>
        : <Price amount={priceAmount} currencyCode={currencyCode} />}
      </div>

      {hasLaunchOffer && (
        <p className='text-sm text-muted-foreground'>
          Begrenset tilbud ved lansering
        </p>
      )}

      {isSpecialEdition && shouldShowLimitedStockNotice && (
        <div className='relative overflow-hidden rounded-lg border border-amber-400/30 bg-amber-900/10 p-4'>
          <div
            className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-20 blur-2xl'
            style={{
              background:
                'radial-gradient(120% 120% at 50% 0%, transparent 30%, #f59e0b 100%)'
            }}
            aria-hidden='true'
          />
          <div className='relative flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10'>
              <ShieldAlert
                className='h-5 w-5 text-amber-400'
                aria-hidden='true'
              />
            </div>
            <div>
              <p className='font-semibold text-amber-400'>
                Kun {limitedStockCount} igjen på lager!
              </p>
              <p className='text-sm text-amber-400/80'>
                Unik utgave - kommer ikke tilbake
              </p>
            </div>
          </div>
        </div>
      )}

      {activityNode ?
        <div className='mt-4'>{activityNode}</div>
      : null}
    </section>
  )
}
