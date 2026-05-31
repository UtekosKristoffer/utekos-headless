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
    <article className='bg-foreground w-full min-w-full max-w-full! text-background'>
      <KlarnaOnSiteMessagingScript />
      <section aria-label='Betalingsinformasjon fra Klarna' className='container mx-auto px-4 py-16 sm:py-24'>
          <KlarnaInfoPagePlacement />
      </section>
    </article>
  )
}
