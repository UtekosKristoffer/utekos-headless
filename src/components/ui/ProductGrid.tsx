import type { ReactNode } from 'react'

export const ProductGrid = ({ children }: { readonly children: ReactNode }) => <div className='grid grid-cols-1 gap-8 lg:grid-cols-10 lg:gap-16'>{children}</div>
export default ProductGrid
