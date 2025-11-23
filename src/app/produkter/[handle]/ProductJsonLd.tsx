import { getProduct } from '@/api/lib/products/getProduct'
import type {
  ProductGroup,
  Product as ProductSchema,
  WithContext,
  Offer,
  MerchantReturnPolicy
} from 'schema-dts'

type Props = {
  handle: string
}

const mapAvailability = (availableForSale: boolean) =>
  availableForSale ?
    'https://schema.org/InStock'
  : 'https://schema.org/OutOfStock'

export async function ProductJsonLd({ handle }: Props) {
  const product = await getProduct(handle)
  if (!product) return null

  const priceValidUntil = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  )
    .toISOString()
    .slice(0, 10)

  const variants = product.variants.edges
  const isProductGroup = variants.length > 0
  const featuredImage = product.featuredImage?.url

  const merchantReturnPolicy: MerchantReturnPolicy = {
    '@type': 'MerchantReturnPolicy',
    'applicableCountry': 'NO',
    'returnPolicyCategory':
      'https://schema.org/MerchantReturnFiniteReturnWindow',
    'merchantReturnDays': 14,
    'returnMethod': 'https://schema.org/ReturnByMail',
    'url': 'https://utekos.no/frakt-og-retur'
  }

  const commonData = {
    name: product.title,
    brand: {
      '@type': 'Brand',
      'name': product.vendor || 'Utekos'
    },
    ...(product.description ? { description: product.description } : {}),
    ...(featuredImage ? { image: featuredImage } : {})
  } as const

  const sellerReference = {
    '@id': 'https://utekos.no/#organization'
  } as const

  let jsonLd: WithContext<ProductSchema | ProductGroup>

  if (isProductGroup) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ProductGroup',
      ...commonData,
      'productGroupID': product.id,
      'url': `https://utekos.no/produkter/${product.handle}`,
      'hasVariant': variants.map(({ node: variant }): ProductSchema => {
        const variantPrice =
          variant.price?.amount ? String(variant.price.amount) : null
        const variantImage = variant.image?.url || featuredImage

        const offer: Offer = {
          '@type': 'Offer',
          'url': `https://utekos.no/produkter/${product.handle}?variant=${variant.id}`,
          'priceCurrency': variant.price?.currencyCode || 'NOK',
          'availability': mapAvailability(variant.availableForSale),
          'priceValidUntil': priceValidUntil,
          'seller': sellerReference,
          'itemCondition': 'https://schema.org/NewCondition',
          'hasMerchantReturnPolicy': merchantReturnPolicy,
          ...(variantPrice ? { price: variantPrice } : {})
        }

        return {
          '@type': 'Product',
          'name': `${product.title} - ${variant.title}`,
          ...(variant.title !== 'Default Title' ?
            { description: variant.title }
          : {}),
          ...(variant.sku ? { sku: variant.sku } : {}),
          ...(variantImage ? { image: variantImage } : {}),
          'offers': offer
        }
      })
    }
  } else {
    const firstVariant = variants[0]?.node
    const variantPrice =
      firstVariant?.price?.amount ? String(firstVariant.price.amount) : null

    const offer: Offer = {
      '@type': 'Offer',
      'url': `https://utekos.no/produkter/${product.handle}`,
      'priceCurrency': firstVariant?.price?.currencyCode || 'NOK',
      'availability': mapAvailability(product.availableForSale),
      'priceValidUntil': priceValidUntil,
      'seller': sellerReference,
      'itemCondition': 'https://schema.org/NewCondition',
      'hasMerchantReturnPolicy': merchantReturnPolicy,
      ...(variantPrice ? { price: variantPrice } : {})
    }

    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      ...commonData,
      ...(firstVariant?.sku ? { sku: firstVariant.sku } : {}),
      'offers': offer
    }
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
      }}
    />
  )
}
