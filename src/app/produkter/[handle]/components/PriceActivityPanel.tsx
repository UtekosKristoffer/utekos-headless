'use client'

import { Price } from '@/components/jsx/Price'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
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
    label: 'Vårtilbud',
    fixedSavings: 200, // Fast sparebeløp
    originalPrice: null, // null = Ikke vis førpris
    description: 'Tilbudet gjelder i en begrenset periode.'
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
    <section
      aria-label='Pris og tilgjengelighet'
      className='relative space-y-4'
    >
      {showSavings && (
        <div className='absolute -left-6 -top-20 z-20 flex flex-wrap items-center gap-3 md:-top-12 lg:-top-[5.75rem]'>
          <BrandBadge
            backgroundColor='var(--dusted-peri)'
            textColor='var(--maritime-darkest)'
            className='gap-2 border border-dusted-peri/20 px-4 py-2 text-sm font-semibold shadow-[0_12px_28px_-22px_rgba(32,28,54,0.72)] sm:px-5 sm:py-2.5'
          >
            <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-maritime-darkest'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-maritime-darkest opacity-30' />
            </span>
            {currentOffer.label}
          </BrandBadge>
          <BrandBadge
            label={`Spar totalt kr ${Math.round(savingsAmount)}`}
            backgroundColor='var(--dusted-peri)'
            textColor='var(--maritime-darkest)'
            className='border border-dusted-peri/24 px-4 py-2 text-sm font-semibold shadow-[0_14px_32px_-24px_rgba(32,28,54,0.58)] sm:px-5 sm:py-2.5'
          />
        </div>
      )}

      <div className='flex items-baseline gap-3'>
        {showSavings ?
          <>
            <div className='text-maritime-blue'>
              <Price amount={priceAmount} currencyCode={currencyCode} />
            </div>

            {showBeforePrice && (
              <div className='text-lg text-maritime-blue/48 line-through'>
                <Price
                  amount={String(originalPriceToDisplay)}
                  currencyCode={currencyCode}
                />
              </div>
            )}
          </>
        : <div className='text-maritime-blue'>
            <Price amount={priceAmount} currencyCode={currencyCode} />
          </div>
        }
      </div>

      {showSavings && currentOffer.description && (
        <p className='text-sm text-maritime-blue/64'>
          {currentOffer.description}
        </p>
      )}

      {isSpecialEdition && shouldShowLimitedStockNotice && (
        <div className='relative overflow-hidden rounded-[1rem] border border-dusted-peri/24 bg-dusted-peri/12 p-4'>
          <div
            className='relative flex items-center gap-3'
            style={{ zIndex: 10 }}
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-full border border-maritime-blue/14 bg-maritime-blue text-cloud-dancer'>
              <ShieldAlert className='h-5 w-5' aria-hidden='true' />
            </div>
            <div>
              <p className='font-semibold text-maritime-blue'>
                Kun {limitedStockCount} igjen på lager!
              </p>
              <p className='text-sm text-maritime-blue/68'>
                Unik utgave - kommer ikke tilbake
              </p>
            </div>
          </div>
          <div
            className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-20 blur-2xl'
            style={{
              background:
                'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklab, var(--dusted-peri) 72%, transparent) 100%)'
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
