// Path: src/app/skreddersy-varmen/utekos-orginal/components/LandingPageJsonLd.tsx
import { cacheLife, cacheTag } from 'next/cache'
import { reviews } from '../utils/reviews'
import type {
  CollectionPage,
  WithContext,
  ListItem,
  Product,
  Review,
  FAQPage,
  AggregateRating,
  Question
} from 'schema-dts'

const BASE_URL = 'https://utekos.no'
const LP_URL = `${BASE_URL}/skreddersy-varmen`

type ProductSeed = {
  position: number
  handle: string
  name: string
  description: string
  price: string
  originalPrice: string
  image: string
  sku: string
}

const PRODUCTS: ProductSeed[] = [
  {
    position: 1,
    handle: 'utekos-techdown',
    name: 'Utekos TechDown™',
    description:
      'Flaggskipet i kolleksjonen. Hydrofob CloudWave™-isolasjon beholder varmen selv i fukt. 3-i-1-konstruksjon lar deg justere fra parkas til kokong på sekunder.',
    price: '1790',
    originalPrice: '1990',
    image: `${BASE_URL}/1080/kate-1080.png`,
    sku: 'utekos-techdown'
  },
  {
    position: 2,
    handle: 'utekos-mikrofiber',
    name: 'Utekos Mikrofiber™',
    description:
      'Vårt letteste plagg. Pakker seg ned, men gir overraskende lun varme. Perfekt for bobil, båt og reise.',
    price: '1590',
    originalPrice: '2290',
    image: `${BASE_URL}/1080/blue-full.png`,
    sku: 'utekos-mikrofiber'
  }
]

const FAQ_ENTRIES: { q: string; a: string }[] = [
  {
    q: 'Hvor lang er leveringstiden?',
    a: 'Vi sender samme dag (ikke søndag), og fraktiden er normalt 2–5 virkedager avhengig av hvor i Norge du bor. Fri frakt fra 999,- kr.'
  },
  {
    q: 'Hvor lang er returfristen?',
    a: '14 dagers åpent kjøp. Du kan sende varen tilbake uten forklaring innen 14 dager etter mottak.'
  },
  {
    q: 'Hvordan finner jeg riktig størrelse?',
    a: 'Bruk størrelsesguiden vår på utekos.no/handlehjelp/storrelsesguide. TechDown finnes i Liten, Middels, Stor og Ekstra stor – basert på din høyde og ønsket passform.'
  },
  {
    q: 'Fungerer Utekos i fuktig vær?',
    a: 'Ja. Utekos TechDown™ bruker hydrofob CloudWave™-isolasjon som beholder rundt 98 % varmeevne selv når den blir våt. I motsetning til vanlig dun kollapser ikke fibrene.'
  },
  {
    q: 'Hva menes med 3-i-1-funksjonalitet?',
    a: 'Utekos kan brukes i tre moduser: Kokong (full isolasjon), Oppfestet (mellomlengde for mobilitet) og Parkas (kort, aktiv). Du justerer mellom modusene på sekunder uten å gå inn for å skifte.'
  },
  {
    q: 'Hvordan vasker jeg Utekos?',
    a: 'Maskinvask på maks 30 °C med mild såpe. Unngå tørketrommel og stryking. La plagget lufttørke. CloudWave™-isolasjonen bevarer loft og varmeevne, vask etter vask.'
  },
  {
    q: 'Kan jeg hente Utekos i butikk?',
    a: 'Ja. Utekos distribueres også via Intersport. Lager i Bergen og hurtig forsendelse direkte fra oss gjør at du normalt har plagget innen 2–5 dager.'
  }
]

function stringifyJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export async function LandingPageJsonLd() {
  'use cache'
  cacheLife('max')
  cacheTag('landing-page', 'skreddersy-varmen-jsonld')

  const aggregateRating: AggregateRating = {
    '@type': 'AggregateRating',
    'ratingValue': (
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    ).toFixed(1),
    'bestRating': '5',
    'worstRating': '1',
    'reviewCount': reviews.length
  }

  const reviewNodes: Review[] = reviews.map(r => ({
    '@type': 'Review',
    'name': r.title ?? `Anmeldelse av ${r.name}`,
    'reviewBody': r.quote,
    'author': {
      '@type': 'Person',
      'name': r.name
    },
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': String(r.rating),
      'bestRating': '5',
      'worstRating': '1'
    }
  }))

  const itemListElement: ListItem[] = PRODUCTS.map(product => ({
    '@type': 'ListItem',
    'position': product.position,
    'url': `${BASE_URL}/produkter/${product.handle}`,
    'item': {
      '@type': 'Product',
      'name': product.name,
      'description': product.description,
      'image': product.image,
      'url': `${BASE_URL}/produkter/${product.handle}`,
      'offers': {
        '@type': 'Offer',
        'price': product.price,
        'priceCurrency': 'NOK',
        'priceSpecification': {
          '@type': 'UnitPriceSpecification',
          'priceType': 'https://schema.org/ListPrice',
          'price': product.originalPrice,
          'priceCurrency': 'NOK'
        },
        'availability': 'https://schema.org/InStock',
        'url': `${BASE_URL}/produkter/${product.handle}`
      }
    }
  }))

  const collectionSchema: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Skreddersy varmen | Utekos®',
    'description':
      'Ta regien og opplev kompromissløs komfort og overlegen allsidighet.',
    'url': LP_URL,
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': itemListElement
    }
  }

  const productSchemas: WithContext<Product>[] = PRODUCTS.map(product => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'description': product.description,
    'image': product.image,
    'sku': product.sku,
    'brand': {
      '@type': 'Brand',
      'name': 'Utekos'
    },
    'url': `${BASE_URL}/produkter/${product.handle}`,
    'offers': {
      '@type': 'Offer',
      'url': `${BASE_URL}/produkter/${product.handle}`,
      'priceCurrency': 'NOK',
      'price': product.price,
      'priceSpecification': {
        '@type': 'UnitPriceSpecification',
        'priceType': 'https://schema.org/ListPrice',
        'price': product.originalPrice,
        'priceCurrency': 'NOK'
      },
      'availability': 'https://schema.org/InStock',
      'itemCondition': 'https://schema.org/NewCondition',
      'shippingDetails': {
        '@type': 'OfferShippingDetails',
        'shippingRate': {
          '@type': 'MonetaryAmount',
          'value': '0',
          'currency': 'NOK'
        },
        'shippingDestination': {
          '@type': 'DefinedRegion',
          'addressCountry': 'NO'
        },
        'deliveryTime': {
          '@type': 'ShippingDeliveryTime',
          'handlingTime': {
            '@type': 'QuantitativeValue',
            'minValue': 0,
            'maxValue': 1,
            'unitCode': 'DAY'
          },
          'transitTime': {
            '@type': 'QuantitativeValue',
            'minValue': 2,
            'maxValue': 5,
            'unitCode': 'DAY'
          }
        }
      },
      'hasMerchantReturnPolicy': {
        '@type': 'MerchantReturnPolicy',
        'applicableCountry': 'NO',
        'returnPolicyCategory':
          'https://schema.org/MerchantReturnFiniteReturnWindow',
        'merchantReturnDays': 14,
        'returnMethod': 'https://schema.org/ReturnByMail',
        'returnFees': 'https://schema.org/FreeReturn'
      }
    },
    'aggregateRating': aggregateRating,
    'review': reviewNodes
  }))

  const faqSchema: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQ_ENTRIES.map(
      ({ q, a }): Question => ({
        '@type': 'Question',
        'name': q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': a
        }
      })
    )
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(collectionSchema) }}
      />
      {productSchemas.map((schema, i) => (
        <script
          key={`ld-product-${i}`}
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: stringifyJsonLd(schema) }}
        />
      ))}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(faqSchema) }}
      />
    </>
  )
}
