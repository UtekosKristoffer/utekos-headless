// Path: src/api/constants/index.ts
export type ModelKey = 'utekos-techdown' | 'utekos-mikrofiber'

export const TAGS = {
  products: 'products',
  cart: 'cart'
}

export const FREE_SHIPPING_THRESHOLD = 999
export const productName = 'Utekos TechDown™'
export const productHandle = 'utekos-techdown'
export const productUrl = `/produkter/${productHandle}`
export const originalPrice = 1990
export const discountAmount = 200
export const currentPrice = originalPrice - discountAmount
export const GID_PREFIX = 'gid://shopify/ProductVariant/'

export const PRODUCT_VARIANTS = {
  'utekos-techdown': {
    id: 'utekos-techdown',
    title: 'Utekos TechDown™',
    subtitle: 'Vår nyeste, varmeste og mest allsidige modell.',
    price: 1790,
    badge: 'Bestselger',
    description:
      'Utekos TechDown forener banebrytende innovasjon med tidløs eleganse. CloudWave™ holder deg varm og bevarer spensten i fôret, selv under fuktige forhold. 3-i-1-konstruksjonen lar deg enkelt tilpasse passformen, regulere ventilasjonen og veksle mellom ulike moduser.',
    highlights: [
      {
        title: 'Holder varmen i fukt',
        body: 'Luméa™-skallet gir en sofistikert finish og fungerer som et beskyttende skjold, mens den innovative CloudWeave™-isolasjonen sikrer pålitelig varme. Den oppleves som myk og luftig dun, samtidig som den bevarer spensten og loftet under fuktige forhold.'
      },
      {
        title: '3-i-1 funksjonalitet',
        body: 'Juster, form og nyt.'
      },
      {
        title: 'YKK® Dual V-Zip™',
        body: 'Gjør det enkelt å tilpasse ventilasjonen og skreddersy varmen etter behovene dine.'
      }
    ],
    features: ['Helårsbruk', 'Tre bruksformer', 'Vannavstøtende'],
    colors: [{ name: 'Havdyp', hex: 'var(--color-havdyp)' }],
    sizes: ['Liten', 'Middels', 'Stor', 'Ekstra stor'],
    images: [
      '/kvinne-nyter-terrasselivet-med-utekos-techdown.webp',
      '/utekos-techdown-diagonalt-fullfigur.webp',
      '/1080/utekos-techdown-bakside.webp',
      '/utekos-techdown-halvfigur-forfra-1600x1600.webpg'
    ]
  },
  'utekos-mikrofiber': {
    id: 'utekos-mikrofiber',
    title: 'Utekos Mikrofiber™',
    subtitle: 'Lett varme som tar lite plass',
    price: 1590,
    badge: 'Reisefavoritt',
    description:
      'Kolleksjonens letteste modell for deg som vil ha varme uten mye volum. Den pakker seg lett, tørker raskt og gir trygg komfort i bobilen, båten, på hytta eller på sidelinjen.',
    highlights: [
      {
        title: 'Pakker seg lett',
        body: 'Lav vekt og lite volum gjør den enkel å ha med i bag, bobil, båt og tursekk.'
      },
      {
        title: 'Hurtigtørkende',
        body: 'Mikrofiber-isolasjonen tørker raskt etter regnbyger og fuktige morgener.'
      },
      {
        title: 'Allergivennlig',
        body: '100 % syntetisk fyll gjør den til et godt valg for deg som vil unngå dun.'
      },
      {
        title: 'YKK® Dual V-Zip™',
        body: 'Den samme praktiske glidelåsløsningen gjør det lett å sitte, gå og regulere varme.'
      }
    ],
    features: ['Lett å pakke', 'Tørker raskt', 'Syntetisk fyll'],
    colors: [{ name: 'Fjellblå', hex: 'var(--color-ocean-cavern)' }],
    sizes: ['Medium', 'Large'],
    images: [
      '/utekos-mikrofiber-helfigur-1600-1600.webp',
      '/utekos-mikrofiber-parkas-1600-1600.webp',
      '/utekos-mikrofiber-bakside-full-figur-1600-1600.webp',
      '/utekos-mikrofiber-halvfigur-forside-1600-1600.webp'
    ]
  }
}

export const PRODUCT_HIDDEN_SIZE_LABELS: Partial<Record<ModelKey, readonly string[]>> = {
  'utekos-techdown': ['Liten']
}

export function getSelectableSizes(
  model: ModelKey,
  config: { sizes: readonly string[] } = PRODUCT_VARIANTS[model]
): string[] {
  const hiddenSizes = PRODUCT_HIDDEN_SIZE_LABELS[model] ?? []

  return config.sizes.filter(size => !hiddenSizes.includes(size))
}

export const VIDEO_URL = 'https://utekos.no/videos/TensorPix2.mp4'
export const VIDEO_THUMBNAIL_URL = 'https://utekos.no/video-poster-bg.webp'
export const VIDEO_POSTER_URL = 'https://utekos.no/video-poster-bg.webp'
export const VIDEO_EMBED_URL = 'https://utekos.no/video/tensorpix'
