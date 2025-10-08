// Path: src/app/frakt-og-retur/page.tsx
import { InfoSidebar } from '@/app/frakt-og-retur/components/InfoSideBar'
import { ShippingReturnsHeader } from '@/app/frakt-og-retur/components/ShippingReturnsHeader'
import { ShippingReturnsInfo } from '@/app/frakt-og-retur/components/ShippingReturnsInfo'
import type { Metadata } from 'next'
import { jsonLd } from './ShippingAndReturnsPageHelpers/jsonLd'
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Frakt og retur | Enkel og trygg handel hos Utekos',
  description:
    'Vi tilbyr fri frakt på ordre over 999 kr og en enkel 14-dagers angrerett. Les våre fulle vilkår for en trygg og forutsigbar handleopplevelse.',
  alternates: {
    canonical: '/frakt-og-retur'
  },
  openGraph: {
    title: 'Frakt og retur | Enkel og trygg handel hos Utekos',
    description:
      'Få svar på alt du lurer på om levering og retur. Handle trygt hos oss.',
    url: '/frakt-og-retur',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-frakt.webp',
        width: 1200,
        height: 630,
        alt: 'En Utekos-pakke klar for sending.'
      }
    ],
    locale: 'no_NO',
    type: 'website'
  }
}

export default function ShippingAndReturnsPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className='container mx-auto px-4 py-12 sm:py-16'>
        <ShippingReturnsHeader />
        <div className='mx-auto mt-16 max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12'>
          <ShippingReturnsInfo />
          <InfoSidebar />
        </div>
      </main>
    </>
  )
}
