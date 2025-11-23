// Path: src/app/handlehjelp/vask-og-vedlikehold/MaintenanceJsonLd.tsx
import type { HowTo, WithContext } from 'schema-dts'

export function MaintenanceJsonLd() {
  const jsonLd: WithContext<HowTo> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'Slik tar du vare på dine Utekos-plagg',
    'description':
      'En steg-for-steg guide til riktig vask, tørking og oppbevaring av Utekos-produkter for å sikre maksimal levetid og komfort.',
    'image': {
      '@type': 'ImageObject',
      'url': 'https://utekos.no/og-image-vedlikehold.jpg',
      'height': '630',
      'width': '1200'
    },
    'totalTime': 'PT1H',
    'supply': [
      {
        '@type': 'HowToSupply',
        'name': 'Mildt vaskemiddel'
      },
      {
        '@type': 'HowToSupply',
        'name': 'Tennisballer (for dun)'
      }
    ],
    'tool': [
      {
        '@type': 'HowToTool',
        'name': 'Vaskemaskin'
      },
      {
        '@type': 'HowToTool',
        'name': 'Tørketrommel'
      }
    ],
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Forberedelse',
        'text':
          'Lukk alle glidelåser og vreng plagget før vask for å beskytte overflaten.',
        'position': 1,
        'url': 'https://utekos.no/handlehjelp/vask-og-vedlikehold#forberedelse'
      },
      {
        '@type': 'HowToStep',
        'name': 'Vask',
        'text':
          'Vask på finvaskprogram (maks 30°C) med et mildt vaskemiddel. Unngå skyllemiddel da det kan skade stoffets pusteegenskaper.',
        'position': 2,
        'url': 'https://utekos.no/handlehjelp/vask-og-vedlikehold#vask'
      },
      {
        '@type': 'HowToStep',
        'name': 'Tørking',
        'text':
          'Bruk tørketrommel på lav varme. For dunprodukter: bruk tennisballer for å fluffe opp dunet igjen under tørking.',
        'position': 3,
        'url': 'https://utekos.no/handlehjelp/vask-og-vedlikehold#torking'
      },
      {
        '@type': 'HowToStep',
        'name': 'Oppbevaring',
        'text':
          'Oppbevar plagget tørt og luftig. Unngå å komprimere dunprodukter over lengre tid.',
        'position': 4,
        'url': 'https://utekos.no/handlehjelp/vask-og-vedlikehold#oppbevaring'
      }
    ],
    'publisher': {
      '@id': 'https://utekos.no/#organization'
    },
    'author': {
      '@id': 'https://utekos.no/#organization'
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://utekos.no/handlehjelp/vask-og-vedlikehold'
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
