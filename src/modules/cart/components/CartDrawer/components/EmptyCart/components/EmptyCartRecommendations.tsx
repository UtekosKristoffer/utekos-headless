// Path: src/components/cart/EmptyCart/EmptyCartRecommendations.tsx

import { useQuery } from '@tanstack/react-query'
import { RecommendedItem } from '@/components/cart/CartDrawer/components/CartBody/EmptyCart/components/RecommendedItem'
import type { ShopifyProduct } from 'types/integrations/shopify/ShopifyProduct'
import { getRecommendedProducts } from '@/modules/products/services/getRecommendedProducts'

export function EmptyCartRecommendations() {
  const { data: products } = useQuery<ShopifyProduct[]>({
    queryKey: ['products', 'recommended'],
    queryFn: getRecommendedProducts
  })

  if (!products || products.length === 0) {
    return (
      <div className='text-center text-muted-foreground'>
        <p className='text-base'>Handlekurven din er tom</p>
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
