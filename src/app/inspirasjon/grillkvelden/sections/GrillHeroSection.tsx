import { Button } from '@/components/ui/button'
import { ArrowRight, Flame, Users, Clock } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'

export function GrillHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden'>
      {/* Ambient background glow with CSS animation */}
      <div className='absolute inset-0 -z-10 opacity-25'>
        <div
          className='animate-pulse-glow absolute left-1/3 top-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #f97316 0%, transparent 70%)'
          }}
        />
        <div
          className='animate-pulse-glow absolute right-1/3 bottom-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)',
            animationDuration: '10s',
            animationDelay: '2s'
          }}
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='max-w-3xl'>
          <AnimatedBlock
            className='will-animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-900/10 px-4 py-2'
            delay='0.1s'
          >
            <Flame className='h-4 w-4 text-orange-400' />
            <span className='font-medium text-orange-400'>Grillkvelden</span>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              Grillkvelden som{' '}
              <span className='bg-gradient-to-r from-orange-400 to-orange-900/50 bg-clip-text text-transparent'>
                aldri tar slutt
              </span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
            <p className='mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground'>
              Bli verten for de uforglemmelige kveldene, der de gode samtalene
              og latteren fortsetter lenge etter at den siste pølsen er grillet.
            </p>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-8 flex flex-wrap gap-4'
            delay='0.4s'
          >
            <Button asChild size='lg' className='group'>
              <Link href={'/produkter' as Route}>
                Bli klar for kvelden
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='#bruksomrader'>Se øyeblikkene</Link>
            </Button>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3'
            delay='0.5s'
          >
            {/* Kortene er uendret og trenger ikke egne animasjonsblokker */}
            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #f97316 100%)'
                }}
              />
              <div className='relative'>
                <Flame className='mb-3 h-8 w-8 text-orange-400' />
                <p className='mb-1 font-semibold text-foreground'>
                  Ved grillen
                </p>
                <p className='text-sm text-muted-foreground'>
                  Hold varmen mens du steker
                </p>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #ef4444 100%)'
                }}
              />
              <div className='relative'>
                <Clock className='mb-3 h-8 w-8 text-red-400' />
                <p className='mb-1 font-semibold text-foreground'>
                  Hele kvelden
                </p>
                <p className='text-sm text-muted-foreground'>
                  La samtalen flyte til langt på natt
                </p>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='pointer-events-none absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #fb923c 100%)'
                }}
              />
              <div className='relative'>
                <Users className='mb-3 h-8 w-8 text-amber-400' />
                <p className='mb-1 font-semibold text-foreground'>
                  For gjestene
                </p>
                <p className='text-sm text-muted-foreground'>
                  Alle sitter komfortabelt utendørs
                </p>
              </div>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
