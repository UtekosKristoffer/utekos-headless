import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'
import { MikrofiberBackgroundGlow } from './MikrofiberBackgroundGlow'
import { FeatureCard } from './FeatureCard'
import { MikrofiberImageColumn } from './MikrofiberImageColumn'
import { mikrofiberFeatures } from './mikrofiberFeatures'
import { AnimatedBlock } from '@/components/AnimatedBlock'

const productName = 'Utekos Mikrofiber™'
const productUrl = '/produkter/utekos-mikrofiber'

export function FeaturedProductSection() {
  return (
    <section
      id='featured-product-mikrofiber'
      className='relative mx-auto mt-16 max-w-[95%] overflow-hidden rounded-xl border border-neutral-800 py-16 md:max-w-7xl'
    >
      <MikrofiberBackgroundGlow />

      <div className='container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2'>
        <MikrofiberImageColumn />

        <AnimatedBlock
          className='will-animate-fade-in-right flex flex-col items-start'
          delay='0.2s'
          threshold={0.3}
        >
          <AnimatedBlock
            className='will-animate-fade-in-up mb-3 inline-flex items-center gap-2 rounded-full border border-amber-800/30 bg-amber-900/10 px-4 py-1.5'
            delay='0.3s'
            threshold={1}
          >
            <Star className='h-3 w-3 text-amber-500' />
            <span className='text-sm font-semibold text-amber-800'>
              Kundefavoritt
            </span>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up'
            delay='0.4s'
            threshold={1}
          >
            <h2 className='mb-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl'>
              Plagget for all slags utekos
            </h2>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up'
            delay='0.5s'
            threshold={1}
          >
            <p className='mb-8 max-w-prose text-lg leading-relaxed text-muted-foreground'>
              Enten du trenger pålitelig varme på hytteterrassen, i båten eller
              utenfor bobilen, er {productName} din lette, robuste og 100%
              dunfrie partner. Skapt for å prestere optimalt i fuktig, nordisk
              vær.
            </p>
          </AnimatedBlock>

          <div className='mb-8 w-full space-y-3'>
            {mikrofiberFeatures.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                delay={0.6 + idx * 0.1}
              />
            ))}
          </div>

          <AnimatedBlock
            className='will-animate-fade-in-up'
            delay='0.9s'
            threshold={1}
          >
            <div className='flex w-full flex-col gap-4 sm:flex-row sm:items-center'>
              <div className='flex items-baseline gap-2'>
                <p className='text-4xl font-bold text-foreground'>1290,-</p>
                <span className='text-sm text-muted-foreground'>inkl. mva</span>
              </div>
              <Button asChild size='lg' className='group w-full sm:w-auto'>
                <Link href={productUrl}>
                  Utforsk {productName}
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
