// Path: src/app/produkter/[handle]/page.tsx
import { getProduct } from '@/api/lib/products/getProduct'
import { ProductPageController } from '@/app/produkter/[handle]/ProductPageController/ProductPageController'
import { ProductPageSkeleton } from '@/app/produkter/[handle]/ProductPageSkeleton/ProductPageSkeleton'
import { ProductProvider } from '@/components/providers/ProductProvider'
import { reshapeMetaobject } from '@/lib/utils/reshapeMetaobject'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

type MetaDataProps = {
  params: Promise<{ handle: string }>
}

export async function generateMetadata(
  { params }: MetaDataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const handle = (await params).handle

  const product = await getProduct(handle)

  if (!product) {
    return {
      title: 'Produkt ikke funnet',
      description: 'Dette produktet er dessverre ikke tilgjengelig.'
    }
  }
  const seoTitle = product.seo.title || product.title
  const seoDescription = product.seo.description || product.description
  const imageUrl = product.featuredImage?.url || '/og-image.jpg'

  return {
    metadataBase: new URL('https://utekos.no'),
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `/produkter/${handle}`
    },
    openGraph: {
      type: 'website',
      locale: 'no_NO',
      url: `/produkter/${handle}`,
      siteName: 'Utekos',
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl]
    }
  }
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>
}) {
  const params = await props.params
  const product = await getProduct(params.handle)

  if (!product) return notFound()

  const productWithTransformedMetafields = {
    ...product,
    variants: {
      ...product.variants,
      edges: product.variants.edges.map(edge => ({
        ...edge,
        node: {
          ...edge.node,

          variantProfileData: reshapeMetaobject(
            edge.node.metafield?.reference?.fields
          )
        }
      }))
    }
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.title,
    'image': product.featuredImage?.url,
    'offers': {
      '@type': 'AggregateOffer',
      'availability':
        product.availableForSale ?
          'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      'priceCurrency': product.priceRange.minVariantPrice.currencyCode,
      'highPrice': product.priceRange.maxVariantPrice.amount,
      'lowPrice': product.priceRange.minVariantPrice.amount
    }
  }

  return (
    <ProductProvider>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductPageController productData={productWithTransformedMetafields} />
      </Suspense>
    </ProductProvider>
  )
}
