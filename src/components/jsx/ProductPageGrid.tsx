// Path: src/components/jsx/ProductGrid.tsx
import type { ReactNode } from 'react'
export const ProductPageGrid = ({ children }: { readonly children: ReactNode }) => (
  <div className='grid grid-cols-1 gap-8 md:grid-cols-12'>{children}</div>
)
