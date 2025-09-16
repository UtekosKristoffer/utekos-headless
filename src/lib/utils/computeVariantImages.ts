import type { ShopifyImage } from '@/types/media'
import type { ShopifyProduct, ShopifyProductVariant } from '@/types/products'

export function computeVariantImages(
  product: ShopifyProduct,
  variant: ShopifyProductVariant | null
): ShopifyImage[] {
  // Hent den ferdige bildelisten direkte fra de transformerte dataene.
  const images = variant?.variantProfileData?.images

  // Sørg for at det er en liste før vi returnerer.
  if (Array.isArray(images)) {
    return images
  }

  // Reserveløsning hvis noe skulle feile
  return product.featuredImage ? [product.featuredImage] : []
}
