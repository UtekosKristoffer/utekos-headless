// Path: src/app/kampanje/julegaver/lokal-levering/BergenDeliveryJsonLd.tsx

import { cacheLife, cacheTag } from 'next/cache'
import type {
  CollectionPage,
  WithContext,
  ListItem,
  OfferShippingDetails,
  MerchantReturnPolicy,
  ItemAvailability,
  OfferItemCondition
} from 'schema-dts'

export async function BergenDeliveryJsonLd() {
  'use cache'
  cacheLife('max')
  cacheTag('campaign-bergen-delivery')

  const baseUrl = 'https://utekos.no'
  const currentUrl = `${baseUrl}/kampanje/julegaver/lokal-levering`

  const priceValidUntil = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  )
    .toISOString()
    .slice(0, 10)

  const localShippingDetails: OfferShippingDetails = {
    '@type': 'OfferShippingDetails',
    'shippingRate': {
      '@type': 'MonetaryAmount',
      'value': '0',
      'currency': 'NOK'
    },
    'shippingDestination': {
      '@type': 'DefinedRegion',
      'addressCountry': 'NO',
      'addressRegion': 'Bergen'
    },
    'deliveryTime': {
      '@type': 'ShippingDeliveryTime',
      'businessDays': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'https://schema.org/Monday',
          'https://schema.org/Tuesday',
          'https://schema.org/Wednesday',
          'https://schema.org/Thursday',
          'https://schema.org/Friday',
          'https://schema.org/Saturday',
          'https://schema.org/Sunday'
        ]
      },
      'cutoffTime': '21:00:00+01:00',
      'handlingTime': {
        '@type': 'QuantitativeValue',
        'minValue': 0,
        'maxValue': 0,
        'unitCode': 'd'
      },
      'transitTime': {
        '@type': 'QuantitativeValue',
        'minValue': 0,
        'maxValue': 1,
        'unitCode': 'd'
      }
    }
  }

  const holidayReturnPolicy: MerchantReturnPolicy = {
    '@type': 'MerchantReturnPolicy',
    'returnPolicyCategory':
      'https://schema.org/MerchantReturnFiniteReturnWindow',
    'merchantReturnDays': 60,
    'returnMethod': 'https://schema.org/ReturnByMail',
    'returnFees': 'https://schema.org/ReturnFeesCustomerResponsibility',
    'refundType': 'https://schema.org/FullRefund',
    'description': 'Utvidet bytterett frem til 15. januar for julegaver.'
  }

  const products = [
    {
      position: 1,
      name: 'Utekos TechDown™',
      url: `${baseUrl}/produkter/utekos-techdown`,
      image: `${baseUrl}/magasinet/techdown-1080.png`,
      price: '1790',
      description:
        'Vår varmeste mest allsidige modell. Optimalisert etter erfaringer og tilbakemeldinger.'
    },
    {
      position: 2,
      name: 'Utekos Mikrofiber',
      url: `${baseUrl}/produkter/utekos-mikrofiber`,
      image: `${baseUrl}/magasinet/dun-front-hvit-bakgrunn-1080.png`,
      price: '1590',
      description:
        'Lettvekt møter varme og allsidighet. Gir deg følelsen av dun med ekstra fordeler.'
    },
    {
      position: 3,
      name: 'Utekos Dun',
      url: `${baseUrl}/produkter/utekos-dun`,
      image: `${baseUrl}/magasinet/mikro-front-1080.png`,
      price: '1990',
      description: 'Klassisk dun-kvalitet for de kaldeste dagene.'
    },
    {
      position: 4,
      name: 'Utekos Comfyrobe',
      url: `${baseUrl}/produkter/comfyrobe`,
      image: `${baseUrl}/magasinet/comfy-front-u-bakgrunn-1080.png`,
      price: '1290',
      description: 'Den ultimate skifteroben. Vindtett, vanntett og foret.'
    }
  ]

  const itemListElement: ListItem[] = products.map(product => ({
    '@type': 'ListItem',
    'position': product.position,
    'url': product.url,
    'item': {
      '@type': 'Product',
      'name': product.name,
      'description': product.description,
      'image': product.image,
      'url': product.url,
      'offers': {
        '@type': 'Offer',
        'price': product.price,
        'priceCurrency': 'NOK',
        'priceValidUntil': priceValidUntil,
        'availability': 'https://schema.org/InStock' as ItemAvailability,
        'itemCondition':
          'https://schema.org/NewCondition' as OfferItemCondition,
        'url': product.url,
        'areaServed': {
          '@type': 'City',
          'name': 'Bergen'
        },
        'hasMerchantReturnPolicy': holidayReturnPolicy,
        'shippingDetails': localShippingDetails
      }
    }
  }))

  const jsonLd: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name':
      'Vi leverer årets varmeste julegave helt hjem til deg – ferdig innpakket | Bergen ',
    'description':
      'Utekos  kjører ut bestillinger i Bergen hver dag frem til julaften - helt uten ekstra kostnad.',
    'url': currentUrl,
    'spatialCoverage': {
      '@type': 'Place',
      'name': 'Bergen'
    },
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': itemListElement,
      'numberOfItems': products.length
    }
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
      }}
    />
  )
}
