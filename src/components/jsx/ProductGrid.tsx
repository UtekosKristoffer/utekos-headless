import type { ReactNode } from 'react'

export const ProductGrid = ({ children }: { readonly children: ReactNode }) => (
  <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-16'>
    {children}
  </div>
)
