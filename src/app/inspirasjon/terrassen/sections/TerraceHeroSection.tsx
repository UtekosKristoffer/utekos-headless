import { ArrowRight, Coffee, Leaf, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'

export function TerraceHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-25'>
        <div
          className='absolute left-1/3 top-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/3 bottom-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='max-w-3xl'>
          <AnimatedBlock
            className='will-animate-fade-in-up mb-4 inline-flex items-center gap-2 rounded-full border border-button/30 bg-button/10 px-4 py-2'
            delay='0.1s'
          >
            <Sparkles className='h-4 w-4 text-button' />
            <span className='text-sm font-medium text-button'>
              For terrassen
            </span>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              Din terrasse,{' '}
              <span className='bg-gradient-to-r from-button to-sky-800 bg-clip-text text-transparent'>
                hele året
              </span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
            <p className='mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground'>
              Gjør uteplassen til husets beste rom. Fra den første kaffen i
              vårsolen til de sene sommerkveldene – nyt øyeblikkene lenger.
            </p>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4'
            delay='0.4s'
          >
            <Button asChild size='lg' className='group'>
              <Link href={'/produkter' as Route}>
                Oppdag din Utekos
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='#bruksomrader'>Se bruksområdene</Link>
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
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #22c55e 100%)'
                }}
              />
              <div className='relative'>
                <Coffee className='mb-3 h-8 w-8 text-rose-500' />
                <p className='mb-1 font-semibold text-foreground'>Tidlig vår</p>
                <p className='text-sm text-muted-foreground'>
                  Nyt morgenkafffen uker tidligere
                </p>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #f59e0b 100%)'
                }}
              />
              <div className='relative'>
                <Leaf className='mb-3 h-8 w-8 text-amber-400' />
                <p className='mb-1 font-semibold text-foreground'>Sen høst</p>
                <p className='text-sm text-muted-foreground'>
                  Forleng sesongen utover september
                </p>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #06b6d4 100%)'
                }}
              />
              <div className='relative'>
                <Sparkles className='mb-3 h-8 w-8 text-button' />
                <p className='mb-1 font-semibold text-foreground'>Hver kveld</p>
                <p className='text-sm text-muted-foreground'>
                  Nyt uteplassen når det kjølner
                </p>
              </div>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
