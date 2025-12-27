import { LandingPageJsonLd } from './LandingPageJsonLd'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skreddersy varmen | Juster, form og nyt',
  description:
    'Utekos® definerer en ny standard for utendørs velvære, der funksjon møter kompromissløs komfort. Juster, form og nyt.',
  category: 'Yttertøy',
    creator: 'Utekos',
  publisher: 'Utekos',
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    title: 'Skreddersy varmen | Juster, form og nyt',
    description:
      ' Utekos® definerer en ny standard for utendørs velvære, der funksjon møter kompromissløs komfort. Juster, form og nyt.',
    url: 'https://utekos.no/skreddersy-varmen',
    siteName: 'Utekos',
    images: [
      {
        url: 'https://utekos.no/empathy-bonfire.png',
        width: 1200,
        height: 630,
        alt: 'Skreddersy varmen etter behov - Finn din favoritt'
      }
    ]
  }
}
export default function LandingPageLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      <LandingPageJsonLd />

      {children}
    </>
  )
}
