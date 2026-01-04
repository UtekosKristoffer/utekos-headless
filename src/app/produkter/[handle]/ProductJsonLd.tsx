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
  MerchantReturnPolicy,
  OfferShippingDetails,
  UnitPriceSpecification
} from 'schema-dts'

type Props = {
  handle: string
}

const mapAvailability = (availableForSale: boolean) =>
  availableForSale ?
    'https://schema.org/InStock'
  : 'https://schema.org/OutOfStock'

const getShippingDetails = (price: string | null): OfferShippingDetails => {
  const priceValue = price ? parseFloat(price) : 0
  const shippingCost = priceValue >= 999 ? '0' : '99'

  return {
    '@type': 'OfferShippingDetails',
    'shippingRate': {
      '@type': 'MonetaryAmount',
      'value': shippingCost,
      'currency': 'NOK'
    },
    'shippingDestination': {
      '@type': 'DefinedRegion',
      'addressCountry': 'NO'
    },
    'deliveryTime': {
      '@type': 'ShippingDeliveryTime',
      'handlingTime': {
        '@type': 'QuantitativeValue',
        'minValue': 0,
        'maxValue': 1,
        'unitCode': 'DAY'
      },
      'transitTime': {
        '@type': 'QuantitativeValue',
        'minValue': 1,
        'maxValue': 4,
        'unitCode': 'DAY'
      }
    }
  }
}

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
    'returnFees': 'https://schema.org/FreeReturn',
    'refundType': 'https://schema.org/FullRefund',
    'url': 'https://utekos.no/frakt-og-retur'
  }

  const commonData = {
    name: product.title,
    brand: {
      '@type': 'Brand',
      'name': product.vendor || 'Utekos®'
    },
    // Fallback til tittel hvis beskrivelse mangler
    description: product.description || product.title,
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
        const originalPrice =
          variant.compareAtPrice?.amount ?
            String(variant.compareAtPrice.amount)
          : null

        const variantDescription =
          variant.title && variant.title !== 'Default Title' ?
            `${product.title} - ${variant.title}`
          : product.description

        // Generer frakt basert på denne variantens pris
        const shippingDetails = getShippingDetails(variantPrice)

        // Forbered priceSpecification hvis originalPrice finnes
        const priceSpec: UnitPriceSpecification | undefined =
          originalPrice ?
            {
              '@type': 'UnitPriceSpecification',
              'priceType': 'https://schema.org/ListPrice',
              'price': originalPrice,
              'priceCurrency': variant.price?.currencyCode || 'NOK'
            }
          : undefined

        const offer: Offer = {
          '@type': 'Offer',
          'url': `https://utekos.no/produkter/${product.handle}?variant=${encodeURIComponent(variant.id)}`,
          'priceCurrency': variant.price?.currencyCode || 'NOK',
          'availability': mapAvailability(variant.availableForSale),
          'priceValidUntil': priceValidUntil,
          'seller': sellerReference,
          'itemCondition': 'https://schema.org/NewCondition',
          'hasMerchantReturnPolicy': merchantReturnPolicy,
          'shippingDetails': shippingDetails,
          // Bruk spread (...) for å unngå undefined-typefeil
          ...(variantPrice ? { price: variantPrice } : {}),
          ...(priceSpec ? { priceSpecification: priceSpec } : {})
        }

        return {
          '@type': 'Product',
          ...(cleanVariantId ? { productID: cleanVariantId } : {}),
          'name': `${product.title} - ${variant.title}`,
          'description': variantDescription || commonData.name,
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
    const originalPrice =
      firstVariant?.compareAtPrice?.amount ?
        String(firstVariant.compareAtPrice.amount)
      : null

    // Generer frakt basert på hovedproduktets pris
    const shippingDetails = getShippingDetails(variantPrice)

    // Forbered priceSpecification
    const priceSpec: UnitPriceSpecification | undefined =
      originalPrice ?
        {
          '@type': 'UnitPriceSpecification',
          'priceType': 'https://schema.org/ListPrice',
          'price': originalPrice,
          'priceCurrency': firstVariant?.price?.currencyCode || 'NOK'
        }
      : undefined

    const offer: Offer = {
      '@type': 'Offer',
      'url': `https://utekos.no/produkter/${product.handle}`,
      'priceCurrency': firstVariant?.price?.currencyCode || 'NOK',
      'availability': mapAvailability(product.availableForSale),
      'priceValidUntil': priceValidUntil,
      'seller': sellerReference,
      'itemCondition': 'https://schema.org/NewCondition',
      'hasMerchantReturnPolicy': merchantReturnPolicy,
      'shippingDetails': shippingDetails,
      // Bruk spread (...) for å unngå undefined-typefeil
      ...(variantPrice ? { price: variantPrice } : {}),
      ...(priceSpec ? { priceSpecification: priceSpec } : {})
    }

    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      ...commonData,
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
