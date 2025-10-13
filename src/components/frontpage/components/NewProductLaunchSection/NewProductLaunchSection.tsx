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
          <AnimatedBlock
            className='will-animate-fade-in-up mb-4 inline-flex items-center gap-3 rounded-full border border-sky-800/30 bg-sky-900/20 px-5 py-2'
            delay='0.3s'
            threshold={1}
          >
            <span className='relative flex h-2.5 w-2.5'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
              <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500'></span>
            </span>
            <span className='text-base font-semibold text-sky-400'>Nyhet</span>
          </AnimatedBlock>
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
              Vi introduserer {productName} – et robust og bekymringsfritt plagg
              skapt for deg som nekter å la kjølige kvelder eller en regnskur
              avbryte kvalitetstiden utendørs.
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

          <AnimatedBlock
            className='will-animate-fade-in-up'
            delay='0.9s'
            threshold={1}
          >
            <div className='flex w-full flex-col gap-4 sm:flex-row sm:items-center'>
              <div className='flex items-baseline gap-2'>
                <p className='text-4xl font-bold text-foreground'>1790,-</p>
                <span className='text-sm text-muted-foreground'>inkl. mva</span>
              </div>
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
