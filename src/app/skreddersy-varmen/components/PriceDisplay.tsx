// Path: src/app/skreddersy-varmen/components/PriceDisplay.tsx

import { CreditCard } from 'lucide-react'

interface PriceDisplayProps {
  price: number
  compareAtPrice?: number | null
  theme?: 'light' | 'dark'
}

export function PriceDisplay({
  price,
  compareAtPrice,
  theme = 'light'
}: PriceDisplayProps) {
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: 'NOK',
      maximumFractionDigits: 0
    })
      .format(amount)
      .replace('kr', '')
      .trim()

  const monthlyPrice = Math.round(price / 3)
  const isOnSale = compareAtPrice && compareAtPrice > price

  // Farge-logikk
  const textColor = theme === 'dark' ? 'text-[#F4F1EA]' : 'text-[#2A2A2A]'
  const subTextColor = theme === 'dark' ? 'text-[#F4F1EA]/70' : 'text-stone-500'
  const accentColor = theme === 'dark' ? 'text-white' : 'text-stone-700'

  return (
    <div className='flex flex-col items-start animate-in fade-in duration-500'>
      <div className='flex items-baseline gap-3 mb-1'>
        {isOnSale && (
          <span className='text-lg text-stone-400 line-through decoration-stone-400/50'>
            {formatPrice(compareAtPrice)},-
          </span>
        )}
        <span
          className={`text-4xl md:text-5xl font-serif font-medium ${textColor} tracking-tight`}
        >
          {formatPrice(price)},-
        </span>
      </div>

      <div className={`flex items-center gap-1.5 ${subTextColor} text-sm mt-1`}>
        <CreditCard className='w-3.5 h-3.5 opacity-70' />
        <span>
          Eller del opp:{' '}
          <span className={`font-medium ${accentColor}`}>
            {formatPrice(monthlyPrice)},- /mnd
          </span>
        </span>
      </div>
    </div>
  )
}
