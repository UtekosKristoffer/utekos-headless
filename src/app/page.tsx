// Path: src/app/page.tsx

import { notFound } from 'next/navigation'

import { getProducts } from '@/api/lib/products/getProducts'
import { ProductGrid } from '@/components/jsx/ProductGrid'
import { ProductCard } from '@/components/ProductCard'
import { handles } from '@/db/data/products/product-info'

const HomePage = async () => {
  const response = await getProducts()

  if (!response.success) {
    return notFound()
  }

  const products = response.body

  if (products.length === 0) {
    return notFound()
  }

  const featuredProducts = products.filter(product =>
    handles.includes(product.handle)
  )

  if (featuredProducts.length === 0) {
    return notFound()
  }

  return (
    <main className='container mx-auto px-4 pt-8'>
      <h1 className='text-3xl font-bold mb-8'>Utvalgte produkter</h1>
      <ProductGrid>
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </main>
  )
}

export default HomePage
