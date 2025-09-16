import type { ProductContextType } from '@/api/shopify/types/types'
import { createContext } from 'react'

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
)
