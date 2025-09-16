// Fil: src/components/product/ProductGrid.tsx
import { ProductCard } from '@/components/ProductCard'
import type { ProductGridProps } from '@types'

export function CardGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <p>Fant ingen produkter.</p>
  }

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
