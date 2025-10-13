// Path: src/app/produkter/[handle]/ProductPageView/components/PriceActivityPanel.tsx
'use client'

import { Price } from '@/components/jsx/Price'
import { ShieldAlert } from 'lucide-react'
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

  return (
    <section aria-label='Pris og tilgjengelighet' className='space-y-4'>
      <Price amount={priceAmount} currencyCode={currencyCode} />

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
