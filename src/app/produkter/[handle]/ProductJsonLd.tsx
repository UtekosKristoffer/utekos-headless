import { getProduct } from '@/api/lib/products/getProduct'
import { reshapeProductWithMetafields } from '@/hooks/useProductWithMetafields'
import { computeVariantImages } from '@/lib/utils/computeVariantImages'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { cacheLife, cacheTag } from 'next/cache'
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
  'use cache'
  cacheLife('max')
  cacheTag(`product-${handle}`, 'products')

  const rawProduct = await getProduct(handle)
  if (!rawProduct) return null

  const product = reshapeProductWithMetafields(rawProduct) || rawProduct

  const priceValidUntil = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  )
    .toISOString()
    .slice(0, 10)

  const variants = product.variants.edges
  const isProductGroup = variants.length > 0

  const defaultImages = computeVariantImages(product, null)
  const featuredImage = defaultImages[0]?.url || product.featuredImage?.url

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

  const cleanGroupId = cleanShopifyId(product.id)

  if (isProductGroup) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ProductGroup',
      ...commonData,
      ...(cleanGroupId ? { productGroupID: cleanGroupId } : {}),
      'url': `https://utekos.no/produkter/${product.handle}`,
      'hasVariant': variants.map(({ node: variant }): ProductSchema => {
        const variantImages = computeVariantImages(product, variant)
        const variantImage = variantImages[0]?.url || featuredImage

        const variantPrice =
          variant.price?.amount ? String(variant.price.amount) : null
        const cleanVariantId = cleanShopifyId(variant.id)

        const offer: Offer = {
          '@type': 'Offer',
          'url': `https://utekos.no/produkter/${product.handle}?variant=${encodeURIComponent(variant.id)}`,
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
          ...(cleanVariantId ? { productID: cleanVariantId } : {}),
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
    const cleanVariantId =
      firstVariant?.id ? cleanShopifyId(firstVariant.id) : undefined

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
      // FIX 3: Legg kun til productID hvis den finnes
      ...(cleanVariantId ? { productID: cleanVariantId } : {}),
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
