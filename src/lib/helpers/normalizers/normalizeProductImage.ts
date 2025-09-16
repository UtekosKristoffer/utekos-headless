// Path: src/lib/helpers/normalizers/normalizeProductImage.ts

import type { ShopifyImage } from '@/types/media'
/**
 * Normalizes Shopify featuredImage to application Image type with guaranteed altText.
 * @module normalizers/normalizeProductImage
 * @param image - ShopifyImage or null
 * @param fallbackTitle - Product title for altText fallback
 * @returns Normalized ShopifyImage with default values if necessary
 */
export const normalizeProductImage = (
  image: ShopifyImage | null,
  fallbackTitle: string
): ShopifyImage => ({
  url: image?.url ?? '/placeholder-image.png',
  altText: image?.altText ?? `Bilde av ${fallbackTitle}`,
  width: image?.width ?? 1024,
  height: image?.height ?? 1024
})
