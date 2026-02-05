import React from 'react'
import Image from 'next/image'
import { Check, ShieldCheck } from 'lucide-react'
import type { ProductOffer } from '../utils/offerData'

interface OfferProductProps {
  product: ProductOffer
  imageSrc: string
}

export function OfferProduct({ product, imageSrc }: OfferProductProps) {
  return (
    <div className='relative w-full h-full flex flex-col justify-center'>
      <div className='absolute top-0 left-0 z-10'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-sky-900/80 backdrop-blur-md border border-sky-700/50 rounded-full shadow-lg'>
          <ShieldCheck className='w-4 h-4 text-sky-400' />
          <span className='text-xs font-bold text-white tracking-wider uppercase'>
            UNISEX
          </span>
        </div>
      </div>

      <div className='relative w-full aspect-[4/5] lg:aspect-square mb-6 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-800/50 to-slate-900/50'>
        <div className='absolute inset-0 bg-sky-500/10 rounded-full blur-[100px] opacity-40 animate-pulse' />
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className='object-contain p-4 drop-shadow-2xl'
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      </div>

      <div className='space-y-3 px-2'>
        <h3 className='text-2xl lg:text-3xl font-bold text-white'>
          {product.name}
        </h3>
        <div className='flex flex-wrap gap-3'>
          {product.features.map((feature, i) => (
            <div
              key={i}
              className='flex items-center gap-1.5 text-sm text-slate-400'
            >
              <Check className='w-4 h-4 text-sky-500' />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
