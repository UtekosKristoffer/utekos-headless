import { TECHDOWN_MOBILE_GALLERY_IMAGES } from './techdown/mobileGalleryImages'
import { TECHDOWN_DESKTOP_GALLERY_IMAGES } from './techdown/desktopGalleryImages'
import { MICROFIBER_DESKTOP_GALLERY_IMAGES } from './mikrofiber/mikrofiberDesktopImages'
import { STAPPER_MOBILE_GALLERY_IMAGES } from './stapper/stapperMobileImages'
import { STAPPER_DESKTOP_GALLERY_IMAGES } from './stapper/stapperDesktopImages'
import type { ProductGalleryImageOverrideValue } from '@/app/produkter/[handle]/utils/resolveProductGalleryImages'

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
