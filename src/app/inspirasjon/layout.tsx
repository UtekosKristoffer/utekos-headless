// /app/inspirasjon/layout.tsx

import { KlarnaOnSiteMessagingScript } from '@/components/klarna/components/KlarnaOnSiteMessagingScript'
import { KlarnaTopStripPromotionBadge } from '@/components/klarna/components/KlarnaTopStripPromotionBadge'
import Link from 'next/link'
import { TrustIndicators } from './layout/sections/TrustIndicators'
import { inspirationPages } from './layout/inspirationPages'
import type { ReactNode } from 'react'

interface InspirasjonLayoutProps {
  children: ReactNode
}

export default function InspirasjonLayout({ children }: InspirasjonLayoutProps) {
  return (
    <article className='inspirasjon-route w-full'>
      <section aria-label='Betalingsinformasjon fra Klarna' className='klarna-top-strip'>
        <KlarnaOnSiteMessagingScript />
        <KlarnaTopStripPromotionBadge />
      </section>

      {children}

      <section className='border-t w-full border-chocolate-plum/35 bg-background py-16'>
        <div className='container w-full mx-auto px-4'>
          <div className='mb-12 w-full text-center'>
            <h2 className='mb-4 w-full mx-auto text-foreground'>Mer inspirasjon for dine øyeblikk</h2>
            <p className='mx-auto max-w-2xl utekos-section-lead text-foreground'>
              Finn ideer til situasjoner der komfort møter norsk natur. Se hvordan små grep gjør
              uteøyeblikkene varmere.
            </p>
          </div>
          <div className='mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-4'>
            {inspirationPages.map(page => (
              <Link
                key={page.href}
                href={page.href}
                className='group block w-full max-w-72 sm:w-[calc(50%-0.5rem)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4rem)/5)]'
              >
                <div className='relative h-full overflow-hidden rounded-lg border border-cloud-dancer/18 bg-mountain-view p-6 text-center text-foreground shadow-[0_18px_46px_-34px_color-mix(in_oklch,var(--background)_55%,transparent)] transition-all hover:-translate-y-1 hover:border-cloud-dancer/28 hover:shadow-[0_24px_58px_-38px_color-mix(in_oklch,var(--background)_70%,transparent)]'>
                  <div className='mb-4 flex flex-col items-center justify-center gap-3'>
                    <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-mineral-green'>
                      <page.icon className='size-5 text-fairest-jade' aria-hidden />
                    </div>
                    <h3 className='text-center font-bold leading-[0.95] tracking-[-0.01em] text-foreground'>
                      {page.label}
                    </h3>
                  </div>
                  <p className='text-center text-sm leading-text-paragraph tracking-[-0.01em] text-foreground'>
                    {page.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <TrustIndicators />
    </article>
  )
}
