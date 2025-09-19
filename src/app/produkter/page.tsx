// Path: src/app/produkter/page.tsx

import { notFound } from 'next/navigation'

import { getProducts } from '@/api/lib/products/getProducts'
import { ProductCard } from '@/components/ProductCard'
import { handles } from '@/db/data/products/product-info'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kolleksjon: Komfortplagg for hytteliv & utekos | Utekos',
  description:
    'Utforsk hele kolleksjonen av komfortplagg fra Utekos. Våre varme og slitesterke produkter er skapt for å forlenge de gode stundene på hytta, i bobilen eller på kjølige kvelder.',
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    url: 'https://utekos.no/produkter',
    siteName: 'Utekos',
    title: 'Hele kolleksjonen fra Utekos',
    description:
      'Varme og komfortable plagg for deg som elsker utelivet på hytta, i bobilen eller båten.',
    images: [
      {
        url: '/og-image.jpg', // Bruker standardbilde for deling, da dette er en samleside
        width: 1200,
        height: 630,
        alt: 'Kolleksjonen av komfortplagg fra Utekos'
      }
    ]
  }
}

const ProductsPage = async () => {
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
