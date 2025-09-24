// Path: src/app/produkter/page.tsx

import { getProducts } from '@/api/lib/products/getProducts'
import { ComparisonTeaser } from '@/app/handlehjelp/sammenlign-modeller/ComparisonTeaser'
import { HelpChooseSection } from '@/app/produkter/components/HelpChooseSection'
import { ProductTestimonial } from '@/app/produkter/components/ProductTestimonial'
import { ProductGrid } from '@/components/jsx/ProductGrid'
import { ProductCard } from '@/components/ProductCard/ProductCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { handles } from '@/db/data/products/product-info'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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
      <section className='text-center mb-16'>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
          Kolleksjonen for kompromissløs komfort
        </h1>
        <p className='mt-4 max-w-2xl mx-auto text-lg text-muted-foreground'>
          Hvert plagg er skapt for ett formål: å la deg forlenge de gode
          øyeblikkene ute. Utforsk vår kolleksjon og finn den perfekte
          følgesvennen for din utekos.
        </p>
      </section>

      <section className='mb-24'>
        <HelpChooseSection />
      </section>

      <section className='mb-24 max-w-3xl mx-auto'>
        <ProductTestimonial />
      </section>

      <section className='mb-24'>
        <ComparisonTeaser />
      </section>

      <section className='mb-24'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Hele kolleksjonen
          </h2>
        </div>
        <ProductGrid>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </section>

      <section>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Card className='border-neutral-800 bg-sidebar-foreground'>
            <CardContent className='p-8'>
              <h3 className='text-xl font-semibold'>Usikker på størrelsen?</h3>
              <p className='mt-2 text-muted-foreground'>
                Se vår størrelsesguide og finn den perfekte passformen for deg.
              </p>
              <Button asChild className='mt-4'>
                <Link href='/handlehjelp/storrelsesguide'>
                  Til størrelsesguiden
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className='border-neutral-800 bg-sidebar-foreground'>
            <CardContent className='p-8'>
              <h3 className='text-xl font-semibold'>
                Nysgjerrig på teknologien?
              </h3>
              <p className='mt-2 text-muted-foreground'>
                Les om materialene og designfilosofien som holder deg varm.
              </p>
              <Button asChild className='mt-4'>
                <Link href='/handlehjelp/teknologi-materialer'>
                  Utforsk materialene
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default ProductsPage
