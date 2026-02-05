// Path: src/app/kampanje/comfyrobe/components/ComfyrobeCommerceFlow.tsx
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
  const [selectedSize, setSelectedSize] = useState<SizeOptionKey>('L')

  return (
    <>
      <SizeSelectorSection
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
      />
      <OfferSection
        productImageSrc={productImageSrc}
        selectedSize={selectedSize}
      />
    </>
  )
}
