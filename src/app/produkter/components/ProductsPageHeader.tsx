'use client'

import { Sparkles } from 'lucide-react'

export function ProductsPageHeader() {
  return (
    <header className='relative w-full overflow-hidden border-b border-white/5 bg-neutral-950 pt-24 pb-16 md:pt-32 md:pb-24'>
      {/* --- BAKGRUNNSEFFEKTER --- */}
      <div className='absolute inset-0 -z-10'>
        {/* 1. Teknisk Grid (gir struktur) */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />

        {/* 2. Hoved-glow (Spotlight) */}
        <div className='absolute left-1/2 top-0 h-[600px] w-full max-w-[1000px] -translate-x-1/2 opacity-30'>
          <div
            className='h-full w-full bg-gradient-to-b from-sky-500/20 via-sky-500/5 to-transparent blur-[100px]'
            style={{
              maskImage:
                'radial-gradient(ellipse at top, black 40%, transparent 70%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at top, black 40%, transparent 70%)'
            }}
          />
        </div>
      </div>

      <div className='container mx-auto px-4 text-center relative z-10'>
        {/* --- BADGE --- */}
        <div className='animate-fade-in-up mb-8 inline-flex items-center justify-center'>
          <div className='relative flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md transition-all hover:border-sky-500/40 hover:bg-sky-500/20'>
            <Sparkles className='h-3.5 w-3.5 text-sky-400' />
            <span className='text-xs font-bold uppercase tracking-widest text-sky-400'>
              Utekos® Collection
            </span>
          </div>
        </div>

        {/* --- OVERSKRIFT --- */}
        <h1 className='animate-fade-in-up mx-auto max-w-4xl text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl'>
          Kolleksjonen for <br />
          <span className='bg-gradient-to-r from-sky-400 via-white to-sky-400 bg-clip-text text-transparent opacity-90'>
            kompromissløs komfort.
          </span>
        </h1>

        {/* --- BESKRIVELSE --- */}
        <p className='animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl'>
          Vi har redefinert utekosen gjennom teknologi og funksjonalitet.
          Utforsk vår kolleksjon og finn den perfekte følgesvennen for din
          utekos.
        </p>
      </div>

      {/* --- BUNN-FADE (Sikrer sømløs overgang til neste seksjon) --- */}
      <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none' />
    </header>
  )
}
