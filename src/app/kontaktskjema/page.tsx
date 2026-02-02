// Path: src/app/kontaktskjema/page.tsx

import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { BottomGrid } from './components/BottomGrid'
import { CornerPluses } from './components/CornerPluses'
import { DesktopSection } from './components/DesktopSection'
import { MobileSection } from './components/MobileSection'
import { TopGrid } from './components/TopGrid'
import { Activity } from 'react'

export const metadata: Metadata = {
  title: 'Kontakt oss | Kundeservice',
  description:
    'Kontakt Utekos for hjelp med bestillinger, produktspørsmål eller generelle henvendelser. Vi er her for å hjelpe deg.',
  alternates: {
    canonical: '/kontaktskjema'
  },
  openGraph: {
    title: 'Kontakt oss | Utekos Kundeservice',
    description:
      'Har du spørsmål om våre produkter eller din bestilling? Ta kontakt med oss her.',
    url: '/kontaktskjema',
    siteName: 'Utekos',
    locale: 'no_NO',
    type: 'website',
    images: [
      {
        url: '/og-image-produkter.png',
        width: 1200,
        height: 630,
        alt: 'Kundeservice Utekos'
      }
    ]
  }
}

export default function SupportPage() {
  return (
    <>
      <section className='container mx-auto my-32 max-w-[76rem] px-4'>
        <div>
          <Activity>
            <TopGrid />
          </Activity>
          <Activity>
            <div className='relative border border-white/10 bg-background'>
              <Activity>
                <CornerPluses />
              </Activity>
              <Activity>
                <DesktopSection />
              </Activity>
              <Activity>
                <MobileSection />
              </Activity>
            </div>
          </Activity>

          <Activity>
            <BottomGrid />
          </Activity>
        </div>
      </section>
      <Toaster richColors />
    </>
  )
}

