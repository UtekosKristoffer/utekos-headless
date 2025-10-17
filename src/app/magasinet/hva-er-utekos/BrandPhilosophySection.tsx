'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatedBlockTwo } from './AnimatedBlockTwo'
import { Sparkles, Feather, Leaf, Shield, ArrowRight } from 'lucide-react'

const values = [
  {
    id: 'hygge',
    icon: Sparkles,
    title: 'Designet for hygge',
    description:
      'Skapt med dyp forståelse for den norske livsstilen og behovet for å forlenge de gode øyeblikkene utendørs.',
    color: 'from-blue-500 to-sky-900'
  },
  {
    id: 'comfort',
    icon: Feather,
    title: 'Kompromissløs komfort',
    description:
      'Kvalitet er en følelse. Materialer som er myke, funksjonelle og behagelige, slik at du kan slappe helt av.',
    color: 'from-slate-400 to-slate-600'
  },
  {
    id: 'conscious',
    icon: Leaf,
    title: 'Et bevisst valg',
    description:
      'Tidløs design og solid håndverk som tåler å bli brukt – igjen og igjen. Et mer ansvarlig valg for naturen.',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'promise',
    icon: Shield,
    title: 'Vårt løfte til deg',
    description:
      'Ikke bare et produkt, men en følelse. Umiddelbar varme og velvære som lar deg nyte øyeblikket lenger.',
    color: 'from-indigo-500 to-purple-600'
  }
]

export const BrandPhilosophySection = () => {
  const [hoveredValue, setHoveredValue] = useState<string | null>(null)

  return (
    <>
      <style>{`
        .fade-in-up { 
          opacity: 0; 
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
                      transform 0.8s cubic-bezier(0.16,1,0.3,1);
          transition-delay: var(--transition-delay, 0s); 
        }
        .fade-in-up.is-in-view { 
          opacity: 1; 
          transform: translateY(0); 
        }
      `}</style>

      <section className='relative bg-gradient-to-br from-zinc-900/60 to-zinc-800/40 py-20 sm:py-28 rounded-3xl overflow-hidden'>
        {/* Background decoration */}
        <div className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl rounded-full' />
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/5 to-transparent blur-3xl rounded-full' />

        <div className='relative container mx-auto max-w-4xl px-6'>
          {/* Header */}
          <AnimatedBlockTwo
            className='fade-in-up text-center mb-16'
            delay='0ms'
          >
            <div className='inline-flex items-center gap-3 mb-4'>
              <span className='h-px w-8 bg-gradient-to-r from-transparent to-zinc-500' />
              <span className='text-xs font-medium uppercase tracking-[0.2em] text-zinc-400'>
                Vår filosofi
              </span>
              <span className='h-px w-8 bg-gradient-to-l from-transparent to-zinc-500' />
            </div>

            <h2 className='text-3xl font-bold text-zinc-100 sm:text-4xl lg:text-5xl mb-6 tracking-tight'>
              Mer enn et produkt.
              <br />
              <span className='text-slate-300'>En livsstil.</span>
            </h2>

            <p className='mx-auto max-w-2xl text-lg text-zinc-400 leading-relaxed'>
              Utekos handler om å verdsette de rolige øyeblikkene. Vi skaper
              produkter designet for å gjøre disse stundene enda bedre.
            </p>
          </AnimatedBlockTwo>

          {/* Values Grid */}
          <div className='grid gap-6 sm:grid-cols-2 mb-16'>
            {values.map((value, index) => {
              const Icon = value.icon
              const isHovered = hoveredValue === value.id
              const delay = `${150 + index * 150}ms`

              return (
                <AnimatedBlockTwo
                  key={value.id}
                  className='fade-in-up'
                  delay={delay}
                >
                  <div
                    className='group relative h-full'
                    onMouseEnter={() => setHoveredValue(value.id)}
                    onMouseLeave={() => setHoveredValue(null)}
                  >
                    {/* Glow effect */}
                    <div
                      className={`absolute -inset-1 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl`}
                    />

                    <div
                      className={`relative h-full rounded-2xl border transition-all duration-300 p-8 ${
                        isHovered ?
                          'bg-zinc-800/90 border-zinc-600/50 shadow-xl'
                        : 'bg-zinc-900/50 border-zinc-700/50 hover:border-zinc-600/50'
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 ${
                          isHovered ?
                            `bg-gradient-to-br ${value.color} shadow-lg`
                          : 'bg-zinc-800 border border-zinc-700/50'
                        }`}
                      >
                        <Icon
                          className={`h-6 w-6 transition-colors duration-300 ${
                            isHovered ? 'text-white' : 'text-zinc-400'
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <h3
                        className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                          isHovered ? 'text-zinc-100' : 'text-zinc-200'
                        }`}
                      >
                        {value.title}
                      </h3>

                      <p className='text-zinc-400 leading-relaxed'>
                        {value.description}
                      </p>

                      {/* Decorative accent */}
                      <div
                        className={`absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r ${value.color} transition-opacity duration-300 ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </div>
                  </div>
                </AnimatedBlockTwo>
              )
            })}
          </div>

          {/* CTA */}
          <AnimatedBlockTwo className='fade-in-up' delay='750ms'>
            <div className='relative group/cta'>
              {/* Glow effect */}
              <div className='absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover/cta:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl' />

              <div className='relative rounded-2xl border border-zinc-700/50 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-sm p-10 sm:p-12 text-center overflow-hidden'>
                {/* Decorative elements */}
                <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/5 to-transparent blur-2xl rounded-full' />
                <div className='absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/5 to-transparent blur-2xl rounded-full' />

                <div className='relative'>
                  <h3 className='text-2xl sm:text-3xl font-bold text-zinc-100 mb-4'>
                    Se på det som en varig investering
                    <br />
                    <span className='text-slate-300'>i din egen hygge</span>
                  </h3>

                  <p className='mx-auto max-w-xl text-lg text-zinc-400 leading-relaxed mb-8'>
                    Er du klar for å forlenge dine beste øyeblikk utendørs?
                    Utforsk kolleksjonen og finn den Utekos som passer perfekt
                    for deg.
                  </p>

                  <Link
                    href='/produkter'
                    className='group/button inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105'
                  >
                    Se hele kolleksjonen
                    <ArrowRight className='h-5 w-5 transition-transform group-hover/button:translate-x-1' />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedBlockTwo>
        </div>
      </section>
    </>
  )
}

export default BrandPhilosophySection
