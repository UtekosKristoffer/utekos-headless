import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ArrowRight, Check } from 'lucide-react'
import { VippsLogo } from '@/components/payments/VippsLogo'
import { KlarnaLogo } from '@/components/payments/KlarnaLogo'

export function CTASection() {
  return (
    <section className='relative isolate overflow-hidden bg-overcast py-24 sm:py-32'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-1/2 top-1/2 h-152 w-152 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ancient-water)_64%,transparent)_0%,transparent_72%)] blur-[110px]' />
        <div className='absolute bottom-10 right-[12%] size-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--very-peri)_20%,transparent)_0%,transparent_72%)] blur-3xl' />
      </div>

      <div className='container mx-auto max-w-4xl px-4'>
        <div className='relative overflow-hidden rounded-[1.75rem] border border-cloud-dancer/70 bg-cloud-dancer/72 p-10 text-center shadow-2xl shadow-havdyp/10 backdrop-blur-sm md:p-16'>
          <div className='absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-very-peri/55 to-transparent' />
          <div className='absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-havdyp/18 to-transparent' />
          <div className='relative z-10'>
            <AnimatedBlock className='mb-8 will-animate-fade-in-scale' delay='0s' threshold={0.2}>
              <BrandBadge
                label='Oppdag kolleksjonen'
                backgroundColor='var(--background)'
                textColor='var(--cloud-dancer)'
                className='shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--very-peri)_80%,transparent)]'
              />
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up' delay='0.08s' threshold={0.2}>
              <h2 className='mb-6 text-3xl leading-[0.95] font-bold font-google-sans   text-background md:text-5xl'>
                Klar til å ta kvelden tilbake?
              </h2>
            </AnimatedBlock>
            <AnimatedBlock className='will-animate-fade-in-up' delay='0.16s' threshold={0.2}>
              <p className='mx-auto mt-4 max-w-2xl text-lg font-utekos-text leading-text-paragraph     text-background md:text-xl'>
                Opplev hvordan banebrytende innovasjon og tidløs eleganse kan forvandle en kjølig kveld til
                ditt favorittøyeblikk.
              </p>
            </AnimatedBlock>
            <AnimatedBlock className='mt-10 will-animate-fade-in-up' delay='0.24s' threshold={0.2}>
              <BrandBadge
                asChild
                backgroundColor='var(--primary)'
                textColor='var(--background)'
                className='group gap-2 px-8 py-4 text-base font-semibold tracking-[-0.01em] shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--primary)_90%,transparent)] transition-transform duration-300 hover:scale-[1.02]'
              >
                <Link
                  href='/produkter'
                  data-track='AboutUsShopAllProductsClick'
                  className='  text-base font-medium   text-background'
                >
                  Se alle produkter
                  <ArrowRight className='size-5 transition-transform duration-300 group-hover:translate-x-1' />
                </Link>
              </BrandBadge>
            </AnimatedBlock>
            <AnimatedBlock
              className='mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-md text-background will-animate-fade-in-up'
              delay='0.32s'
              threshold={0.2}
            >
              <div className='flex text-md items-center gap-2'>
                <Check className='size-4' />
                <span>Skapt for norske forhold</span>
              </div>
              <div className='flex text-md items-center gap-2'>
                <Check className='size-4' />
                <span>Fri frakt over 999,-</span>
              </div>
              <div className='flex text-md items-center gap-2'>
                <span>Trygg handel med</span>
                <div className='ml-1 flex items-center gap-3 opacity-80 transition-opacity hover:opacity-100'>
                  <VippsLogo className='h-4 w-auto' />
                  <KlarnaLogo className='h-3.5 w-auto' />
                </div>
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </div>
    </section>
  )
}
