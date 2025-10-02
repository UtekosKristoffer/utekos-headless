import { getProduct } from '@/api/lib/products/getProduct'
export async function ProductJsonLd({ handle }: { handle: string }) {
  const product = await getProduct(handle)

  if (!product) {
    return null
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
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
    />
  )
}
