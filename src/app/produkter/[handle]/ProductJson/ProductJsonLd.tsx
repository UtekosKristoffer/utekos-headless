import { getProductWithReviews } from '@/api/lib/products/getProductWithReviews'
import type {
  Product as ProductSchema,
  WithContext,
  AggregateRating
} from 'schema-dts'

type Props = {
  handle: string
}

const mapAvailability = (availableForSale: boolean) =>
  availableForSale ?
    'https://schema.org/InStock'
  : 'https://schema.org/OutOfStock'

export async function ProductJsonLd({ handle }: Props) {
  const product = await getProductWithReviews(handle)
  if (!product) return null

  const firstVariant = product.variants.edges[0]?.node
  const imageUrl = product.featuredImage?.url
  const priceValidUntil = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  )
    .toISOString()
    .split('T')[0]!

  let ratingData: AggregateRating | undefined = undefined
  if (product.reviews && product.reviews.count > 0) {
    ratingData = {
      '@type': 'AggregateRating',
      'ratingValue': String(product.reviews.rating),
      // HER ER ENDRINGEN:
      'reviewCount': product.reviews.count // Fjerner String()
    }
  }

  const productJsonLd: WithContext<ProductSchema> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.title,
    'description': product.description,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(firstVariant?.sku ? { sku: firstVariant.sku } : {}),
    ...(firstVariant?.barcode ? { gtin13: firstVariant.barcode } : {}),
    'brand': {
      '@type': 'Brand',
      'name': product.vendor
    },

    ...(ratingData ? { aggregateRating: ratingData } : {}),

    'offers': {
      '@type': 'Offer',
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
    />
  )
}
