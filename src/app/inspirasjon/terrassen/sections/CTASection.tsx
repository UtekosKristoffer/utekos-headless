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
          <h2 className='mb-6 text-fluid-display font-bold leading-[0.95] tracking-normal text-cloud-dancer'>
            Klar for å oppgradere uteplassen?
          </h2>
          <p className='mx-auto mb-8 max-w-2xl text-xl leading-[1.45] tracking-normal text-overcast'>
            Invester i komforten som gjør at du kan nyte ditt eget hjem enda
            mer, uansett årstid.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <BrandBadge
              asChild
              backgroundColor='var(--primary-button)'
              textColor='var(--maritime-darkest)'
              className='group min-h-14 border border-primary-button/24 px-8 py-4 text-base leading-[1.4] font-bold tracking-normal shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105'
            >
              <Link
                href={'/produkter' as Route}
                data-track='TerrassenShopAllProductsClick'
              >
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
              <Link
                href={'/handlehjelp/storrelsesguide' as Route}
                data-track='TerrassenFindYourSizeClick'
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
