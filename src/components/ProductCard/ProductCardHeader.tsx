// Path: src/components/ProductCard/ProductCardHeader.tsx
'use client'

import { CardHeader, CardTitle } from '@/components/ui/card'
import type { ShopifyProduct } from '@types'
import type React from 'react'
import { ProductVariantSelector } from './ProductVariantSelector'

interface ProductCardHeaderProps {
  title: string
  options: ShopifyProduct['options']
  colorMap: Record<string, { name: string; code: string }>
  selectedOptions: Record<string, string>
  onOptionChange: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

export function ProductCardHeader({
  title,
  options,
  colorMap,
  selectedOptions,
  onOptionChange
}: ProductCardHeaderProps) {
  return (
    <CardHeader className='flex-grow border-t border-neutral-800 p-6 pb-4'>
      <CardTitle className='text-xl font-semibold text-white line-clamp-2 mb-3 text-balance'>
        {title}
      </CardTitle>
      <ProductVariantSelector
        options={options}
        colorMap={colorMap}
        selectedOptions={selectedOptions}
        onOptionChange={onOptionChange}
      />
    </CardHeader>
  )
}
