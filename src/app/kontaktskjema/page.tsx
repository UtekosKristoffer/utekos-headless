// Path: src/app/kontaktskjema/page.tsx
/**
 * @fileoverview Kontaktside med Vercel-inspirert grid-system og mobiltilpasning
 * @module kontaktskjema
 */

import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { BottomGrid } from './sections/BottomGrid'
import { CornerPluses } from './sections/CornerPluses'
import { DesktopSection } from './sections/DesktopSection'
import { MobileSection } from './sections/MobileSection'
import { TopGrid } from './sections/TopGrid'
import { Activity } from 'react'

export const metadata: Metadata = {
  title: 'Kontakt oss',
  description:
    'Kontakt Utekos for hjelp med bestillinger, produktspørsmål eller generelle henvendelser.'
}

export default function SupportPage() {
  return (
    <>
      <main className='container mx-auto my-32 max-w-[76rem] px-4'>
        <div>
          <Activity>
            <TopGrid />
          </Activity>

          {/* Hovedcontainer */}
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
      </main>
      {/* Toaster kan ligge utenfor da den ikke er en del av hoved-layouten */}
      <Toaster richColors />
    </>
  )
}
