import React from 'react'
import { Check } from 'lucide-react'
import type { ProductOffer } from '../utils/offerData'

interface OfferProductProps {
  product: ProductOffer
}

export function OfferProduct({ product }: OfferProductProps) {
  return (
    <div className='flex flex-col space-y-6'>
      <h1 className='text-3xl lg:text-5xl font-bold text-white tracking-tight'>
        {product.name}
      </h1>

      <div className='flex flex-wrap gap-2'>
        {product.features.map((feature, i) => (
          <div
            key={i}
            className='flex items-center gap-1.5 text-sm font-medium text-slate-300 bg-slate-900/60 border border-slate-800/50 px-3 py-1.5 rounded-full'
          >
            <Check className='w-3.5 h-3.5 text-sky-400' />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <p className='text-slate-400 text-lg leading-relaxed border-l-2 border-sky-500/30 pl-4'>
        Det ultimate ytterplagget for nordiske forhold. Designet med
        SherpaCore™ og HydroGuard™ for å holde deg varm og tørr uansett vær.
      </p>
    </div>
  )
}
