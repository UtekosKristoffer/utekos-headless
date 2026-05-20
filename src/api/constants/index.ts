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
    subtitle: 'Vår nyeste, varmeste og mest allsidige',
    price: 1790,
    badge: 'Bestselger',
    description:
      'Forener banebrytende innovasjon med tidløs eleganse. CloudWeave™ opprettholder varmen i deg, og spensten i foret, selv under fuktige forhold. 3-i-1-konstruksjonen lar deg enkelt tilpasse passform, regulere ventilasjon og veksle mellom ulike funksjonelle moduser.',
    highlights: [
      {
        title: 'Holder varmen i fukt',
        body: 'CloudWeave™ hydrofob isolasjon beholder rundt 98 % varmeevne selv når den blir våt. Vanlig dun kollapser; TechDown består.'
      },
      {
        title: '3-i-1 fleksibilitet',
        body: 'Parkas, oppfestet eller kokong — juster på sekunder uten å gå inn for å skifte.'
      },
      {
        title: 'YKK® Dual V-Zip™',
        body: 'To-spors omvendt V-glidelås gir ventilasjon og tilgang uten å åpne hele forsiden.'
      }
    ],
    features: ['Vannavstøtende', 'Helårsbruk', 'Slitesterk'],
    colors: [{ name: 'Havdyp', hex: '#27293D' }],
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
    subtitle: 'Lettvekts reisefølge',
    price: 1590,
    badge: 'Reisefavoritt',
    description:
      'Utekos kolleksjonens letteste signaturmodell. Det naturlige valget for deg som vil ha maksimal komfort, robust beskyttelse og minimal vekt. DuraLite sørger for utmerket fukttransport fra innsiden, mens DWR-behandlingen gir vannavstøtende beskyttelse fra utsiden. Bredt bruksområde. Egner seg til alt fra bobil, båt og hytte til den passive tiden som tilskuer på sidelinjen av fotballbanen.',
    highlights: [
      {
        title: 'Pakker seg lett',
        body: 'Lavest vekt i kolleksjonen — ferdig sammenpakket tar den minimal plass i bagasjen.'
      },
      {
        title: 'Hurtigtørkende',
        body: 'Mikrofiber-isolasjonen tørker raskt etter regnbyger eller fuktig morgenduft på campingstolen.'
      },
      {
        title: 'Allergivennlig',
        body: '100 % syntetisk — ingen animalske produkter. Trygt valg for deg med dunallergi.'
      },
      {
        title: 'YKK® Dual V-Zip™',
        body: 'Lett, vindtett og vannavstøtende ytre. Bygget for samme situasjoner som flaggskipet — bare lettere.'
      }
    ],
    features: ['Hurtigtørkende', 'Mest kompakt', 'Allergivennlig'],
    colors: [{ name: 'Fjellblå', hex: '#020244' }],
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
