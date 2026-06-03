// /app/inspirasjon/layout.tsx

import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { KlarnaOnSiteMessagingScript } from '@/components/klarna/components/KlarnaOnSiteMessagingScript'
import { KlarnaTopStripPromotionBadge } from '@/components/klarna/components/KlarnaTopStripPromotionBadge'
import { inspirationPages } from './layout/inspirationPages'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { TrustIndicators } from './layout/sections/TrustIndicators'
import { Activity } from 'react'
import type { CSSProperties } from 'react'
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

      <section className='border-t border-chocolate-plum/35 bg-overcast py-16'>
        <div className='container mx-auto px-4'>
          <div className='mb-12 text-center'>
            <h2 className='mb-4 text-background'>Mer inspirasjon for dine øyeblikk</h2>
            <p className='mx-auto max-w-2xl utekos-section-lead text-havdyp'>
              Finn ideer til situasjoner der komfort møter norsk natur. Se hvordan små grep gjør
              uteøyeblikkene varmere.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5'>
            {inspirationPages.map((page, pageIndex) => (
              <Link key={page.href} href={page.href} className='group block'>
                <div
                  className='relative h-full overflow-hidden rounded-lg border border-background/14 bg-[var(--inspiration-card-bg)] p-6 text-[var(--inspiration-card-text)] shadow-[0_18px_46px_-34px_rgba(12,18,32,0.55)] transition-all hover:-translate-y-1 hover:border-background/28 hover:shadow-[0_24px_58px_-38px_rgba(12,18,32,0.7)]'
                  style={
                    {
                      '--inspiration-card-bg': page.color,
                      '--inspiration-card-mid': page.midColor,
                      '--inspiration-card-text': pageIndex >= 3 ? 'var(--cloud-dancer)' : 'var(--background)',
                      '--inspiration-card-muted':
                        pageIndex >= 3 ?
                          'color-mix(in oklab, var(--cloud-dancer) 78%, transparent)'
                        : 'color-mix(in oklab, var(--background) 76%, transparent)',
                      '--inspiration-card-border':
                        pageIndex >= 3 ?
                          'color-mix(in oklab, var(--cloud-dancer) 24%, transparent)'
                        : 'color-mix(in oklab, var(--background) 18%, transparent)',
                      '--inspiration-icon-default': pageIndex === 0 ? 'var(--background)' : page.color,
                      '--inspiration-icon-hover': pageIndex === 0 ? page.color : 'var(--background)'
                    } as CSSProperties
                  }
                >
                  <div
                    className='pointer-events-none absolute inset-0 opacity-85 transition-opacity group-hover:opacity-100'
                    style={{
                      background:
                        'linear-gradient(145deg, var(--inspiration-card-bg) 0%, var(--inspiration-card-mid) 52%, color-mix(in oklab, var(--inspiration-card-bg) 84%, var(--background) 16%) 100%)'
                    }}
                  />
                  <div
                    className='pointer-events-none absolute inset-x-0 top-0 h-px'
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, var(--inspiration-card-border), transparent)'
                    }}
                  />
                  <div className='relative'>
                    <div className='mb-4 flex items-center gap-3'>
                      <div className='flex size-10 shrink-0 items-center justify-center rounded-lg border border-[var(--inspiration-card-border)] bg-cloud-dancer'>
                        <page.icon className='size-5 text-[var(--inspiration-icon-default)] transition-colors group-hover:text-[var(--inspiration-icon-hover)]' />
                      </div>
                      <h3 className='font-bold leading-[0.95] tracking-[-0.01em] text-[var(--inspiration-card-text)] transition-colors'>
                        {page.label}
                      </h3>
                    </div>
                    <p className='text-sm leading-text-paragraph tracking-[-0.01em] text-[var(--inspiration-card-muted)]'>
                      {page.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className='mt-12 text-center'>
            <p className='mb-4 text-base leading-text-paragraph     text-havdyp'>
              Klar til å oppleve komforten selv?
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <BrandBadge
                asChild
                backgroundColor='var(--background)'
                textColor='var(--cloud-dancer)'
                className='border border-cloud-dancer/14 px-7 py-3 text-base font-medium leading-text-paragraph tracking-[-0.01em] shadow-[0_18px_38px_-28px_rgba(14,18,35,0.86)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-havdyp focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusted-peri/70 focus-visible:ring-offset-2 focus-visible:ring-offset-overcast'
              >
                <Link href='/produkter'>Se alle produkter</Link>
              </BrandBadge>
              <BrandBadge
                asChild
                backgroundColor='var(--cloud-dancer)'
                textColor='var(--background)'
                className='border border-background/14 px-7 py-3 text-base font-medium leading-text-paragraph tracking-[-0.01em] shadow-[0_18px_38px_-30px_rgba(14,18,35,0.42)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cloud-dancer/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/55 focus-visible:ring-offset-2 focus-visible:ring-offset-overcast'
              >
                <Link href='/handlehjelp/storrelsesguide'>Finn din størrelse</Link>
              </BrandBadge>
            </div>
          </div>
        </div>
      </section>
      <TrustIndicators />
    </article>
  )
}
