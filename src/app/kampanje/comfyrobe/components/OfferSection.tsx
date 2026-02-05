'use client'

import React, { useState } from 'react'
import { OfferProduct } from './OfferProduct'
import { UpsellItem } from './UpsellItem'
import { CheckoutPanel } from './CheckoutPanel'
import { MAIN_PRODUCT, UPSELL_PRODUCT } from '../utils/offerData'
import { SIZE_DATA, type SizeOptionKey } from '../utils/sizeSelectorData'

interface OfferSectionProps {
  productImageSrc: string
  selectedSize: SizeOptionKey
}

export function OfferSection({
  productImageSrc,
  selectedSize
}: OfferSectionProps) {
  const [upsellSelected, setUpsellSelected] = useState(false)

  // Henter visningsnavn direkte fra datakilden (S -> Small, L -> Large)
  const displaySizeName = SIZE_DATA[selectedSize].fullName

  return (
    <section className='relative min-h-screen bg-[#0a0a0a] py-20 lg:py-32 overflow-hidden flex items-center'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-sky-900/10 rounded-full blur-[150px] pointer-events-none' />

      <div className='container mx-auto px-4 relative z-10'>
        <div className='mb-12 lg:mb-20 text-center'>
          <h2 className='text-3xl lg:text-6xl font-bold text-white mb-4'>
            Sikre din størrelse:{' '}
            <span className='text-sky-400'>{displaySizeName}</span>
          </h2>
          <p className='text-slate-400 text-lg max-w-2xl mx-auto'>
            Fri frakt er aktivert. Legg til kompresjonstrekket for den ultimate
            opplevelsen.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto items-start'>
          <div className='lg:col-span-5 h-full'>
            <OfferProduct product={MAIN_PRODUCT} imageSrc={productImageSrc} />
          </div>

          <div className='lg:col-span-7 flex flex-col gap-6'>
            <div className='grid grid-cols-1 gap-4'>
              <UpsellItem
                product={UPSELL_PRODUCT}
                isSelected={upsellSelected}
                onToggle={() => setUpsellSelected(!upsellSelected)}
              />
            </div>

            <CheckoutPanel
              mainProduct={MAIN_PRODUCT}
              upsellProduct={UPSELL_PRODUCT}
              isUpsellSelected={upsellSelected}
              selectedSize={selectedSize}
              productImageSrc={productImageSrc}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
