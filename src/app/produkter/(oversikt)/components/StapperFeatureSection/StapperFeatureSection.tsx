import StapperImage from '@public/stapper-hvit.png'
import Image from 'next/image'
import Link from 'next/link'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { PackageCheck } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { IconRenderer } from './IconRenderer'
import { stapperFeatures } from './stapperFeatures'

export function StapperFeatureSection() {
  const imagePanel = (
    <Card className='relative isolate min-h-[22rem] overflow-hidden rounded-[1.5rem] border-cloud-dancer/12 bg-cloud-dancer/[0.035] py-0 shadow-none backdrop-blur-[2px] sm:min-h-[26rem] lg:min-h-[33rem]'>
      <CardContent className='relative flex size-full min-h-[inherit] items-center justify-center p-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,color-mix(in_oklab,var(--ancient-water)_18%,transparent),transparent_44%)]' />
        <div className='absolute inset-x-10 bottom-8 h-24 rounded-full bg-background/55 blur-3xl' />
        <div className='absolute right-8 top-8 hidden rounded-full border border-cloud-dancer/12 px-4 py-2 text-xs font-medium text-overcast/78 uppercase sm:block'>
          100 g
        </div>
        <Image
          src={StapperImage}
          alt='Utekos Stapper kompresjonsbag'
          fill
          className='object-contain p-8 drop-shadow-[0_30px_56px_rgba(8,10,24,0.42)] transition-transform duration-700 hover:scale-[1.03] sm:p-10 lg:p-12'
          sizes='(max-width: 640px) 88vw, (max-width: 1024px) 42rem, 38rem'
        />
      </CardContent>
    </Card>
  )

  return (
    <section className='relative mb-8 overflow-hidden rounded-[1.75rem] border border-cloud-dancer/12 bg-[radial-gradient(circle_at_14%_18%,color-mix(in_oklab,var(--ancient-water)_14%,transparent),transparent_30%),linear-gradient(135deg,var(--havdyp)_0%,var(--background)_48%,var(--havdyp)_100%)] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 xl:px-12'>
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10'
        style={{
          background:
            'radial-gradient(circle at 78% 34%, color-mix(in oklab, var(--very-peri) 16%, transparent), transparent 42%)'
        }}
      />

      <div className='pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-cloud-dancer/30 to-transparent' />

      <div className='mx-auto max-w-[78rem]'>
        <div className='grid gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(28rem,1.14fr)] lg:items-center xl:gap-12'>
          <div className='mx-auto max-w-[36rem] text-center lg:mx-0 lg:text-left'>
            <AnimatedBlock className='will-animate-fade-in-up'>
              <Badge
                variant='outline'
                className='mb-5 border-ancient-water/24 bg-ancient-water/10 px-3.5 py-1.5 text-ancient-water'
              >
                Utekos Stapper™
              </Badge>
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up'>
              <h2 className='text-4xl font-bold max-sm:text-left leading-[0.96] text-foreground sm:text-5xl lg:text-[4.35rem]'>
                Mer plass. Mindre stress.
              </h2>
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
              <p className='mx-auto max-sm:text-left mt-6 max-w-xl text-lg leading-text-paragraph text-foreground lg:mx-0'>
                Forvandle voluminøse jakker og soveposer til kompakte pakker. Utekos Stapper™ er den smarte
                løsningen for deg som verdsetter en effektiv og organisert bagasje på hytta, i bobilen eller i
                tursekken.
              </p>
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up mt-8'>
              <BrandBadge
                asChild
                backgroundColor='var(--primary)'
                textColor='var(--background)'
                className='group min-h-14 justify-center border border-primary/18 px-7 text-base shadow-[0_16px_36px_-24px_rgba(232,178,66,0.55)] transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-105 lg:justify-start'
              >
                <Link href='/produkter/utekos-stapper' data-track='StapperFeatureSectionDiscoverClick'>
                  Oppdag Stapper™
                  <PackageCheck className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12' />
                </Link>
              </BrandBadge>
            </AnimatedBlock>
          </div>

          <AnimatedBlock className='will-animate-fade-in-scale' delay='0.2s' threshold={0.35}>
            {imagePanel}
          </AnimatedBlock>
        </div>

        <div className='mt-8 grid grid-cols-1 border-t border-cloud-dancer/10 text-left sm:grid-cols-2 lg:mt-10 lg:grid-cols-4'>
          {stapperFeatures.map((feature, index) => (
            <AnimatedBlock
              key={feature.title}
              className='will-animate-fade-in-up group relative flex gap-4 border-b border-cloud-dancer/10 py-6 sm:odd:pr-6 sm:even:border-l sm:even:border-cloud-dancer/10 sm:even:pl-6 lg:border-b-0 lg:border-l lg:border-cloud-dancer/10 lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0'
              delay={`${index * 0.08}s`}
            >
              <div
                className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:-translate-y-0.5 ${feature.colorClasses}`}
              >
                <IconRenderer name={feature.icon} className='h-4.5 w-4.5' />
              </div>
              <div>
                <h3 className='text-base font-semibold leading-tight text-foreground'>{feature.title}</h3>
                <p className='mt-2 text-sm leading-relaxed text-foreground/90'>{feature.description}</p>
              </div>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
