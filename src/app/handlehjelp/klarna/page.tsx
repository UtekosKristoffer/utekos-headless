import { KlarnaInfoPagePlacement } from '@/components/klarna/components/KlarnaInfoPagePlacementComponent'
import { KlarnaOnSiteMessagingScript } from '@/components/klarna/components/KlarnaOnSiteMessagingScript'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Betaling med Klarna | Utekos',
  description: 'Finn oppdatert informasjon om betaling med Klarna hos Utekos.',
  alternates: {
    canonical: '/handlehjelp/klarna'
  },
  openGraph: {
    title: 'Betaling med Klarna | Utekos',
    description: 'Finn oppdatert informasjon om betaling med Klarna hos Utekos.',
    url: '/handlehjelp/klarna',
    siteName: 'Utekos',
    locale: 'no_NO',
    type: 'website'
  }
}

export default function KlarnaHelpPage() {
  return (
    <main className='bg-cloud-dancer text-havdyp'>
      <KlarnaOnSiteMessagingScript />
      <section className='container mx-auto max-w-5xl px-4 py-16 sm:py-24'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-sm font-semibold uppercase tracking-normal text-background'>Betaling</p>
          <h1 className='mt-3 text-4xl font-bold leading-[0.95] tracking-normal text-background sm:text-5xl'>
            Betaling med Klarna
          </h1>
        </div>

        <section
          aria-label='Betalingsinformasjon fra Klarna'
          className='mt-10 overflow-hidden rounded-lg border border-background/12 bg-white p-4 shadow-[0_18px_46px_-36px_rgba(14,18,35,0.48)] sm:p-6'
        >
          <KlarnaInfoPagePlacement />
        </section>
      </section>
    </main>
  )
}
