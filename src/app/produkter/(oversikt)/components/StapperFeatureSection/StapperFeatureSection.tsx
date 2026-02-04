import StapperImage from '@public/kompresjonsbag.webp'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PackageCheck } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { IconRenderer } from './IconRenderer'
import { stapperFeatures } from './stapperFeatures'

export function StapperFeatureSection() {
  return (
    <section className='relative overflow-hidden rounded-lg border border-neutral-800 bg-sidebar-foreground py-20 sm:py-32 md:mb-24'>
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10'
        style={{
          background:
            'radial-gradient(circle at 50% 30%, hsla(215, 40%, 20%, 0.3), transparent 70%)'
        }}
      />

      <div className='container mx-auto max-w-4xl px-4 text-center'>
        <AnimatedBlock className='will-animate-fade-in-up'>
          <h2 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
            Mer plass. Mindre stress.
          </h2>
        </AnimatedBlock>

        <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
          <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-access/80'>
            Forvandle voluminøse jakker og soveposer til kompakte pakker. Utekos
            Stapper™ er den smarte løsningen for deg som verdsetter en effektiv
            og organisert bagasje på hytta, i bobilen eller i tursekken.
          </p>
        </AnimatedBlock>

        <AnimatedBlock
          className='will-animate-fade-in-scale'
          delay='0.3s'
          threshold={0.5}
        >
          <div className='relative mx-auto mt-12 h-96 w-64'>
            <div className='absolute inset-0 rounded-full bg-primary/10 blur-3xl' />
            <Image
              src={StapperImage}
              alt='Utekos Stapper kompresjonsbag'
              fill
              className='object-contain'
              sizes='256px'
            />
          </div>
        </AnimatedBlock>

        <div className='mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-10 text-left md:grid-cols-2 lg:gap-y-16'>
          {stapperFeatures.map((feature, index) => (
            <AnimatedBlock
              key={feature.title}
              className='will-animate-fade-in-up relative flex items-start gap-4'
              delay={`${index * 0.1}s`}
            >
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border ${feature.colorClasses}`}
              >
                <IconRenderer name={feature.icon} className='h-6 w-6' />
              </div>
              <div>
                <h3 className='text-base font-semibold leading-7 text-foreground'>
                  {feature.title}
                </h3>
                <p className='mt-1 text-sm leading-6 text-muted-foreground'>
                  {feature.description}
                </p>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock className='will-animate-fade-in-up mt-16'>
          <Button asChild size='lg' className='group'>
            <Link
              href='/produkter/utekos-stapper'
              data-track='StapperFeatureSectionDiscoverClick'
            >
              Oppdag Stapper™
              <PackageCheck className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12' />
            </Link>
          </Button>
        </AnimatedBlock>
      </div>
    </section>
  )
}
