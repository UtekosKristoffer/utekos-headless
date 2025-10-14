// Path: src/app/produkter/[handle]/ProductPageView/PriceActivityPanel.tsx
'use client'
import { LaunchOfferBadge } from './LaunchOfferBadge'
import { formatPrice } from '@/lib/helpers/formatPrice'
interface PriceActivityPanelProps {
  productHandle: string
  priceAmount: string
  currencyCode: string
  limitedStockCount?: number
  activityNode?: React.ReactNode
}

// Konfigurasjon for lanseringstilbud
const LAUNCH_OFFERS = {
  'utekos-techdawn': {
    discountAmount: 200,
    discountPercent: 10,
    label: 'Lanseringstilbud'
  }
} as const

export default function PriceActivityPanel({
  productHandle,
  priceAmount,
  currencyCode,
  limitedStockCount,
  activityNode
}: PriceActivityPanelProps) {
  const launchOffer = LAUNCH_OFFERS[productHandle as keyof typeof LAUNCH_OFFERS]
  const currentPrice = parseFloat(priceAmount)

  const originalPrice =
    launchOffer ? currentPrice + launchOffer.discountAmount : null
  const hasLaunchOffer = !!launchOffer

  return (
    <div className='relative'>
      {/* Lanseringstilbud badge øverst */}
      {hasLaunchOffer && (
        <div className='mb-4 animate-in fade-in-0 slide-in-from-top-2 duration-500'>
          <LaunchOfferBadge
            label={launchOffer.label}
            discountPercent={launchOffer.discountPercent}
          />
        </div>
      )}

      {/* Pris-seksjon */}
      <div className='flex flex-col gap-2'>
        {/* Original pris (gjennomstreket) */}
        {hasLaunchOffer && originalPrice && (
          <div className='flex items-center gap-3'>
            <span className='text-lg text-muted-foreground/60 line-through decoration-2'>
              {formatPrice(originalPrice.toString(), currencyCode)}
            </span>
            <div className='flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 ring-1 ring-red-500/20'>
              <svg
                className='h-3.5 w-3.5 text-red-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                />
              </svg>
              <span className='text-sm font-semibold text-red-400'>
                −{launchOffer.discountAmount} kr
              </span>
            </div>
          </div>
        )}

        {/* Nåværende pris */}
        <div className='flex items-baseline gap-3'>
          <h3
            className={`text-4xl font-bold tracking-tight ${
              hasLaunchOffer ?
                'bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent'
              : 'text-foreground'
            }`}
          >
            {formatPrice(priceAmount, currencyCode)}
          </h3>

          {hasLaunchOffer && (
            <div className='flex flex-col'>
              <span className='text-xs font-medium uppercase tracking-wider text-emerald-400'>
                Spar {launchOffer.discountPercent}%
              </span>
            </div>
          )}
        </div>

        {/* Tilbuds-countdown eller beskrivelse */}
        {hasLaunchOffer && (
          <p className='text-sm text-muted-foreground'>
            Begrenset tilbud ved lansering 🎉
          </p>
        )}
      </div>

      {/* Eksisterende aktivitet og lager-info */}
      {(activityNode || (limitedStockCount && limitedStockCount > 0)) && (
        <div className='mt-6 flex flex-col gap-3'>
          {activityNode}

          {limitedStockCount && limitedStockCount > 0 && (
            <div className='flex items-center gap-2 rounded-lg bg-amber-500/10 px-4 py-3 ring-1 ring-amber-500/20'>
              <svg
                className='h-5 w-5 text-amber-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
              <span className='text-sm font-medium text-amber-400'>
                Kun {limitedStockCount} igjen på lager
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
