import type { ProductOffer } from 'types/cart'

export const MAIN_PRODUCT: ProductOffer = {
  id: 'comfyrobe-main',
  name: 'Comfyrobe™',
  price: 999,
  originalPrice: 1690,
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
  features: ['Reduserer volum med 50%']
}
