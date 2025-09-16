import type { Image, ShopifyProduct, ShopifyProductVariant } from '@types'

export function computeVariantImages(
  product: ShopifyProduct,
  variant: ShopifyProductVariant | null
): Image[] {
  // Hent den ferdige bildelisten direkte fra de transformerte dataene.
  const images = variant?.variantProfileData?.images

  // Sørg for at det er en liste før vi returnerer.
  if (Array.isArray(images)) {
    return images
  }

  // Reserveløsning hvis noe skulle feile
  return product.featuredImage ? [product.featuredImage] : []
}
