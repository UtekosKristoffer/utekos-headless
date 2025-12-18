import { cacheLife, cacheTag } from 'next/cache'
import type { FAQPage, WithContext } from 'schema-dts'

export async function ShippingAndReturnsPageJsonLd() {
  'use cache'
  cacheLife('max')
  cacheTag('shipping-returns-jsonld')

  const jsonLd: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Hva koster frakten hos Utekos?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'Vi tilbyr gratis frakt på alle bestillinger over 999 kr i hele Norge. For bestillinger under dette beløpet vil fraktkostnaden bli spesifisert i kassen.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Hvor lang er angreretten?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'Som kunde hos Utekos har du alltid 14 dagers angrerett, som gjelder fra den dagen du mottar varen din. Dette gir deg trygghet til å se og føle på produktet hjemme.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Hvordan returnerer jeg en vare?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'For å returnere en vare, send en e-post til kundeservice@utekos.no med ditt ordrenummer og informasjon om hvilke produkter det gjelder. Deretter pakker du varen forsvarlig og sender den tilbake til oss. Du er selv ansvarlig for returfrakten.'
        }
      }
    ]
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
