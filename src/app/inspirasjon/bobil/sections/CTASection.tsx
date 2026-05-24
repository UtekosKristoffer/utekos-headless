import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'

export function CTASection() {
  return (
    <section className='relative overflow-hidden border-t border-cloud-dancer/12 bg-maritime-blue py-24'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,var(--ancient-water)_0%,transparent_32%),radial-gradient(circle_at_82%_20%,var(--soft-warm)_0%,transparent_28%)] opacity-[0.18]' />
      <div className='container relative mx-auto px-4 text-center'>
        <AnimatedBlock className='will-animate-fade-in-scale'>
          <h2 className='mb-6 text-fluid-display font-brand-sans font-bold leading-[0.95] tracking-[-0.01em] text-cloud-dancer'>
            Klar for ditt neste bobil-eventyr?
          </h2>
          <p className='mx-auto mb-8 max-w-2xl font-utekos-text text-xl leading-[1.45] tracking-[-0.02em] text-cloud-dancer/90'>
            Bli med tusenvis av bobilister som har oppdaget hemmeligheten til
            komfortable turer hele året.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <BrandBadge
              asChild
              backgroundColor='var(--primary-button)'
              textColor='var(--color-maritime-darkest)'
              className='group min-h-14 border border-primary-button/24 px-8 py-4 font-utekos-text text-base font-bold leading-[1.4] tracking-[-0.02em] shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105'
            >
              <Link
                href={'/produkter' as Route}
                data-track='BobilShopAllProductsClick'
              >
                Se alle produkter
                <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </BrandBadge>
            <BrandBadge
              asChild
              backgroundColor='var(--color-cloud-dancer)'
              textColor='var(--color-maritime-darkest)'
              className='min-h-14 border border-cloud-dancer/24 px-8 py-4 font-utekos-text text-base font-bold leading-[1.4] tracking-[-0.02em] shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105'
            >
              <Link
                href={'/handlehjelp/storrelsesguide' as Route}
                data-track='BobilFindYourSizeClick'
              >
                Finn din størrelse
              </Link>
            </BrandBadge>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  )
}
