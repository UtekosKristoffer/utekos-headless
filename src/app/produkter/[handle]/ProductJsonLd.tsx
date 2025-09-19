/**
 * @todo should be added to the product page component
 */

import { getProduct } from '@/api/lib/products/getProduct'
import type { Product as ProductSchema, WithContext } from 'schema-dts'

type Props = {
  handle: string
}

// Shopify -> Schema.org availability
const mapAvailability = (availableForSale: boolean) =>
  availableForSale ?
    'https://schema.org/InStock'
  : 'https://schema.org/OutOfStock'

export async function ProductJsonLd({ handle }: Props) {
  const product = await getProduct(handle)
  if (!product) return null

  const firstVariant = product.variants.edges[0]?.node
  const imageUrl = product.featuredImage?.url
  const priceValidUntil = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  )
    .toISOString()
    .split('T')[0]

  const productJsonLd: WithContext<ProductSchema> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.title,
    'description': product.description,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(firstVariant?.sku ? { sku: firstVariant.sku } : {}),
    'brand': {
      '@type': 'Brand',
      'name': product.vendor
    },
    'offers': {
      '@type': 'Offer',
      '@id': `https://utekos.no/produkter/${product.id}#offer`,
      'url': `https://utekos.no/produkter/${product.handle}`,
      'availability': mapAvailability(product.availableForSale),
      'seller': {
        '@type': 'Organization',
        'name': 'Utekos'
      },
      'itemCondition': 'https://schema.org/NewCondition',
      priceValidUntil,
      ...(firstVariant?.price?.amount != null ?
        { price: String(firstVariant.price.amount) }
      : {}),
      ...(firstVariant?.price?.currencyCode ?
        { priceCurrency: firstVariant.price.currencyCode }
      : {})
    }
  }

  return (
    <script
      type='application/ld+json'
      // NB: JSON.stringify dropper automatisk felter som ikke finnes
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
    />
  )
}
