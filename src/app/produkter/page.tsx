// Path: src/app/produkter/page.tsx

import { notFound } from 'next/navigation'

import { getProducts } from '@/api/lib/products/getProducts'
import { ProductCard } from '@/components/ProductCard'
import { handles } from '@/db/data/products/product-info'

const ProductsPage = async () => {
  const response = await getProducts()

  if (!response.success) {
    console.error('Failed to fetch products:', response.error)
    return notFound()
  }

  const products = response.body

  if (products.length === 0) {
    console.log('No products found')
    return notFound()
  }

  const featuredProducts = products.filter(product =>
    handles.includes(product.handle)
  )

  if (featuredProducts.length === 0) {
    console.log('No featured products found for handles:', handles)
    return notFound()
  }

  return (
    <main className='container mx-auto px-4'>
      <h1 className='text-3xl font-bold mb-8'>Utvalgte produkter</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}

export default ProductsPage
