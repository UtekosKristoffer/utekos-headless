'use client'

import React, { useState } from 'react'
import { SizeSelectorSection } from './SizeSelectorSection'
import { OfferSection } from './OfferSection'
import type { SizeOptionKey } from '../utils/sizeSelectorData'
interface ComfyrobeCommerceFlowProps {
  productImageSrc: string
}

export function ComfyrobeCommerceFlow({
  productImageSrc
}: ComfyrobeCommerceFlowProps) {
  const [selectedSize, setSelectedSize] = useState<SizeOptionKey>('XS/S')

  return (
    <>
      {/* Seksjon 1: Velg Størrelse (Oppdaterer state) */}
      <SizeSelectorSection
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
      />

      {/* Seksjon 2: Tilbud & Kasse (Leser state) */}
      <OfferSection
        productImageSrc={productImageSrc}
        selectedSize={selectedSize}
      />
    </>
  )
}
