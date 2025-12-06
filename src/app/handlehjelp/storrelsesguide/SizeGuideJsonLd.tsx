import { cacheLife, cacheTag } from 'next/cache'
import type { FAQPage, WithContext } from 'schema-dts'

export async function SizeGuideJsonLd() {
  'use cache'
  cacheLife('max')
  cacheTag('jsonld-size-guide')

  const jsonLd: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://utekos.no/handlehjelp/storrelsesguide'
    },
    'author': {
      '@id': 'https://utekos.no/#organization'
    },
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Hvilken størrelse Utekos-plagg skal jeg velge?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'Våre plagg er designet for en romslig og komfortabel passform. Vi anbefaler å se på målene for hvert spesifikke produkt i vår størrelsesguide. Et godt tips er å sammenligne målene med et favorittplagg du har hjemme.'
        }
      },
      {
        '@type': 'Question',
        'name':
          'Hva er forskjellen i størrelse mellom Utekos Dun og Comfyrobe?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'Comfyrobe har en mer detaljert størrelsesinndeling (XS/S, M/L, L/XL), mens Utekos Dun og Mikrofiber kommer i to hovedstørrelser (Medium og Large) designet for å passe et bredt spekter av kroppsfasonger. Se de nøyaktige målene for hvert produkt på vår størrelsesguide-side.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Hvordan måler jeg for å finne riktig størrelse?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':
            'Legg et lignende plagg du eier flatt på et gulv eller bord. Mål punkter som total lengde, brystbredde og ermelengde, og sammenlign disse med målene i våre tabeller for å finne den beste matchen.'
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
