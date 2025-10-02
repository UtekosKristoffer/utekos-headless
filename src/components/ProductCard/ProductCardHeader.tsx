// Path: src/components/ProductCard/ProductCardHeader.tsx
'use client'

import { CardHeader, CardTitle } from '@/components/ui/card'
import type { ShopifyProduct } from '@types'
import type { Route } from 'next'
import Link from 'next/link'
import type React from 'react'
import { ProductVariantSelector } from './ProductVariantSelector'

interface ProductCardHeaderProps {
  title: string
  options: ShopifyProduct['options']
  colorHexMap: Map<string, string>
  selectedOptions: Record<string, string>
  onOptionChange: React.Dispatch<React.SetStateAction<Record<string, string>>>
  productUrl: Route
}

export function ProductCardHeader({
  title,
  options,
  colorHexMap,
  selectedOptions,
  onOptionChange,
  productUrl
}: ProductCardHeaderProps) {
  return (
    <CardHeader className='flex-grow border-t border-neutral-800 p-6 pb-4'>
      <Link href={productUrl}>
        <CardTitle className='mb-3 text-balance text-xl font-semibold text-white line-clamp-2'>
          {title}
        </CardTitle>
      </Link>
      <ProductVariantSelector
        options={options}
        colorHexMap={colorHexMap}
        selectedOptions={selectedOptions}
        onOptionChange={onOptionChange}
      />
    </CardHeader>
  )
}
