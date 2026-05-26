import type { Metadata } from 'next'
import { computeVariantImages } from '@/lib/utils/computeVariantImages'
import type { ShopifyProduct } from 'types/product'
import { SITE_URL } from './siteUrl'

type MetadataOther = NonNullable<Metadata['other']>

function toAbsoluteUrl(url: string) {
  try {
    return new URL(url).toString()
  } catch {
    const normalizedPath = url.startsWith('/') ? url : `/${url}`
    return new URL(normalizedPath, SITE_URL).toString()
  }
}

function cleanText(value: string | null | undefined) {
  return value?.replace(/\s+/g, ' ').trim() || ''
}

function getProductHandle(product: ShopifyProduct, fallbackHandle: string) {
  return cleanText(product.handle) || fallbackHandle
}

function getProductTitle(product: ShopifyProduct) {
  return cleanText(product.seo.title) || cleanText(product.title) || 'Utekos'
}

function getProductDescription(product: ShopifyProduct) {
  return (
    cleanText(product.seo.description)
    || cleanText(product.description)
    || cleanText(product.title)
    || 'Utekos produkt'
  )
}

function getProductDisplayImage(product: ShopifyProduct) {
  const defaultImages = computeVariantImages(product, null)

  return defaultImages[0] || product.featuredImage || null
}

function buildProductOtherMetadata(product: ShopifyProduct): MetadataOther {
  const selectedVariant = product.selectedOrFirstAvailableVariant
  const other: MetadataOther = {}

  const priceAmount = selectedVariant?.price.amount
  const currencyCode = selectedVariant?.price.currencyCode
  const retailerItemId = selectedVariant?.id
  const itemGroupId = product.id

  const isOutOfStock =
    selectedVariant?.availableForSale === false
    || selectedVariant?.currentlyNotInStock === true
    || product.availableForSale === false

  if (retailerItemId) {
    other['product:retailer_item_id'] = retailerItemId
  }

  if (itemGroupId) {
    other['product:item_group_id'] = itemGroupId
  }

  if (priceAmount != null) {
    other['product:price:amount'] = String(priceAmount)
  }

  if (currencyCode) {
    other['product:price:currency'] = currencyCode
  }

  if (selectedVariant?.compareAtPrice?.amount != null) {
    other['product:variant:compare_at_price'] = String(selectedVariant.compareAtPrice.amount)
  }

  other['product:availability'] = isOutOfStock ? 'out of stock' : 'in stock'
  other['product:condition'] = 'new'

  return other
}

export function buildMissingProductMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: 'Produkt ikke funnet',
    description: 'Dette produktet er dessverre ikke tilgjengelig.'
  }
}

export function buildProductMetadata(product: ShopifyProduct, fallbackHandle: string): Metadata {
  const handle = getProductHandle(product, fallbackHandle)
  const canonicalPath = `/produkter/${handle}`
  const canonicalUrl = toAbsoluteUrl(canonicalPath)

  const title = getProductTitle(product)
  const description = getProductDescription(product)

  const displayImage = getProductDisplayImage(product)
  const displayImageUrl = toAbsoluteUrl(displayImage?.url || '/og-image.jpg')

  const imageAlt = cleanText(displayImage?.altText) || title

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      type: 'website',
      locale: 'no_NO',
      url: canonicalUrl,
      siteName: 'Utekos',
      title,
      description,
      images: [
        {
          url: displayImageUrl,
          width: displayImage?.width || 1200,
          height: displayImage?.height || 630,
          alt: imageAlt
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [displayImageUrl]
    },
    other: buildProductOtherMetadata(product)
  }
}
