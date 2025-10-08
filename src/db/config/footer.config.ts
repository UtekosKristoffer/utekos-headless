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
        title: 'Teknologi og materialer',
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
        title: 'Fraktinformasjon',
        path: '/frakt-og-retur' as Route
      },
      {
        title: 'Personvern',
        path: '/personvern' as Route
      }
    ]
  },
  {
    title: 'Bedriftsinformasjon',
    links: [
      {
        title: 'Kelc As',
        path: '/' as Route
      },
      {
        title: 'Lille Damsgårdsveien 25',
        path: 'map:Lille Damsgårdsveien 25' as Route,
        external: true
      },
      {
        title: '5162, Bergen',
        path: 'map:Lille Damsgårdsveien 25, 5162, Bergen' as Route,
        external: true
      },
      {
        title: 'Org.nr 925 820 393',
        path: '/kontaktskjema' as Route
      }
    ]
  }
]
