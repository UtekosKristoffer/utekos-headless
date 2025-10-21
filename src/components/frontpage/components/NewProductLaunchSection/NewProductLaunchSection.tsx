import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, TrendingDown } from 'lucide-react'
import { AmbientBackgroundGlow } from './AmbientBackgroundGlow'
import { FeatureCard } from './FeatureCard'
import { ImageColumn } from './ImageColumn'
import { newProductFeatures } from './newProductFeatures'
import { AnimatedBlock } from '@/components/AnimatedBlock'

const productName = 'Utekos TechDawn™'
const productUrl = '/produkter/utekos-techdawn'

// Lanseringstilbud konfigurasjon
const originalPrice = 1990
const discountAmount = 199
const currentPrice = originalPrice - discountAmount
const discountPercent = 10

export function NewProductLaunchSection() {
  return (
    <section
      id='featured-product'
      className='relative mx-auto mt-16 max-w-[95%] overflow-hidden rounded-xl border border-neutral-800 py-16 md:max-w-7xl'
    >
      <AmbientBackgroundGlow />

      <div className='container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2'>
        <ImageColumn />

        <AnimatedBlock
          className='will-animate-fade-in-right flex flex-col items-start'
          delay='0.2s'
          threshold={0.3}
        >
          {/* Badges container */}
          <div className='mb-4 flex flex-wrap gap-2'>
            {/* Eksisterende "Nyhet" badge */}
            <AnimatedBlock
              className='will-animate-fade-in-up inline-flex items-center gap-3 rounded-full border border-sky-800/30 bg-sky-900/20 px-5 py-2'
              delay='0.3s'
              threshold={1}
            >
              <span className='relative flex h-2.5 w-2.5'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
                <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500'></span>
              </span>
              <span className='text-base font-semibold text-sky-400'>
                Nyhet
              </span>
            </AnimatedBlock>

            {/* NY: Lanseringstilbud badge */}
            <AnimatedBlock
              className='will-animate-fade-in-up inline-flex items-center gap-2.5 rounded-full border border-emerald-800/30 bg-emerald-900/20 px-4 py-2'
              delay='0.35s'
              threshold={1}
            >
              <span className='text-sm font-semibold text-emerald-400'>
                Lanseringstilbud
              </span>
              <span> 🎉</span>
              <span className='text-sm font-bold text-emerald-400'>
                Spar 199 kr!
              </span>
            </AnimatedBlock>
          </div>

          <AnimatedBlock
            className='will-animate-fade-in-up'
            delay='0.4s'
            threshold={1}
          >
            <h2 className='mb-4 text-4xl font-bold leading-tight text-accent/80  sm:text-5xl'>
              Varmen du kan stole på
            </h2>
          </AnimatedBlock>
          <AnimatedBlock
            className='will-animate-fade-in-up'
            delay='0.5s'
            threshold={1}
          >
            <p className='mb-8 max-w-prose text-lg leading-relaxed text-access/80'>
              Vi introduserer {productName} – vår varmeste og mest allsidige
              modell. Perfekt for deg som stiller de høyeste kravene til komfort
              og funksjonalitet.
            </p>
          </AnimatedBlock>
          <div className='mb-8 w-full text-access/80 space-y-3'>
            {newProductFeatures.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                delay={0.6 + idx * 0.1}
              />
            ))}
          </div>

          {/* Oppdatert pris-seksjon med lanseringstilbud */}
          <AnimatedBlock
            className='will-animate-fade-in-up w-full'
            delay='0.9s'
            threshold={1}
          >
            <div className='flex w-full flex-col gap-6'>
              {/* Pris-visning */}
              <div className='flex flex-col gap-3'>
                {/* Nåværende pris med gradient */}
                <div className='flex flex-wrap items-baseline gap-3'>
                  <p className='bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-5xl font-bold text-transparent'>
                    {currentPrice},-
                  </p>
                  <span className='text-sm text-access/80'>inkl. mva</span>
                  <span className='rounded-full line-through bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/20'>
                    {originalPrice},-
                  </span>
                </div>

                {/* Tilbuds-beskrivelse */}
                <p className='text-sm text-access/80'>
                  Begrenset tilbud ved lansering
                </p>
              </div>

              {/* CTA-knapp */}
              <Button asChild size='lg' className='group w-full sm:w-auto'>
                <Link href={productUrl}>
                  Oppdag {productName}
                  <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
                </Link>
              </Button>
            </div>
          </AnimatedBlock>
        </AnimatedBlock>
      </div>
    </section>
  )
}
