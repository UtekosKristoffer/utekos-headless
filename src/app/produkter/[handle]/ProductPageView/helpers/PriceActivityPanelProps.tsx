// Path: src/app/produkter/[handle]/ProductPageView/PriceActivityPanel.tsx
// Premium-versjon med ekstra visuell polish og mikrointeraksjoner
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

const LAUNCH_OFFERS = {
  'utekos-techdown': {
    discountAmount: 449,
    discountPercent: 10,
    label: 'Lanseringstilbud',
    endDate: '2025-11-30' // Valgfritt: sett sluttdato
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
    <div className='relative rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6 ring-1 ring-white/5 backdrop-blur-sm'>
      {/* Glow-effekt bak badge */}
      {hasLaunchOffer && (
        <div className='absolute -top-3 left-6 h-24 w-64 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 blur-2xl' />
      )}

      {/* Lanseringstilbud badge */}
      {hasLaunchOffer && (
        <div className='relative z-10 mb-6 animate-in fade-in-0 slide-in-from-top-2 duration-500'>
          <LaunchOfferBadge
            label={launchOffer.label}
            discountPercent={launchOffer.discountPercent}
          />
        </div>
      )}

      {/* Pris-seksjon */}
      <div className='relative z-10 flex flex-col gap-3'>
        {/* Original pris med rabatt-indikator */}
        {hasLaunchOffer && originalPrice && (
          <div className='flex items-center gap-3 animate-in fade-in-0 slide-in-from-left-2 duration-500 delay-100'>
            <span className='text-xl text-muted-foreground/50 line-through decoration-2 decoration-red-500/50'>
              {formatPrice(originalPrice.toString(), currencyCode)}
            </span>
            <div className='group flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 px-3.5 py-1.5 ring-1 ring-red-500/30 transition-all hover:ring-red-500/50'>
              <svg
                className='h-4 w-4 text-red-400 transition-transform group-hover:scale-110'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2.5}
                  d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                />
              </svg>
              <span className='text-sm font-bold text-red-400'>
                −{launchOffer.discountAmount} kr
              </span>
            </div>
          </div>
        )}

        {/* Nåværende pris med gradient */}
        <div className='flex items-end gap-4 animate-in fade-in-0 slide-in-from-left-2 duration-500 delay-200'>
          <div className='flex flex-col'>
            <span className='text-xs font-medium uppercase tracking-wider text-muted-foreground/60 mb-1'>
              {hasLaunchOffer ? 'Din pris' : 'Pris'}
            </span>
            <h3
              className={`text-5xl font-black tracking-tight transition-all ${
                hasLaunchOffer ?
                  'bg-gradient-to-br from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-lg'
                : 'text-foreground'
              }`}
              style={
                hasLaunchOffer ?
                  {
                    filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))'
                  }
                : undefined
              }
            >
              {formatPrice(priceAmount, currencyCode)}
            </h3>
          </div>

          {/* Rabatt-prosent bubble */}
          {hasLaunchOffer && (
            <div className='flex flex-col items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 p-[2px] animate-in zoom-in-50 duration-500 delay-300'>
              <div className='flex h-full w-full flex-col items-center justify-center rounded-full bg-slate-900'>
                <span className='text-xs font-bold text-emerald-400'>SPAR</span>
                <span className='text-lg font-black text-white leading-none'>
                  {launchOffer.discountPercent}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Tilbuds-beskrivelse med ikon */}
        {hasLaunchOffer && (
          <div className='flex items-center gap-2 animate-in fade-in-0 slide-in-from-left-2 duration-500 delay-300'>
            <svg
              className='h-4 w-4 text-emerald-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <p className='text-sm font-medium text-muted-foreground'>
              Spesialpris kun ved lansering 🎉
            </p>
          </div>
        )}
      </div>

      {/* Aktivitet og lager-info */}
      {(activityNode || (limitedStockCount && limitedStockCount > 0)) && (
        <div className='relative z-10 mt-6 flex flex-col gap-3 border-t border-white/5 pt-6'>
          {activityNode}

          {limitedStockCount && limitedStockCount > 0 && (
            <div className='group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-4 py-3.5 ring-1 ring-amber-500/20 transition-all hover:ring-amber-500/40'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20'>
                <svg
                  className='h-5 w-5 text-amber-400 transition-transform group-hover:scale-110'
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
              </div>
              <div className='flex flex-col'>
                <span className='text-sm font-bold text-amber-400'>
                  Kun {limitedStockCount} igjen
                </span>
                <span className='text-xs text-amber-400/60'>
                  Begrenset lager
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Subtil glow-effekt i bunnen */}
      {hasLaunchOffer && (
        <div className='absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent' />
      )}
    </div>
  )
}
