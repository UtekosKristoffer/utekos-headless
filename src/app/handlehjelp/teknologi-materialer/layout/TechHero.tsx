// Path: src/app/handlehjelp/teknologi-materialer/layout/TechHero.tsx
'use client'

import { ArrowDown } from 'lucide-react'

export function TechHero() {
  return (
    <section className='relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden border-b border-white/5 mb-24 text-center'>
      {/* Bakgrunnseffekter */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-900/20 blur-[120px]' />
        <div className='absolute bottom-0 right-0 h-[400px] w-[400px] translate-y-1/3 rounded-full bg-cyan-900/10 blur-[100px]' />
      </div>

      <div className='relative z-10 container mx-auto px-4'>
        <div className='mx-auto max-w-4xl space-y-8'>
          <div className='inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-sky-400 backdrop-blur-md'>
            Engineered for Comfort
          </div>

          <h1 className='text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl'>
            Ett plagg. <br />
            <span className='bg-gradient-to-r from-sky-400 via-white to-sky-400 bg-clip-text text-transparent opacity-90'>
              Tre opplevelser.
            </span>
          </h1>

          <p className='mx-auto max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl'>
            Det unike med Utekos er friheten til å velge. Fra en isolerende
            kokong til en elegant parkas på sekunder. Vi kaller det{' '}
            <strong className='text-white'>adaptiv funksjonalitet</strong>.
          </p>
        </div>
      </div>

      <div className='absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-neutral-500'>
        <ArrowDown className='h-6 w-6' />
      </div>
    </section>
  )
}
