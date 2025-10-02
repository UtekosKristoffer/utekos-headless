'use client'

import { useRecommendedProducts } from '@/lib/context/RecommendedProductsContext'
import { RecommendedItem } from './RecommendedItem'

export function EmptyCartRecommendations() {
  const products = useRecommendedProducts()

  if (!products || products.length === 0) {
    return (
      <div className='text-center text-muted-foreground'>
        <p className='text-base'>Handleposen din er tom</p>
        <p className='mt-1 text-sm'>Legg til produkter for å komme i gang.</p>
      </div>
    )
  }

  return (
    <div className='text-left'>
      <h4 className='text-base font-semibold mb-4'>
        Legg til for å starte din Utekos
      </h4>
      <div className='space-y-4'>
        {products.map(product => (
          <RecommendedItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
