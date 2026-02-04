// Path: src/api/constants/index.ts
import DunImage1 from '@public/1080/classic-blue-1080.png'
import MicroImage1 from '@public/mikro-front-hvit-bakgrunn-1080.png'
import TechDownImage1 from '@public/1080/techdown.png'
export type ModelKey = keyof typeof PRODUCT_VARIANTS
export const TAGS = {
  products: 'products',
  cart: 'cart'
}

import { ensureStartsWith } from '@/lib/utils/ensureStartsWith'

export const FREE_SHIPPING_THRESHOLD = 999

export const productName = 'Utekos TechDown™'
export const productHandle = 'utekos-techdown'
export const productUrl = `/produkter/${productHandle}`
export const originalPrice = 1990
export const discountAmount = 200
export const currentPrice = originalPrice - discountAmount
export const GID_PREFIX = 'gid://shopify/ProductVariant/'
export const PRODUCT_VARIANTS = {
  techdown: {
    id: 'utekos-techdown',
    title: 'Utekos TechDown™',
    subtitle: 'Vår varmeste og mest allsidige',
    price: 1790,
    features: ['Vannavstøtende', 'Helårsbruk', 'Slitesterk'],
    colors: [{ name: 'Havdyp', hex: '#0F2B40' }],
    sizes: ['Liten', 'Middels', 'Stor'],
    image: TechDownImage1.src
  },
  dun: {
    id: 'utekos-dun',
    title: 'Utekos Dun™',
    subtitle: 'Utekos Dun™',
    price: 2490,
    features: ['Ultralett', 'Maksimal varme', 'Høy kompresjon'],
    colors: [
      { name: 'Fjellblå', hex: '#020244' },
      { name: 'Vargnatt', hex: '#000000' }
    ],
    sizes: ['Medium', 'Large'],
    image: DunImage1.src
  },
  mikro: {
    id: 'utekos-mikro',
    title: 'Utekos Mikrofiber™',
    subtitle: 'Lettvekts reisefølge',
    price: 1590,
    features: ['Hurtigtørkende', 'Mest kompakt', 'Allergivennlig'],
    colors: [
      { name: 'Fjellblå', hex: '#020244' },
      { name: 'Vargnatt', hex: '#000000' }
    ],
    sizes: ['Medium', 'Large'],
    image: MicroImage1.src
  }
}

export const VIDEO_URL = 'https://utekos.no/videos/TensorPix2.mp4'
export const VIDEO_THUMBNAIL_URL = 'https://utekos.no/linn-kate-kikkert.webp'
export const VIDEO_POSTER_URL = 'https://utekos.no/linn-kate-kikkert.webp'
export const VIDEO_EMBED_URL = 'https://utekos.no/video/tensorpix'
