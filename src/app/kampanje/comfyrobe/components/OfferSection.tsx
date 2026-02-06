'use client'

import React, { useState } from 'react'
import { OfferProduct } from './OfferProduct'
import { OfferGallery } from './OfferGallery'
import { OfferSpecs } from './OfferSpecs'
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

  const displaySizeName = SIZE_DATA[selectedSize].fullName

  return (
    <section className='relative min-h-screen bg-[#0a0a0a] py-12 lg:py-24 overflow-hidden'>
      {/* Bakgrunnseffekt */}
      <div className='absolute top-1/4 left-0 w-[60vw] h-[60vw] bg-sky-900/10 rounded-full blur-[150px] pointer-events-none' />

      <div className='w-full max-w-[1600px] mx-auto px-4 md:px-8 relative z-10'>
        {/* Seksjonsoverskrift */}
        <div className='mb-12 text-center lg:text-left lg:mb-16'>
          <h2 className='text-2xl lg:text-4xl font-bold text-white mb-3'>
            Sikre din størrelse:{' '}
            <span className='text-sky-400'>{displaySizeName}</span>
          </h2>
          <p className='text-slate-400 text-base lg:text-lg'>
            Fri frakt er aktivert. Legg til kompresjonstrekket for den ultimate
            opplevelsen.
          </p>
        </div>

        {/* TOPP SEKSJON: Bilder vs Info/Kjøp */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start mb-20 lg:mb-32'>
          {/* VENSTRE: Galleri (Tar litt mer plass for å gi bildet rom) */}
          <div className='lg:col-span-7 w-full'>
            <OfferGallery
              name={MAIN_PRODUCT.name}
              mainImageSrc={productImageSrc}
            />
          </div>

          {/* HØYRE: Produktinfo & Checkout */}
          <div className='lg:col-span-5 relative'>
            <div className='lg:sticky lg:top-8 flex flex-col gap-8'>
              <OfferProduct product={MAIN_PRODUCT} />

              <div className='flex flex-col gap-4'>
                <UpsellItem
                  product={UPSELL_PRODUCT}
                  isSelected={upsellSelected}
                  onToggle={() => setUpsellSelected(!upsellSelected)}
                />

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
        </div>

        {/* BUNN SEKSJON: Spesifikasjoner (Full bredde container) */}
        <div className='w-full max-w-6xl mx-auto'>
          <OfferSpecs />
        </div>
      </div>
    </section>
  )
}
