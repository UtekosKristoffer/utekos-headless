import type { ShopifyProduct } from '@types'
import { useAlternatingColors } from 'src/hooks/useAlternatingColors'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products }: { products: ShopifyProduct[] }) {
  const colorHints = useAlternatingColors(products)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
