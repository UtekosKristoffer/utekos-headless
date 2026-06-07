import type { Image } from 'types/media'

export const STOCK_THRESHOLD = 31

export type ProductGalleryImageOverride = {
  mobileImages?: Image[]
  desktopImages?: Image[]
  imageBackgroundClassName?: string
}

export type ProductGalleryImageOverrideValue = Image[] | ProductGalleryImageOverride

type ResolvedProductGalleryImages = {
  mobileImages: Image[]
  desktopImages?: Image[]
  imageBackgroundClassName?: string
}

export function resolveProductGalleryImages(
  override: ProductGalleryImageOverrideValue | undefined,
  fallbackImages: Image[]
): ResolvedProductGalleryImages {
  if (!override) {
    return {
      mobileImages: fallbackImages
    }
  }

  if (Array.isArray(override)) {
    return {
      mobileImages: override
    }
  }

  return {
    ...override,
    mobileImages: override.mobileImages ?? fallbackImages
  }
}
