// src/app/products/page.tsx
import { getProducts } from '@/lib/helpers/products/fetchProducts'
import { CardGrid } from '@/components/jsx/'

export default async function AllProductsPage() {
  const products = await getProducts([
    'utekos-dun',
    'comfyrobe',
    'utekos-mikrofiber',
    'special-edition'
  ])
  if (!products || products.length === 0) {
    return (
      <main className='container mx-auto py-12'>
        <h1 className='text-4xl font-bold mb-8'>Alle Produkter</h1>
        <p>Ingen produkter funnet.</p>
      </main>
    )
  }

  return (
    <main className='container mx-auto py-12'>
      <h1 className='text-4xl font-bold mb-8'>Alle Produkter</h1>
      <CardGrid products={products} />
    </main>
  )
}
