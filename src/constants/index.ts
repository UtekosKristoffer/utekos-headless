// Path: src/constants/index.ts
export type ModelKey = keyof typeof PRODUCT_VARIANTS
export const TAGS = {
  products: 'products',
  cart: 'cart'
}
export const FREE_SHIPPING_THRESHOLD = 999

export const SIZE_GUIDANCE: Record<string, { height: string; tips: string[] }> =
  {
    'Liten': {
      height: 'Opptil 170 cm',
      tips: [
        'Er du lavere enn 165 cm får du en romslig og lun følelse.',
        'Er du litt høyere får du en nettere silhuett uten overflødig volum.'
      ]
    },
    'Middels': {
      height: '170 – 180 cm',
      tips: [
        'Er du lavere enn 170 cm får du en romslig passform.',
        'Ligger du i øvre sjiktet (mot 180 cm) får du en mer kroppsnær passform.'
      ]
    },
    'Stor': {
      height: '180 – 195 cm',
      tips: [
        'Perfekt for deg over 180 cm, eller for deg som er lavere og ønsker romslighet.',
        'Er du over 195 cm anbefaler vi heller størrelsen Ekstra stor.'
      ]
    },
    'Ekstra stor': {
      height: '195 cm og oppover',
      tips: [
        'Skreddersydd for deg over 195 cm – ekstra lengde i kroppen og ermene.',
        'Også et godt valg for deg som er lavere, men ønsker maksimal romslighet og lengde.'
      ]
    }
  }

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
    badge: 'Bestselger',
    description:
      'Flaggskipet i kolleksjonen. CloudWave™ hydrofob isolasjon beholder varmen selv i fukt — der vanlig dun kollapser, består Utekos. 3-i-1-konstruksjonen lar deg justere fra parkas til kokong på sekunder, slik at du kan bli sittende lenger.',
    highlights: [
      {
        title: 'Holder varmen i fukt',
        body: 'CloudWave™ hydrofob isolasjon beholder rundt 98 % varmeevne selv når den blir våt. Vanlig dun kollapser; TechDown består.'
      },
      {
        title: '3-i-1 fleksibilitet',
        body: 'Parkas, oppfestet eller kokong — juster på sekunder uten å gå inn for å skifte.'
      },
      {
        title: 'YKK® Dual V-Zip™',
        body: 'To-spors omvendt V-glidelås gir ventilasjon og tilgang uten å åpne hele forsiden.'
      },
      {
        title: 'Bygget for nordisk vær',
        body: 'DuraLite™ Nylon — vindtett, vannavstøtende og slitesterkt 20D/380T-materiale.'
      }
    ],
    features: ['Vannavstøtende', 'Helårsbruk', 'Slitesterk'],
    colors: [{ name: 'Havdyp', hex: '#0F2B40' }],
    sizes: ['Liten', 'Middels', 'Stor', 'Ekstra stor'],
    images: [
      '/1080/kate-1080.png',
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
      'Vårt letteste plagg — pakker seg ned, men gir overraskende lun varme. Perfekt for bobil, båt, hytte og reise. Hurtigtørkende mikrofiber-isolasjon og samme premium ytre som flaggskipet, bare lettere.',
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
