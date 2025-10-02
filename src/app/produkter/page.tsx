// Path: src/app/produkter/page.tsx

import { getProducts } from '@/api/lib/products/getProducts'
import { ComparisonTeaser } from '@/app/handlehjelp/sammenlign-modeller/sections/ComparisonTeaser'
import { HelpChooseSection } from '@/app/produkter/components/HelpChooseSection'
import { ProductTestimonial } from '@/app/produkter/components/ProductTestimonial'
import { ProductCarousel } from '@/components/ProductCard/ProductCarousel'
import { Suspense } from 'react'
import { handles } from '@/db/data/products/product-info'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { ProductsPageFooter } from '@/app/produkter/components/ProductsPageFooter'
import { ProductsPageHeader } from '@/app/produkter/components/ProductsPageHeader'

import { ProductGridSkeleton } from '@/components/frontpage/Skeletons/ProductGridSkeleton'
import { HelpChooseSectionSkeleton } from '@/components/frontpage/Skeletons/HelpChooseSectionSkeleton'
import { ProductTestimonialSkeleton } from '@/components/frontpage/Skeletons/ProductTestimonialSkeleton'
import { ComparisonTeaserSkeleton } from '@/components/frontpage/Skeletons/ComparisonTeaserSkeleton'
import { ProductsPageFooterSkeleton } from '@/components/frontpage/Skeletons/ProductsPageFooterSkeleton'
import { ProductsPageHeaderSkeleton } from '@/components/frontpage/Skeletons/ProductsPageHeaderSkeleton'
// Wait: import { ProductComparisonSection } from './components/ProductComparisonSection'

export const metadata: Metadata = {
  title: 'Kolleksjon: Komfortplagg for hytteliv & utekos | Utekos',
  description:
    'Utforsk hele kolleksjonen av komfortplagg fra Utekos. Våre varme og slitesterke produkter er skapt for å forlenge de gode stundene på hytten, i bobilen eller på kjølige kvelder.',
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
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kolleksjonen av komfortplagg fra Utekos'
      }
    ]
  }
}

const ProductsPage = async () => {
  const response = await getProducts()
  if (!response.success || !response.body || response.body.length === 0)
    return notFound()

  const products = response.body
  const featuredProducts = products.filter(product =>
    handles.includes(product.handle)
  )
  if (featuredProducts.length === 0) return notFound()

  return (
    <main className='container mx-auto px-4 py-16 sm:py-24'>
      <Suspense fallback={<ProductsPageHeaderSkeleton />}>
        <ProductsPageHeader />
      </Suspense>

      <Suspense fallback={<HelpChooseSectionSkeleton />}>
        <HelpChooseSection />
      </Suspense>

      <Suspense fallback={<ProductTestimonialSkeleton />}>
        <ProductTestimonial />
      </Suspense>

      <Suspense fallback={<ComparisonTeaserSkeleton />}>
        <ComparisonTeaser />
      </Suspense>

      <section className='mb-24'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Hele kolleksjonen
          </h2>
        </div>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductCarousel products={products} />
        </Suspense>
      </section>

      <Suspense fallback={<ProductsPageFooterSkeleton />}>
        <ProductsPageFooter />
      </Suspense>
    </main>
  )
}

export default ProductsPage
