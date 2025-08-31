// Path: src/components/ui/Price.tsx

'use client'

import formatPrice from '@/lib/utils/formatPrice'
interface PriceProps {
  amount: string
  currencyCode: string
}

function Price({ amount, currencyCode }: PriceProps) {
  return (
    <p className='text-2xl font-semibold'>
      <span className='sr-only'>Pris:</span>
      {formatPrice({ amount, currencyCode })}
    </p>
  )
}

export default Price
