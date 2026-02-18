'use client'

import { Price } from '@/components/jsx/Price'
import { ShieldAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import type { CurrencyCode } from 'types/commerce/CurrencyCode'

export interface PriceActivityPanelProps {
  productHandle: string
  priceAmount: string
  currencyCode: CurrencyCode
  activityNode?: ReactNode
  limitedStockCount?: number
}

// Konfigurasjon
const OFFERS = {
  'utekos-techdown': {
    label: 'Lanseringstilbud',
    fixedSavings: 449, // Fast sparebeløp
    originalPrice: null, // null = Ikke vis førpris
    description: 'Begrenset tilbud ved lansering'
  },
  'utekos-dun': {
    label: 'Tilbud',
    fixedSavings: null, // null = Regn ut basert på originalPrice
    originalPrice: 3290, // Vis denne førprisen
    description: null
  },
  'utekos-mikrofiber': {
    label: 'Tilbud',
    fixedSavings: null,
    originalPrice: 2290,
    description: null
  },
  'comfyrobe': {
    label: 'Tilbud',
    fixedSavings: null,
    originalPrice: 1690,
    description: null
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

  // Hent konfigurasjon for produktet
  const currentOffer = OFFERS[productHandle as keyof typeof OFFERS]
  const hasOffer = !!currentOffer

  // Variabler for utregning
  let savingsAmount = 0
  let showBeforePrice = false
  let originalPriceToDisplay = 0

  if (hasOffer) {
    // 1. Hvis det er fast sparebeløp (Techdown)
    if (currentOffer.fixedSavings) {
      savingsAmount = currentOffer.fixedSavings
      showBeforePrice = false // Skjuler førpris for techdown
    }
    // 2. Hvis det er basert på førpris (Dun, Mikrofiber, Comfyrobe)
    else if (currentOffer.originalPrice) {
      // Gjør om nåpris fra tekst til tall
      const currentPriceNumber = parseFloat(
        String(priceAmount)
          .replace(/[^0-9,.]/g, '')
          .replace(',', '.')
      )

      if (!isNaN(currentPriceNumber)) {
        savingsAmount = currentOffer.originalPrice - currentPriceNumber
        originalPriceToDisplay = currentOffer.originalPrice
        showBeforePrice = true // Viser førpris for disse
      }
    }
  }

  const showSavings = hasOffer && savingsAmount > 0

  return (
    <section aria-label='Pris og tilgjengelighet' className='space-y-4'>
      {/* --- SPARE-BADGE (Vises for alle med tilbud) --- */}
      {showSavings && (
        <div className='inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:ring-white/20'>
          <div className='relative flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
            <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500' />
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold text-white'>
              {currentOffer.label}
            </span>
            <div className='h-4 w-px bg-white/20' />
            <span className='text-sm font-bold text-emerald-400'>
              Spar totalt kr {Math.round(savingsAmount)} 🎉
            </span>
          </div>
        </div>
      )}

      {/* --- PRISVISNING --- */}
      <div className='flex items-baseline gap-3'>
        {showSavings ?
          <>
            {/* Nå-prisen (alltid farget ved tilbud) */}
            <div className='bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent'>
              <Price amount={priceAmount} currencyCode={currencyCode} />
            </div>

            {/* Før-prisen (Kun for Dun, Mikrofiber, Comfyrobe) */}
            {showBeforePrice && (
              <div className='text-lg text-muted-foreground line-through opacity-70'>
                <Price
                  amount={String(originalPriceToDisplay)}
                  currencyCode={currencyCode}
                />
              </div>
            )}
          </>
        : /* Ingen tilbud - standard visning */
          <Price amount={priceAmount} currencyCode={currencyCode} />
        }
      </div>

      {showSavings && currentOffer.description && (
        <p className='text-sm text-muted-foreground'>
          {currentOffer.description}
        </p>
      )}

      {/* --- SPECIAL EDITION LAGERSTATUS --- */}
      {isSpecialEdition && shouldShowLimitedStockNotice && (
        <div className='relative overflow-hidden rounded-lg border border-amber-400/30 bg-amber-900/10 p-4'>
          <div
            className='relative flex items-center gap-3'
            style={{ zIndex: 10 }}
          >
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
          {/* Bakgrunnseffekt */}
          <div
            className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-20 blur-2xl'
            style={{
              background:
                'radial-gradient(120% 120% at 50% 0%, transparent 30%, #f59e0b 100%)'
            }}
            aria-hidden='true'
          />
        </div>
      )}

      {activityNode ?
        <div className='mt-4'>{activityNode}</div>
      : null}
    </section>
  )
}
