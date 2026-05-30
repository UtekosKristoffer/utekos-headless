import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'

export function CTASection() {
  return (
    <section className='relative overflow-hidden border-t border-cloud-dancer/12 bg-maritime-darkest py-24'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,var(--ancient-water)_0%,transparent_32%),radial-gradient(circle_at_82%_20%,var(--soft-warm)_0%,transparent_28%)] opacity-[0.18]' />
      <div className='container relative mx-auto px-4 text-center'>
        <AnimatedBlock className='will-animate-fade-in-scale'>
          <h2 className='mb-6 text-cloud-dancer'>Klar for å bli nabolagets grillkonge?</h2>
          <p className='mx-auto mb-8 max-w-2xl utekos-section-lead text-cloud-dancer/88'>
            Sørg for at du har hemmeligheten til vellykket helårsgrilling i skapet. Gjestene dine vil takke
            deg.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <BrandBadge
              asChild
              backgroundColor='var(--primary)'
              textColor='var(--maritime-darkest)'
              className='group min-h-14 border border-primary/24 px-8 py-4 text-base leading-[1.4] font-bold tracking-normal shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105'
            >
              <Link href={'/produkter' as Route} data-track='GrillkveldenShopAllProductsClick'>
                Se alle produkter
                <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </BrandBadge>
            <BrandBadge
              asChild
              backgroundColor='var(--cloud-dancer)'
              textColor='var(--maritime-darkest)'
              className='min-h-14 border border-cloud-dancer/24 px-8 py-4 text-base leading-[1.4] font-bold tracking-normal shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105'
            >
              <Link href={'/handlehjelp/storrelsesguide' as Route} data-track='GrillkveldenFindYourSizeClick'>
                Finn din størrelse
              </Link>
            </BrandBadge>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  )
}
