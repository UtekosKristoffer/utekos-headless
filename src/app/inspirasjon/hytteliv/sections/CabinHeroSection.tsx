import { Button } from '@/components/ui/button'
import { ArrowRight, Coffee, Mountain, Star } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'
export function CabinHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden'>
      <div className='absolute inset-0 -z-10 opacity-25'>
        <div
          className='animate-pulse-glow absolute left-1/3 top-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
            animationDuration: '9s'
          }}
        />
        <div
          className='animate-pulse-glow absolute right-1/3 bottom-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
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
            <span className='inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-900/10 px-3 py-1'>
              <Mountain className='h-3 w-3 text-emerald-400' />
              <span className='font-medium text-emerald-400'>Hytteliv</span>
            </span>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              Hyttekos -{' '}
              <span className='bg-gradient-to-r from-slate-500 to-slate-400 bg-clip-text text-transparent'>
                perfeksjonert
              </span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
            <p className='mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground'>
              Fra den krystallklare morgenluften på terrassen, til de magiske
              kveldene under stjernene. Gjør hytten til et fristed for komfort,
              uansett årstid.
            </p>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4'
            delay='0.4s'
          >
            <Button asChild size='lg' className='group'>
              <Link href={'/produkter' as Route}>
                Finn din Utekos
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
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #10b981 100%)'
                }}
              />
              <div className='relative'>
                <Coffee className='mb-3 h-8 w-8 text-blue-500' />
                <p className='mb-1 font-semibold text-foreground'>
                  Morgenstund
                </p>
                <p className='text-sm text-muted-foreground'>
                  Nyt morgenkaffeen ute i frisk fjellluft
                </p>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #0ea5e9 100%)'
                }}
              />
              <div className='relative'>
                <Mountain className='mb-3 h-8 w-8 text-green-600' />
                <p className='mb-1 font-semibold text-foreground'>Utsikten</p>
                <p className='text-sm text-muted-foreground'>
                  Nyt panoramaet i komfort, hele dagen
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
                <Star className='mb-3 h-8 w-8 text-yellow-400' />
                <p className='mb-1 font-semibold text-foreground'>
                  Stjerneklar kveld
                </p>
                <p className='text-sm text-muted-foreground'>
                  Forleng kveldene under natthimmelen
                </p>
              </div>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
