// Path: src/app/produkter/(oversikt)/components/ComfyrobeFeatureSection.tsx

import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { ComfyrobeImageCarousel } from '@/app/produkter/(oversikt)/components/ComfyrobeImageCarousel'
import { Button } from '@/components/ui/button'
import { Wind } from 'lucide-react'
import { comfyrobeFeatures } from '@/app/produkter/(oversikt)/utils/comfyrobeFeatures'
export function ComfyrobeFeatureSection() {
  return (
    <section className='py-16 sm:py-24 md:mb-24 rounded-lg'>
      <div className='container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16'>
        <ComfyrobeImageCarousel />

        <AnimatedBlock className='will-animate-fade-in-right'>
          <div className='flex flex-col items-start'>
            <AnimatedBlock className='will-animate-fade-in-up'>
              <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl'>
                Forleng utekosen.
                <br />
                <span className='text-sky-800'>Uansett Vær.</span>
              </h2>
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
              <p className='mt-4 max-w-2xl text-lg leading-relaxed text-access/80'>
                Comfyrobe™ er den ultimate allværskåpen for livsnyteren. Den
                kombinerer den urokkelige beskyttelsen til en teknisk skalljakke
                med den komfortable omfavnelsen av din mykeste badekåpe.
              </p>
            </AnimatedBlock>

            <div className='mt-10 w-full text-access/80 space-y-6'>
              {comfyrobeFeatures.map((feature, index) => (
                <AnimatedBlock
                  key={feature.title}
                  className='will-animate-fade-in-up'
                  delay={`${0.2 + index * 0.1}s`}
                >
                  <div className='flex items-start gap-4'>
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border ${feature.colorClasses}`}
                    >
                      <feature.icon className='h-6 w-6' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-foreground'>
                        {feature.title}
                      </h3>
                      <p className='mt-1 text-sm text-access/80'>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </AnimatedBlock>
              ))}
            </div>

            <AnimatedBlock className='will-animate-fade-in-up' delay='0.5s'>
              <div className='mt-12 flex w-full flex-col items-center gap-4 sm:flex-row'>
                <p className='text-4xl font-bold text-foreground'>NOK 990,-</p>
                <Button asChild size='lg' className='group w-full sm:w-auto'>
                  <Link href='/produkter/comfyrobe'>
                    Utforsk Comfyrobe™
                    <Wind className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
                  </Link>
                </Button>
              </div>
            </AnimatedBlock>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  )
}
