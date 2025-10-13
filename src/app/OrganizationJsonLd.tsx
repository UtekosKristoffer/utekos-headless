import type { Organization, WithContext } from 'schema-dts'

export function OrganizationJsonLd() {
  const jsonLd: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Utekos',
    'url': 'https://utekos.no',
    'logo': 'https://utekos.no/logo.png', // VIKTIG: Bytt ut med den faktiske stien til logoen din
    'sameAs': [

     'https://www.facebook.com/utekosen',
       'https://www.instagram.com/utekos.no'
    ]
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

