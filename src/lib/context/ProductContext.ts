import type { ProductContextType } from '@types'
import { createContext } from 'react'

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
)
