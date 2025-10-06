import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin, Mountain, Sunrise } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'

export function BobilHeroSection() {
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
            <span className='inline-flex items-center gap-2 rounded-full border border-amber-950 bg-amber-900/10 px-3 py-1'>
              <MapPin className='h-3 w-3 text-amber-950' />
              <span className='font-medium text-amber-950'>Bobilliv</span>
            </span>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              Bobilliv uten{' '}
              <span className='bg-gradient-to-r from-amber-950 to-amber-900 bg-clip-text text-transparent'>
                kompromisser
              </span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
            <p className='mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground'>
              Fra den første morgenkaffen til de sene kveldene rundt bordet.
              Oppdag hvordan Utekos forvandler hver stopp til en destinasjon
              verdt å huske.
            </p>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4'
            delay='0.4s'
          >
            <Button asChild size='lg' className='group'>
              <Link href={'/produkter' as Route}>
                Se produktene
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='#bruksomrader'>Utforsk mulighetene</Link>
            </Button>
          </AnimatedBlock>

          {/* Feature highlights */}
          <AnimatedBlock
            className='will-animate-fade-in-up mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3'
            delay='0.5s'
          >
            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #0ea5e9 100%)'
                }}
              />
              <div className='relative'>
                <Sunrise className='mb-3 h-8 w-8 text-amber-600' />
                <p className='mb-1 font-semibold text-foreground'>
                  Morgenkaffe
                </p>
                <p className='text-sm text-muted-foreground'>
                  Start dagen i varme utenfor bobilen
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
                <Mountain className='mb-3 h-8 w-8 text-blue-950' />
                <p className='mb-1 font-semibold text-foreground'>Alle stopp</p>
                <p className='text-sm text-muted-foreground'>
                  Nyt utsikten i komfort, hvor som helst
                </p>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #22d3ee 100%)'
                }}
              />
              <div className='relative'>
                <MapPin className='mb-3 h-8 w-8 text-amber-200' />
                <p className='mb-1 font-semibold text-foreground'>
                  Lengre turer
                </p>
                <p className='text-sm text-muted-foreground'>
                  Reis tidligere på året og senere på høsten
                </p>
              </div>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
