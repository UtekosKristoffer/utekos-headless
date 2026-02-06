'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Check, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProductOffer } from '../utils/offerData'

interface OfferProductProps {
  product: ProductOffer
  imageSrc: string
}

const EXTRA_IMAGES = [
  '/webp/comfy-front-open-1500-2000.webp',
  '/webp/comfy-back-1500-2000.webp',
  '/webp/comfy-inner-1500-2000.webp'
]

export function OfferProduct({ product, imageSrc }: OfferProductProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const images = [imageSrc, ...EXTRA_IMAGES]

  const handlePrev = () => {
    setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

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

      <div className='relative w-full aspect-[4/5] lg:aspect-square mb-6 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-800/50 to-slate-900/50 group'>
        <div className='absolute inset-0 bg-sky-500/10 rounded-full blur-[100px] opacity-40 animate-pulse' />

        <Image
          src={images[selectedIndex] ?? imageSrc}
          alt={`${product.name} - view ${selectedIndex + 1}`}
          fill
          className='object-contain p-4 drop-shadow-2xl transition-all duration-500 ease-in-out'
          sizes='(max-width: 768px) 100vw, 50vw'
          priority={selectedIndex === 0}
        />

        <button
          onClick={handlePrev}
          className='absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-sky-600 hover:border-sky-500 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100'
          aria-label='Previous image'
        >
          <ChevronLeft className='w-6 h-6' />
        </button>

        <button
          onClick={handleNext}
          className='absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-sky-600 hover:border-sky-500 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100'
          aria-label='Next image'
        >
          <ChevronRight className='w-6 h-6' />
        </button>
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

      <div className='mt-8 space-y-3'>
        <p className='text-xs font-medium text-slate-500 uppercase tracking-wider px-2'>
          Galleri
        </p>
        <div className='flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:"none"] [scrollbar-width:"none"] -mx-4 px-4 lg:mx-0 lg:px-0'>
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative shrink-0 w-[100px] aspect-[3/4] snap-center rounded-xl overflow-hidden border transition-all duration-300 ${
                selectedIndex === index ?
                  'border-sky-500 ring-2 ring-sky-500/20 scale-105 z-10'
                : 'border-slate-800/60 bg-slate-900/50 hover:border-slate-600'
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                fill
                className='object-cover'
                sizes='100px'
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
