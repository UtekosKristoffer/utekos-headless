// Path: src/config/footer.config.ts

import type { Route } from 'next'

export type FooterLink = {
  title: string
  path: Route
  external?: boolean
}

export type FooterSection = {
  title: string
  links: FooterLink[]
}

export const footerConfig: FooterSection[] = [
  {
    title: 'Handlehjelp',
    links: [
      {
        title: 'Kontakt oss',
        path: '/kontaktskjema' as Route
      },
      {
        title: 'Produktguide',
        path: '/handlehjelp/teknologi-materialer' as Route
      },
      {
        title: 'Vask og vedlikehold',
        path: '/handlehjelp/vask-og-vedlikehold' as Route
      },
      {
        title: 'Størrelses­guide',
        path: '/handlehjelp/storrelsesguide' as Route
      }
    ]
  },
  {
    title: 'Kundeservice',
    links: [
      {
        title: 'Kundeservice',
        path: '/kontaktskjema' as Route
      },
      {
        title: 'Tlf: +47 40 21 63 43',
        path: 'tel:+4740216343' as Route,
        external: true
      },
      {
        title: 'E-post: info@utekos.no',
        path: 'mailto:info@utekos.no' as Route,
        external: true
      }
    ]
  },
  {
    title: 'Informasjon',
    links: [
      {
        title: 'Om oss',
        path: '/om-oss' as Route
      },
      {
        title: 'Vilkår og betingelser',
        path: '/vilkar-betingelser' as Route
      },
      {
        title: 'Personvern',
        path: '/personvern' as Route
      }
    ]
  }
]
