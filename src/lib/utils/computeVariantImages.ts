import type { Image, ShopifyProduct, ShopifyProductVariant } from '@types'

export function computeVariantImages(
  product: ShopifyProduct,
  variant: ShopifyProductVariant | null
): Image[] {
  const images = variant?.variantProfileData?.images

  if (Array.isArray(images)) {
    return images
  }

  return product.featuredImage ? [product.featuredImage] : []
}
