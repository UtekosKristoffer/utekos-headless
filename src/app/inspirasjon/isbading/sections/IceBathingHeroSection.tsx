// Path: src/app/inspirasjon/isbading/sections/IceBathingHeroSection.tsx

import { Button } from '@/components/ui/button'
import { ArrowRight, Snowflake, Thermometer, Waves } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'

export function IceBathingHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden'>
      {/* Ambient background glow - Icy Colors */}
      <div className='absolute inset-0 -z-10 opacity-25'>
        <div
          className='animate-pulse-glow absolute left-1/3 top-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', // Cyan
            animationDuration: '9s'
          }}
        />
        <div
          className='animate-pulse-glow absolute right-1/3 bottom-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)', // Sky Blue
            animationDuration: '11s',
            animationDelay: '3s'
          }}
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='max-w-3xl'>
          <AnimatedBlock
            className='will-animate-fade-in-up mb-6 flex items-center gap-3 text-sm text-muted-foreground'
            delay='0.1s'
          >
            <Link
              href={'/inspirasjon' as Route}
              className='transition-colors hover:text-foreground'
            >
              Inspirasjon
            </Link>
            <span>/</span>
            <span className='inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-900/10 px-3 py-1'>
              <Snowflake className='h-3 w-3 text-cyan-400' />
              <span className='font-medium text-cyan-400'>Isbading</span>
            </span>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              Det kalde gys -{' '}
              <span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
                den varme belønningen
              </span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
            <p className='mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground'>
              Mestringsfølelsen etter et isbad er unik. Men turen tilbake til
              bilen trenger ikke være en kamp. Gjør overgangen fra null grader
              til full komfort umiddelbar.
            </p>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4'
            delay='0.4s'
          >
            <Button
              asChild
              size='lg'
              className='group bg-cyan-600 hover:bg-cyan-700'
            >
              <Link href={'/produkter' as Route}>
                Kle deg for kulden
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='#fordeler'>Hvorfor Utekos?</Link>
            </Button>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3'
            delay='0.5s'
          >
            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #22d3ee 100%)'
                }}
              />
              <div className='relative'>
                <Waves className='mb-3 h-8 w-8 text-cyan-400' />
                <p className='mb-1 font-semibold text-foreground'>
                  Selve dykket
                </p>
                <p className='text-sm text-muted-foreground'>
                  Enkelt å skifte rett ved vannkanten
                </p>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #f97316 100%)'
                }}
              />
              <div className='relative'>
                <Thermometer className='mb-3 h-8 w-8 text-orange-500' />
                <p className='mb-1 font-semibold text-foreground'>Varmen</p>
                <p className='text-sm text-muted-foreground'>
                  Få varmen tilbake på rekordtid
                </p>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #38bdf8 100%)'
                }}
              />
              <div className='relative'>
                <Snowflake className='mb-3 h-8 w-8 text-blue-400' />
                <p className='mb-1 font-semibold text-foreground'>
                  Vindskjoldet
                </p>
                <p className='text-sm text-muted-foreground'>
                  Total beskyttelse mot sur vintervind
                </p>
              </div>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
