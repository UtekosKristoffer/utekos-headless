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

export function productImage(id: string, url: string, altText: string, width: number, height: number): Image {
  return {
    id,
    url,
    altText,
    width,
    height
  }
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

export const TECHDOWN_MOBILE_GALLERY_IMAGES: Image[] = [
  productImage(
    'utekos-techdown-kvinne-terrasseliv-mobile',
    '/utekos-techdown-kvinne-terrasseliv-1600x1600.webp',
    'Kvinne med Utekos TechDown på terrassen.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-herre-terrasseliv-mobile',
    '/utekos-techdown-herre-terrasseliv-1600x1600.webp',
    'Mann med Utekos TechDown på terrassen.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-kvinne-bonfire-mobile',
    '/utekos-techdown-kvinne-bonfire-1600x1600.webp',
    'Kvinne med Utekos TechDown ved bålpanne.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-to-kvinner-terrasselivet-mobile',
    '/utekos-techdown-to-kvinner-terrasselivet-1600x1600.webp',
    'To kvinner med Utekos TechDown på terrassen.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-bobil-bonfire-overlay-mobile',
    '/utekos-techdown-bobil-bonfire-overlay-1600x1600.webp',
    'Utekos TechDown ved bobil og bålpanne.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-fullfigur-bakfra-mobile',
    '/utekos-techdown-fullfigur-bakfra-1600x1600.webp',
    'Utekos TechDown vist som fullfigur bakfra.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-diagonalt-fullfigur-mobile',
    '/utekos-techdown-fullfigur-diagonal-1600x1600.webp',
    'Utekos TechDown vist diagonalt som fullfigur.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-halvfigur-bakside-mobile',
    '/utekos-techdown-halvfigur-bakside-1600x1600.webp',
    'Utekos TechDown vist som halvfigur bakfra.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-halvfigur-forfra-mobile',
    '/utekos-techdown-halvfigur-forfra-1600x1600.webp',
    'Utekos TechDown vist som halvfigur forfra.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-halvfigur-diagonal-mobile',
    '/utekos-techdown-halvfigur-diagonal-1600x1600.webp',
    'Utekos TechDown vist som halvfigur diagonalt.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-zipper-detaljer-mobile',
    '/utekos-techdown-zipper-detaljer-1600x1600.webp',
    'Detaljbilde av glidelås på Utekos TechDown.',
    1600,
    1600
  )
]

export const TECHDOWN_DESKTOP_GALLERY_IMAGES: Image[] = [
  productImage(
    'utekos-techdown-kvinne-terrasseliv-desktop',
    '/utekos-techdown-kvinne-terrasseliv-3-4.webp',
    'Kvinne med Utekos TechDown på terrassen.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-balpanne-kvinne-desktop',
    '/utekos-techdown-balpanne-kvinne-3-4.webp',
    'Kvinne med Utekos TechDown ved bålpanne.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-herre-terrasseliv-desktop',
    '/utekos-techdown-herre-terrasseliv-3-4.webp',
    'Mann med Utekos TechDown på terrassen.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-to-kvinner-terrasseliv-desktop',
    '/utekos-techdown-to-kvinner-terrasseliv-3-4.webp.webp',
    'To kvinner med Utekos TechDown på terrassen.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-fullfigur-bakfra-desktop',
    '/utekos-techdown-fullfigur-bakfra-3-4.webp',
    'Utekos TechDown vist som fullfigur bakfra.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-fullfigur-diagonal-desktop',
    '/utekos-techdown-fullfigur-diagonal-3-4.webp',
    'Utekos TechDown vist diagonalt som fullfigur.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-halvfigur-forfra-desktop',
    '/utekos-techdown-halvfigur-forfra-3-4.webp',
    'Utekos TechDown vist som halvfigur forfra.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-halvfigur-diagonal-desktop',
    '/utekos-techdown-halvfigur-diagonal-3-4.webp',
    'Utekos TechDown vist som halvfigur diagonalt.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-tre-i-en-forfra-desktop',
    '/utekos-techdown-tre-i-en-forfra-4-3.webp',
    'Utekos TechDown tre-i-en vist forfra.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-tre-i-en-bakside-desktop',
    '/utekos-techdown-tre-i-en-bakfra-desktop-3-4.webp',
    'Utekos TechDown tre-i-en vist bakfra.',
    2600,
    1950
  )
]

export const MICROFIBER_DESKTOP_GALLERY_IMAGES: Image[] = [
  productImage(
    'utekos-mikrofiber-terrasseliv-kvinne-kaffe-desktop',
    '/farsdag/utekos-mikrofiber-terrasseliv-kvinne-kaffe-3-4.webp',
    'Kvinne med Utekos Mikrofiber på terrassen med kaffe.',
    2600,
    1950
  ),
  productImage(
    'utekos-mikrofiber-fullfigur-forfra-desktop',
    '/farsdag/utekos-mikrofiber-fullfigur-forfra-3-4.webp',
    'Utekos Mikrofiber vist som fullfigur forfra.',
    2600,
    1950
  ),
  productImage(
    'utekos-mikrofiber-parkas-desktop',
    '/farsdag/utekos-mikrofiber-parkas-3-4.webp',
    'Utekos Mikrofiber vist i parkasmodus.',
    2600,
    1950
  ),
  productImage(
    'utekos-mikrofiber-halvfigur-forfra-desktop',
    '/farsdag/utekos-mikrofiber-halvfigur-forfra-3-4.webp',
    'Utekos Mikrofiber vist som halvfigur forfra.',
    2600,
    1950
  ),
  productImage(
    'utekos-mikrofiber-fullfigur-bakfra-desktop',
    '/farsdag/utekos-mikrofiber-fullfigur-bakfra-3-4.webp',
    'Utekos Mikrofiber vist som fullfigur bakfra.',
    2600,
    1950
  ),
  productImage(
    'utekos-mikrofiber-terrasseliv-par-desktop',
    '/farsdag/utekos-mikrofiber-terrasseliv-par-3-4.webp',
    'Par med Utekos Mikrofiber på terrassen.',
    2600,
    1950
  )
]

export const STAPPER_MOBILE_GALLERY_IMAGES: Image[] = [
  productImage(
    'utekos-stapper-mobile',
    '/utekos-stapper-1600-1600.webp',
    'Utekos Stapper kompresjonsbag.',
    1600,
    1600
  )
]

export const STAPPER_DESKTOP_GALLERY_IMAGES: Image[] = [
  productImage(
    'utekos-stapper-desktop',
    '/utekos-stapper-2600-1950.webp',
    'Utekos Stapper kompresjonsbag.',
    2600,
    1950
  )
]

export const PRODUCT_GALLERY_IMAGE_OVERRIDES: Partial<Record<string, ProductGalleryImageOverrideValue>> = {
  'utekos-techdown': {
    mobileImages: TECHDOWN_MOBILE_GALLERY_IMAGES,
    desktopImages: TECHDOWN_DESKTOP_GALLERY_IMAGES,
    imageBackgroundClassName: 'bg-cloud-dancer'
  },
  'utekos-mikrofiber': {
    desktopImages: MICROFIBER_DESKTOP_GALLERY_IMAGES
  },
  'comfyrobe': [
    {
      id: 'comfyrobe-demitasse-open-front',
      url: '/comfyrobe-demitasse-open-front.png',
      altText: 'Comfyrobe i demitasse vist åpen forfra.',
      width: 1288,
      height: 1288
    },
    {
      id: 'comfyrobe-demitasse-closed-front',
      url: '/comfy-front-lukket-demitasse-bg.png',
      altText: 'Comfyrobe i demitasse vist lukket forfra.',
      width: 1288,
      height: 1288
    },
    {
      id: 'comfyrobe-demitasse-back',
      url: '/comfy-bak-demitasse-bg.png',
      altText: 'Comfyrobe i demitasse sett bakfra.',
      width: 1288,
      height: 1288
    },
    {
      id: 'comfyrobe-demitasse-sherpa',
      url: '/comfy-sherpa-demitasse-bg.png',
      altText: 'Comfyrobe i demitasse med sherpa-fôr synlig.',
      width: 1288,
      height: 1288
    }
  ],
  'utekos-stapper': {
    mobileImages: STAPPER_MOBILE_GALLERY_IMAGES,
    desktopImages: STAPPER_DESKTOP_GALLERY_IMAGES
  }
}
