'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'

interface OfferGalleryProps {
  name: string
  mainImageSrc: string
}

const EXTRA_IMAGES = [
  '/webp/comfy-front-open-1500-2000.webp',
  '/webp/comfy-back-1500-2000.webp',
  '/webp/comfy-inner-1500-2000.webp'
]

export function OfferGallery({ name, mainImageSrc }: OfferGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const images = [mainImageSrc, ...EXTRA_IMAGES]

  const handlePrev = () => {
    setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className='flex flex-col h-full w-full'>
      {/* Main Image Container */}
      <div className='relative w-full aspect-[4/5] lg:aspect-square overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-800/50 to-slate-900/50 group shadow-2xl shadow-black/20 z-20'>
        <div className='absolute top-4 left-4 z-10'>
          <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-sky-900/80 backdrop-blur-md border border-sky-700/50 rounded-full shadow-lg'>
            <ShieldCheck className='w-3.5 h-3.5 text-sky-400' />
            <span className='text-[10px] font-bold text-white tracking-wider uppercase'>
              UNISEX
            </span>
          </div>
        </div>

        <div className='absolute inset-0 bg-sky-500/5 rounded-full blur-[100px] opacity-40 animate-pulse' />

        <Image
          src={images[selectedIndex] ?? mainImageSrc}
          alt={`${name} - view ${selectedIndex + 1}`}
          fill
          className='object-contain p-2 lg:p-6 drop-shadow-2xl transition-all duration-500 ease-in-out'
          sizes='(max-width: 768px) 100vw, 50vw'
          priority={selectedIndex === 0}
        />

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className='absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-sky-600 hover:border-sky-500 transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 translate-x-[-10px] group-hover:translate-x-0'
          aria-label='Previous image'
        >
          <ChevronLeft className='w-5 h-5' />
        </button>

        <button
          onClick={handleNext}
          className='absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-sky-600 hover:border-sky-500 transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 translate-x-[10px] group-hover:translate-x-0'
          aria-label='Next image'
        >
          <ChevronRight className='w-5 h-5' />
        </button>
      </div>

      {/* Thumbnails Container */}
      <div className='mt-6 w-full'>
        {/* ENDRING HER: Lagt til p-3 for å gi plass til skalering og skygge uten at det klippes */}
        <div className='flex gap-3 overflow-x-auto p-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:"none"] [scrollbar-width:"none"]'>
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              // Fjernet 'relative' herfra da det ikke er nødvendig og kan skape stacking context problemer
              className={`shrink-0 w-[80px] lg:w-[100px] aspect-[3/4] snap-center rounded-xl overflow-hidden border transition-all duration-300 ${
                selectedIndex === index ?
                  'border-sky-500 ring-2 ring-sky-500/20 scale-105 shadow-lg shadow-sky-900/20'
                : 'border-slate-800/60 bg-slate-900/50 hover:border-slate-600 opacity-70 hover:opacity-100'
              }`}
            >
              <div className='relative w-full h-full'>
                <Image
                  src={img}
                  alt={`${name} thumbnail ${index + 1}`}
                  fill
                  quality={95}
                  className='object-cover'
                  sizes='100px'
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
