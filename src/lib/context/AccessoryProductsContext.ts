'use client'

import type { ShopifyProduct } from '@types'
import { createContext, useContext } from 'react'

const AccessoryProductsContext = createContext<ShopifyProduct[] | null>(null)

export const AccessoryProductsProvider = AccessoryProductsContext.Provider

export const useAccessoryProducts = () => {
  const context = useContext(AccessoryProductsContext)
  if (context === null) {
    throw new Error(
      'useAccessoryProducts must be used within an AccessoryProductsProvider'
    )
  }
  return context
}
