import { COMFYROBE_HANDLE } from './comfyrobe/details'
import { UTEKOS_DUN_HANDLE } from './down/info'
import { UTEKOS_MIKROFIBER_HANDLE } from './microfiber/details'
import { UTEKOS_TECHDOWN_HANDLE } from './fiberdun/info'

export const UTEKOS_DUN_PUBLIC_URL = 'https://www.utekos.no/products/utekos-dun'

export const handles = [
  'utekos-dun',
  'utekos-mikrofiber',
  'comfyrobe',
  'utekos-techdown'
]
export const FEATURED_PRODUCT_HANDLES = [
  UTEKOS_DUN_HANDLE,
  UTEKOS_MIKROFIBER_HANDLE,
  COMFYROBE_HANDLE,
  UTEKOS_TECHDOWN_HANDLE
]
export type FeaturedProductHandle = (typeof FEATURED_PRODUCT_HANDLES)[number]

export const ALL_PRODUCT_HANDLES = [
  UTEKOS_DUN_HANDLE,
  UTEKOS_MIKROFIBER_HANDLE,
  COMFYROBE_HANDLE,
  UTEKOS_TECHDOWN_HANDLE
] as const
export type AllProductHandles = (typeof ALL_PRODUCT_HANDLES)[number]
export const PRODUCT_HANDLE_TO_ID: Record<AllProductHandles, number> = {
  [UTEKOS_DUN_HANDLE]: 7710040391928,
  [UTEKOS_MIKROFIBER_HANDLE]: 7710040752376,
  [COMFYROBE_HANDLE]: 7710040391929,
  [UTEKOS_TECHDOWN_HANDLE]: 9240112693496
}
export const PRODUCT_HANDLE_TO_PUBLIC_URL: Record<AllProductHandles, string> = {
  [UTEKOS_DUN_HANDLE]: 'https://www.utekos.no/products/utekos-dun',
  [UTEKOS_MIKROFIBER_HANDLE]:
    'https://www.utekos.no/produkter/utekos-mikrofiber',
  [COMFYROBE_HANDLE]: 'https://www.utekos.no/products/comfyrobe',
  [UTEKOS_TECHDOWN_HANDLE]: 'https://www.utekos.no/products/utekos-techdown'
}

export const PRODUCT_ID_TO_HANDLE: Record<number, AllProductHandles> = {
  7710040391928: UTEKOS_DUN_HANDLE,
  7710040752376: UTEKOS_MIKROFIBER_HANDLE,
  7710040391929: COMFYROBE_HANDLE
}

export const PRODUCT_ID_TO_PUBLIC_URL: Record<number, string> = {
  7710040391928: 'https://www.utekos.no/products/utekos-dun',
  7710040752376: 'https://www.utekos.no/products/utekos-mikrofiber',
  7710040391929: 'https://www.utekos.no/products/comfyrobe',
  7710040391931: 'https://www.utekos.no/products/utekos-special-edition'
}

export const PRODUCT_PUBLIC_URL_TO_ID: Record<string, number> = {
  'https://www.utekos.no/products/utekos-dun': 7710040391928,
  'https://www.utekos.no/products/utekos-mikrofiber': 7710040752376,
  'https://www.utekos.no/products/comfyrobe': 7710040391929,
  'https://www.utekos.no/products/utekos-special-edition': 7710040391931
}

export const PRODUCT_PUBLIC_URL_TO_HANDLE: Record<string, AllProductHandles> = {
  'https://www.utekos.no/products/utekos-dun': UTEKOS_DUN_HANDLE,
  'https://www.utekos.no/products/utekos-mikrofiber': UTEKOS_MIKROFIBER_HANDLE,
  'https://www.utekos.no/products/comfyrobe': COMFYROBE_HANDLE
}

// Example usage:
// Const productId = PRODUCT_HANDLE_TO_ID['utekos-dun'] // 7710040391928
// Const productHandle = PRODUCT_ID_TO_HANDLE[7710040391928] // 'utekos-dun'
// Const productPublicUrl = PRODUCT_ID_TO_PUBLIC_URL[7710040391928] // 'https://www.utekos.no/products/utekos-dun'
// Const productIdFromUrl = PRODUCT_PUBLIC_URL_TO_ID['https://www.utekos.no/products/utekos-dun'] // 7710040391928
// Const productHandleFromUrl = PRODUCT_PUBLIC_URL_TO_HANDLE['https://www.utekos.no/products/utekos-dun'] // 'utekos-dun'

// These are recently edited files. Do not suggest code that has been deleted.
