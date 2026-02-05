export interface ProductOffer {
  id: string
  name: string
  price: number
  originalPrice?: number
  features: string[]
}

export const MAIN_PRODUCT: ProductOffer = {
  id: 'comfyrobe-main',
  name: 'Comfyrobe™ - The Fortress',
  price: 999,
  originalPrice: 1490,
  features: [
    'HydroGuard™ 8000mm Skall',
    'SherpaCore™ Fôr',
    'Vindtett Membran'
  ]
}

export const UPSELL_PRODUCT: ProductOffer = {
  id: 'stapper-addon',
  name: 'Utekos Stapper™',
  price: 149,
  features: ['Reduserer volum med 40%', 'Vannavvisende nylon', 'Bærehåndtak']
}
