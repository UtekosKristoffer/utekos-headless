// Path: src/lib/helpers/normalizers/normalizeProductImage.ts

/**
 * Normalizes Shopify featuredImage to application Image type with guaranteed altText.
 * @param image - Raw image from Shopify API potentially missing altText
 * @param fallbackTitle - Product title used as altText fallback
 * @returns Image object with guaranteed altText property
 */
export const normalizeProductImage = (image: { url: string; id: string; altText?: string | null }, fallbackTitle: string) => ({
  id: image.id,
  url: image.url,
  altText: image.altText ?? `Bilde av ${fallbackTitle}`
})
