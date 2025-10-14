// Path: src/app/produkter/[handle]/ProductPageView/LaunchOfferBadge.tsx
// Versjon uten framer-motion avhengighet
'use client'

interface LaunchOfferBadgeProps {
  label: string
  discountPercent: number
}

export function LaunchOfferBadge({
  label,
  discountPercent
}: LaunchOfferBadgeProps) {
  return (
    <div className='inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:ring-white/20 hover:scale-105'>
      {/* Pulserende indikator */}
      <div className='relative flex h-2 w-2'>
        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
        <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500' />
      </div>

      {/* Badge-tekst */}
      <div className='flex items-center gap-2'>
        <span className='text-sm font-semibold text-white'>{label}</span>
        <div className='h-4 w-px bg-white/20' />
        <span className='text-sm font-bold text-emerald-400'>
          {discountPercent}% RABATT
        </span>
      </div>

      {/* Ikon */}
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
          d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        />
      </svg>
    </div>
  )
}
