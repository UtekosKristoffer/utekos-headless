// Path: src/app/inspirasjon/terrassen/sections/CTASection.tsx

import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'

export function CTASection() {
  return (
    <section className='relative isolate overflow-hidden border-t border-cloud-dancer/12 bg-background py-24 md:py-32 lg:py-40'>
      <div className='pointer-events-none absolute inset-0 -z-10 opacity-[0.18]'>
        <div
          className='absolute left-[12%] top-[8%] size-[28rem] rounded-full blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 58%, transparent) 0%, transparent 68%)'
          }}
        />
        <div
          className='absolute right-[10%] top-[12%] size-[26rem] rounded-full blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--primary) 42%, transparent) 0%, transparent 68%)'
          }}
        />
      </div>

      <div className='container relative mx-auto px-4 text-center'>
        <AnimatedBlock className='will-animate-fade-in-scale'>
          <h2 className='mb-6 text-cloud-dancer'>Klar for å oppgradere uteplassen?</h2>
          <p className='mx-auto mb-8 utekos-section-lead max-w-2xl text-cloud-dancer'>
            Invester i komforten som gjør at du kan nyte ditt eget hjem enda mer, uansett årstid.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <BrandBadge
              asChild
              backgroundColor='var(--primary)'
              textColor='var(--background)'
              className='group min-h-14 border border-primary/24 px-8 py-4 text-base leading-[1.4] font-bold     shadow-[0_22px_52px_-34px_color-mix(in_oklch,var(--primary)_62%,transparent)] transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none'
            >
              <Link href={'/produkter' as Route} data-track='TerrassenShopAllProductsClick'>
                Se alle produkter
                <ArrowRight className='size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none' />
              </Link>
            </BrandBadge>
            <BrandBadge
              asChild
              backgroundColor='var(--cloud-dancer)'
              textColor='var(--background)'
              className='min-h-14 border border-cloud-dancer/24 px-8 py-4 text-base leading-[1.4] font-bold     shadow-[0_18px_42px_-34px_color-mix(in_oklch,var(--cloud-dancer)_48%,transparent)] transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cloud-dancer/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none'
            >
              <Link href={'/handlehjelp/storrelsesguide' as Route} data-track='TerrassenFindYourSizeClick'>
                Finn din størrelse
              </Link>
            </BrandBadge>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  )
}
