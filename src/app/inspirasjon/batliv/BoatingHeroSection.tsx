// BoatingHeroSection.tsx (Server Component - ingen 'use client' nødvendig!)
import { Button } from '@/components/ui/button'
import { ArrowRight, Anchor, Waves, Sun } from 'lucide-react'
import Link from 'next/link'

export function BoatingHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center overflow-hidden'>
      {/* Ambient background glow with subtle animation */}
      <div className='absolute inset-0 -z-10 opacity-25'>
        <div
          className='boat-hero-glow-1 absolute left-1/3 top-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
        <div
          className='boat-hero-glow-2 absolute right-1/3 bottom-1/4 h-[600px] w-[600px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />

      <div className='container relative mx-auto px-4 py-16'>
        <div className='boat-hero-content max-w-3xl'>
          <div className='boat-hero-breadcrumb mb-6 flex items-center gap-3 text-sm text-muted-foreground'>
            <Link
              href='/inspirasjon'
              className='transition-colors hover:text-foreground'
            >
              Inspirasjon
            </Link>
            <span>/</span>
            <span className='inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-900/10 px-3 py-1'>
              <Anchor className='h-3 w-3 text-sky-800' />
              <span className='font-medium text-sky-600'>Båtliv</span>
            </span>
          </div>

          <h1 className='boat-hero-title text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
            Båtliv uten{' '}
            <span className='bg-gradient-to-r from-sky-800 to-sky-600 bg-clip-text text-transparent'>
              å fryse
            </span>
          </h1>

          <p className='boat-hero-text mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground'>
            Fra den første kaffen i soloppgang til ankerdrammen under stjernene.
            Opplev en lengre og mer komfortabel båtsesong med varme som varer.
          </p>

          <div className='boat-hero-buttons mt-8 flex flex-wrap gap-4'>
            <Button asChild size='lg' className='group'>
              <Link href='/produkter'>
                Se produkter for båtfolket
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='#bruksomrader'>Utforsk mulighetene</Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className='boat-hero-features mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3'>
            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='boat-hero-feature-glow absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #0ea5e9 100%)'
                }}
              />
              <div className='relative'>
                <Sun className='h-8 w-8 text-amber-400 mb-3' />
                <p className='font-semibold text-foreground mb-1'>Soloppgang</p>
                <p className='text-sm text-muted-foreground'>
                  Nyt morgenkaffeen i cockpiten
                </p>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='boat-hero-feature-glow absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #06b6d4 100%)'
                }}
              />
              <div className='relative'>
                <Waves className='h-8 w-8 text-blue-800 mb-3' />
                <p className='font-semibold text-foreground mb-1'>
                  Hele kvelden
                </p>
                <p className='text-sm text-muted-foreground'>
                  Forleng tiden på dekk etter solnedgang
                </p>
              </div>
            </div>

            <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700'>
              <div
                className='boat-hero-feature-glow absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #22d3ee 100%)'
                }}
              />
              <div className='relative'>
                <Anchor className='h-8 w-8 text-teal-400 mb-3' />
                <p className='font-semibold text-foreground mb-1'>
                  Lengre sesong
                </p>
                <p className='text-sm text-muted-foreground'>
                  Nyt båten fra tidlig vår til sen høst
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
