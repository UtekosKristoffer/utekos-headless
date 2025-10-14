// Path: src/app/produkter/[handle]/ProductPageView/components/PriceActivityPanel.tsx
'use client'

import { Price } from '@/components/jsx/Price'
import { ShieldAlert, Sparkles, TrendingDown } from 'lucide-react'
import type { ReactNode } from 'react'

export interface PriceActivityPanelProps {
  productHandle: string
  priceAmount: string
  currencyCode: string
  /** Klient-øya for aktivitet, f.eks. <SmartRealTimeActivity baseViewers={...} /> */
  activityNode?: ReactNode
  /** Lagerantall for varsel. Når utelatt vises ikke varselet. */
  limitedStockCount?: number
}

// Konfigurasjon for lanseringstilbud
const LAUNCH_OFFERS = {
  'utekos-techdawn': {
    discountAmount: 200,
    discountPercent: 10,
    label: 'Lanseringstilbud'
  }
} as const

/**
 * Lettvekts panel for pris, lager-varsel og valgfri aktivitetsindikator.
 * Client-markert for å kunne brukes direkte fra en klient-side (ProductPageView).
 */
export default function PriceActivityPanel({
  productHandle,
  priceAmount,
  currencyCode,
  activityNode,
  limitedStockCount
}: PriceActivityPanelProps) {
  const shouldShowLimitedStockNotice =
    productHandle === 'utekos-special-edition'
    && typeof limitedStockCount === 'number'
    && Number.isFinite(limitedStockCount)
    && limitedStockCount > 0

  // Sjekk om produktet har lanseringstilbud
  const launchOffer = LAUNCH_OFFERS[productHandle as keyof typeof LAUNCH_OFFERS]
  const hasLaunchOffer = !!launchOffer

  // Beregn originalprisen hvis det er lanseringstilbud
  const currentPrice = parseFloat(priceAmount)
  const originalPrice =
    hasLaunchOffer ? currentPrice + launchOffer.discountAmount : null

  return (
    <section aria-label='Pris og tilgjengelighet' className='space-y-4'>
      {/* Lanseringstilbud badge */}
      {hasLaunchOffer && (
        <div className='inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:ring-white/20 hover:scale-[1.02]'>
          {/* Pulserende indikator */}
          <div className='relative flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
            <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500' />
          </div>

          {/* Badge-tekst */}
          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold text-white'>
              {launchOffer.label}
            </span>
            <div className='h-4 w-px bg-white/20' />
            <span className='text-sm font-bold text-emerald-400'>
              {launchOffer.discountPercent}% RABATT
            </span>
          </div>

          {/* Ikon */}
          <Sparkles className='h-4 w-4 text-emerald-400' />
        </div>
      )}

      {/* Original pris (hvis lanseringstilbud) */}
      {hasLaunchOffer && originalPrice && (
        <div className='flex items-center gap-3'>
          <span className='text-lg text-muted-foreground/60 line-through decoration-2'>
            {new Intl.NumberFormat('nb-NO', {
              style: 'currency',
              currency: currencyCode,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(originalPrice)}
          </span>
          <div className='flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 ring-1 ring-red-500/20'>
            <TrendingDown className='h-3.5 w-3.5 text-red-400' />
            <span className='text-sm font-semibold text-red-400'>
              −{launchOffer.discountAmount} kr
            </span>
          </div>
        </div>
      )}

      {/* Nåværende pris */}
      <div className='flex items-baseline gap-3'>
        {hasLaunchOffer ?
          <div className='bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent'>
            <Price amount={priceAmount} currencyCode={currencyCode} />
          </div>
        : <Price amount={priceAmount} currencyCode={currencyCode} />}
      </div>

      {/* Tilbuds-beskrivelse */}
      {hasLaunchOffer && (
        <p className='text-sm text-muted-foreground'>
          Begrenset tilbud ved lansering 🎉
        </p>
      )}

      {/* Eksisterende limited stock notice */}
      {shouldShowLimitedStockNotice && (
        <div className='relative overflow-hidden rounded-lg border border-amber-400/30 bg-amber-900/10 p-4'>
          {/* Aurora-effekt bak varselet */}
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
              <p className='font-semibold text-amber-400'>7 på lager!</p>
              <p className='text-sm text-amber-400/80'>
                Sikre deg din før det er for sent
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
