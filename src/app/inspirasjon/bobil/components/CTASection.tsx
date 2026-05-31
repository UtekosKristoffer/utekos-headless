import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'

export function CTASection() {
  return (
    <section className='relative overflow-hidden border-t border-cloud-dancer/12 bg-background py-24'>
      <div
        className='absolute inset-0 opacity-[0.18]'
        style={{
          background:
            'radial-gradient(circle at 18% 12%, var(--ancient-water) 0%, transparent 32%), radial-gradient(circle at 82% 20%, var(--soft-warm) 0%, transparent 28%)'
        }}
      />
      <div className='container relative mx-auto px-4 text-center'>
        <AnimatedBlock className='will-animate-fade-in-scale'>
          <h2 className='mb-6 font-google-sans text-cloud-dancer'>Klar for ditt neste bobil-eventyr?</h2>
          <p className='mx-auto mb-8 max-w-2xl   text-xl leading-[1.45] tracking-[-0.02em] text-cloud-dancer/90'>
            Bli med tusenvis av bobilister som har oppdaget varme som gjør hvert stopp verdt å huske.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <BrandBadge
              asChild
              backgroundColor='var(--primary)'
              textColor='var(--color-background)'
              className='group min-h-14 border border-primary/24 px-8 py-4   text-base font-bold leading-[1.4] tracking-[-0.02em] shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            >
              <Link href={'/produkter' as Route} data-track='BobilShopAllProductsClick'>
                Se alle produkter
                <ArrowRight
                  className='size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none'
                  aria-hidden
                />
              </Link>
            </BrandBadge>
            <BrandBadge
              asChild
              backgroundColor='var(--color-cloud-dancer)'
              textColor='var(--color-background)'
              className='min-h-14 border border-cloud-dancer/24 px-8 py-4   text-base font-bold leading-[1.4] tracking-[-0.02em] shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cloud-dancer/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            >
              <Link href={'/handlehjelp/storrelsesguide' as Route} data-track='BobilFindYourSizeClick'>
                Finn din størrelse
              </Link>
            </BrandBadge>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  )
}
