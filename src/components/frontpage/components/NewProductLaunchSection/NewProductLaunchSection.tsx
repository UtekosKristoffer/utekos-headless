import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { AmbientBackgroundGlow } from './AmbientBackgroundGlow'
import { FeatureCard } from './FeatureCard'
import { ImageColumn } from './ImageColumn'
import { newProductFeatures } from './newProductFeatures'
import { AnimatedBlock } from '@/components/AnimatedBlock'

const productName = 'Utekos TechDawn™'
const productUrl = '/produkter/utekos-techdawn'

const originalPrice = 1990
const launchPrice = 1790
const discount = originalPrice - launchPrice
const discountPct = Math.round((discount / originalPrice) * 100) // 10

export function NewProductLaunchSection() {
  return (
    <section
      id='featured-product'
      className='relative mx-auto mt-16 max-w-[95%] overflow-hidden rounded-xl border border-neutral-800 py-16 md:max-w-7xl'
      aria-label={`${productName} lansering`}
    >
      <AmbientBackgroundGlow />

      <div className='container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2'>
        <ImageColumn />

        <AnimatedBlock
          className='will-animate-fade-in-right flex flex-col items-start'
          delay='0.2s'
          threshold={0.3}
        >
          {/* Badges – korte, ryddige piller */}
          <div className='mb-4 flex flex-wrap items-center gap-3'>
            <AnimatedBlock
              className='will-animate-fade-in-up inline-flex items-center gap-3 rounded-full border border-sky-800/30 bg-sky-900/20 px-4 py-1.5'
              delay='0.3s'
              threshold={1}
            >
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
                <span className='relative inline-flex h-2 w-2 rounded-full bg-sky-500'></span>
              </span>
              <span className='text-sm font-semibold text-sky-400'>Nyhet</span>
            </AnimatedBlock>

            <AnimatedBlock
              className='will-animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-emerald-800/40 bg-emerald-900/15 px-4 py-1.5'
              delay='0.35s'
              threshold={1}
            >
              <span className='text-sm font-semibold text-emerald-300'>
                Lanseringspris: {launchPrice},-
              </span>
              <span className='text-xs text-emerald-300'>
                spar {discount},-
              </span>
            </AnimatedBlock>
          </div>

          <AnimatedBlock
            className='will-animate-fade-in-up'
            delay='0.4s'
            threshold={1}
          >
            <h2 className='mb-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl'>
              Varmen du kan stole på
            </h2>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up'
            delay='0.5s'
            threshold={1}
          >
            <p className='mb-8 max-w-prose text-lg leading-relaxed text-muted-foreground'>
              Vi introduserer {productName} – vår mest tekniske og allsidige
              modell noensinne. Skapt for komfortsøkende livsnytere som vil
              forlenge kvelden på terrassen, hytta eller ved bobilen – uten å
              fryse.
            </p>
          </AnimatedBlock>

          <div className='mb-8 w-full space-y-3'>
            {newProductFeatures.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                delay={0.6 + idx * 0.1}
              />
            ))}
          </div>

          {/* --- RYDDIG PRISLINJE / CTA-BAR --- */}
          <AnimatedBlock
            className='will-animate-fade-in-up w-full'
            delay='0.9s'
            threshold={1}
          >
            <section
              aria-label='Pris og kjøp'
              className='rounded-xl bg-background/60 backdrop-blur-sm'
            >
              {/* Grid som skalerer pent fra mobil til desktop */}
              <div className='grid items-center gap-4 p-4 sm:p-5 md:grid-cols-[auto,1fr,auto]'>
                {/* Prisblokk – én visuell enhet */}
                <div className='flex items-baseline gap-3'>
                  <p className='text-4xl font-bold tracking-tight text-foreground'>
                    {launchPrice},-
                  </p>
                  <span className='text-sm text-muted-foreground'>
                    inkl. mva
                  </span>

                  <div className='flex items-center gap-2 pl-2'>
                    <del className='text-base text-muted-foreground/70'>
                      {originalPrice},-
                    </del>
                  </div>
                </div>

                {/* Finprint / trygghet – midten på desktop, under på mobil */}
                <p className='text-xs text-muted-foreground md:justify-self-center'>
                  Rabatt i en begrenset periode.
                </p>

                {/* Primær-CTA – høyre på desktop, under på mobil */}
                <div className='md:justify-self-end'>
                  <Button asChild size='lg' className='group w-full sm:w-auto'>
                    <Link
                      href={productUrl}
                      aria-label={`Kjøp ${productName} til lanseringspris`}
                    >
                      Sikre deg lanseringsprisen
                      <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </AnimatedBlock>
          {/* --- /PRISLINJE --- */}
        </AnimatedBlock>
      </div>
    </section>
  )
}
