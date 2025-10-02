'use client'

import type { ShopifyProduct } from '@types'
import { createContext, useContext } from 'react'

export const RecommendedProductsContext = createContext<
  ShopifyProduct[] | null
>(null)

export const useRecommendedProducts = () => {
  const context = useContext(RecommendedProductsContext)
  if (context === null) {
    throw new Error(
      'useRecommendedProducts must be used within a RecommendedProductsProvider'
    )
  }
  return context
}
