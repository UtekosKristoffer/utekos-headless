// Path: src/api/constants/index.ts
export type ModelKey = keyof typeof PRODUCT_VARIANTS
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
  techdown: {
    id: 'utekos-techdown',
    title: 'Utekos TechDown™',
    subtitle: 'Vår nyeste, varmeste og mest allsidige modell.',
    price: 1790,
    badge: 'Bestselger',
    description:
      'Forener banebrytende innovasjon med tidløs eleganse. CloudWave™ opprettholder varmen i deg, og spensten i foret, selv under fuktige forhold. 3-i-1-konstruksjonen lar deg enkelt tilpasse passform, regulere ventilasjon og veksle mellom ulike funksjonelle moduser.',
    highlights: [
      {
        title: 'Holder varmen i fukt',
        body: 'Utekos TechDown™ forener banebrytende innovasjon med tidløs eleganse. Det eksklusive Luméa™-skallet gir en sofistikert finish og fungerer som et beskyttende skjold, mens den ytelsesoptimaliserte CloudWave™-isolasjonen sikrer høy og pålitelig varme. Kjernen i konseptet er vår unike 3-i-1 funksjonalitet. Gjennomtestede løsninger lar deg enkelt tilpasse passform, regulere ventilasjon og veksle mellom ulike funksjonelle moduser. Når dine behov for velvære endrer seg, finnes det alltid en justeringsmulighet som lar deg fortsette opplevelsen av kompromissløs komfort. Helt uavbrutt.'
      },
      {
        title: '3-i-1 funksjonalitet',
        body: 'Juster, form og nyt.'
      },
      {
        title: 'YKK® Dual V-Zip™',
        body: 'Lar deg enkelt tilpasse graden av ventilasjon og skreddersy varmen etter dine behov.'
      }
    ],
    features: ['Helårsbruk', 'Tre bruksformer', 'Vannavstøtende'],
    colors: [{ name: 'Havdyp', hex: 'var(--color-maritime-blue)' }],
    sizes: ['Liten', 'Middels', 'Stor', 'Ekstra stor'],
    images: [
      '/kate-tech-photo.webp',
      '/1080/techdown.png',
      '/1080/tech-bakside-hel-1080.png',
      '/1080/tech-halv-1080.png'
    ]
  },
  mikro: {
    id: 'utekos-mikro',
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
      '/1080/blue-full.png',
      '/1080/blue-parkas.png',
      '/1080/blue-oppfestet.png',
      '/classic-blue-jacket-3-4.png'
    ]
  }
}

export const VIDEO_URL = 'https://utekos.no/videos/TensorPix2.mp4'
export const VIDEO_THUMBNAIL_URL = 'https://utekos.no/linn-kate-kikkert.webp'
export const VIDEO_POSTER_URL = 'https://utekos.no/linn-kate-kikkert.webp'
export const VIDEO_EMBED_URL = 'https://utekos.no/video/tensorpix'
