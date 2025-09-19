import type { ReactNode } from 'react'

export const ProductGrid = ({ children }: { readonly children: ReactNode }) => (
  <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 py-12 px-4 lg:px-22 mx-auto'>
    {children}
  </div>
)
