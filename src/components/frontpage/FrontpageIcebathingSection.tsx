// Path: src/components/frontpage/FrontpageIcebathingSection.tsx

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Droplets, Thermometer, Wind } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'

export function FrontpageIceBathingSection() {
  return (
    <section className='py-24 overflow-hidden'>
      <div className='container mx-auto px-4'>
        <div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-24'>
          <div className='flex flex-col justify-center order-2 lg:order-1'>
            <AnimatedBlock>
              <div className='inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-500 mb-6'>
                <span className='relative flex h-2 w-2 mr-2'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-2 w-2 bg-amber-500'></span>
                </span>
                Siste sjanse!
              </div>

              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6'>
                Fra kuldesjokk til{' '}
                <span className='text-cyan-400'>umiddelbar varme</span>
              </h2>
            </AnimatedBlock>

            <AnimatedBlock delay='0.1s'>
              <p className='text-lg text-muted-foreground mb-8 leading-relaxed'>
                Mestringsfølelsen etter et isbad er magisk, men minuttene
                etterpå kan være brutale. Comfyrobe™ er designet spesifikt for
                dette øyeblikket. Det er ikke bare en jakke, det er ditt mobile
                skifterom og varmestue i ett.
              </p>
            </AnimatedBlock>
            <AnimatedBlock
              delay='0.2s'
              className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10'
            >
              <div className='flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800'>
                <Thermometer className='h-6 w-6 text-orange-400 shrink-0' />
                <div>
                  <h3 className='font-medium text-sm'>SherpaCore™ Varme</h3>
                  <p className='text-xs text-muted-foreground'>
                    250 GSM fôr som gir umiddelbar isolering.
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800'>
                <Droplets className='h-6 w-6 text-cyan-400 shrink-0' />
                <div>
                  <h3 className='font-medium text-sm'>Tørker deg opp</h3>
                  <p className='text-xs text-muted-foreground'>
                    Fôret absorberer restfuktighet effektivt.
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800'>
                <Wind className='h-6 w-6 text-blue-400 shrink-0' />
                <div>
                  <h3 className='font-medium text-sm'>Stopp vinden</h3>
                  <p className='text-xs text-muted-foreground'>
                    HydroGuard™ skall med 8000mm vannsøyle.
                  </p>
                </div>
              </div>
            </AnimatedBlock>

            <AnimatedBlock delay='0.3s' className='flex flex-wrap gap-4'>
              <Button
                asChild
                size='lg'
                className='bg-cyan-600 hover:bg-cyan-700 group'
              >
                <Link href={'/produkter/comfyrobe' as Route}>
                  Sikre deg din nå
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
              <Button variant='outline' size='lg' asChild>
                <Link href={'/inspirasjon/isbading' as Route}>
                  Få isbading-inspo
                </Link>
              </Button>
            </AnimatedBlock>

            <AnimatedBlock delay='0.4s'>
              <p className='text-sm text-muted-foreground mt-4 italic'>
                OBS: Begrenset antall igjen på lager.
              </p>
            </AnimatedBlock>
          </div>
          <AnimatedBlock
            delay='0.2s'
            className='relative h-[500px] lg:h-[700px] w-full rounded-2xl overflow-hidden order-1 lg:order-2 border border-neutral-800 group'
          >
            <Image
              src='/comfyrobe/comfy-isbading-to-1080.png'
              alt='En isbader står ved en iskant og ser utover vannet, pakket inn i en varm Comfyrobe etter badet.'
              fill
              className='object-cover transition-transform duration-700 group-hover:scale-105'
              sizes='(max-width: 1024px) 100vw, 50vw'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none' />
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
