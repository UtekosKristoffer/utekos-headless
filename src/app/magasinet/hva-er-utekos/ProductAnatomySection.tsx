'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sparkles, Maximize2, ChevronsDown, Flame } from 'lucide-react'

const productImage = '/fiberdun/techdawn-front.png'

const features = [
  {
    id: 'zipper',
    icon: Sparkles,
    title: 'Enkel påkledning',
    description:
      'Den unike V-halsen med toveis glidelås gjør det lekende lett å stige inn og ut av plagget, og gir full kontroll på luftingen.',
    side: 'left'
  },
  {
    id: 'control',
    icon: Maximize2,
    title: 'Total varmekontroll',
    description:
      'Snorstramming i livet og nederst lar deg på sekunder justere passformen fra en luftig parkas til en tett og varm kokong.',
    side: 'right'
  },
  {
    id: 'muffe',
    icon: Flame,
    title: 'Integrert varmemuffe',
    description:
      'En stor, gjennomgående lomme designet for å holde hendene varme og komfortable.',
    side: 'left'
  },
  {
    id: 'pocket',
    icon: ChevronsDown,
    title: 'Personlig varmelomme',
    description:
      '"Posen" nederst er perfekt for å varme kalde føtter etter at skoene er tatt av. Din private, lille fotvarmer.',
    side: 'right'
  }
]

export const ProductAnatomySection = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  return (
    <section className='relative bg-background py-24 sm:py-32'>
      {/* Header */}
      <div className='text-center mb-16 sm:mb-20'>
        <h2 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6'>
          Ikke en jakke. Ikke en sovepose.
          <br />
          <span className='bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent'>
            Noe helt nytt.
          </span>
        </h2>
        <p className='text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
          For å forstå en Utekos, må du glemme alt du kan om tradisjonelle
          plagg. Se på det som ett enkelt verktøy bygget på en kraftfull idé:
          kompromissløs fleksibilitet. Hver detalj er designet for å gi deg
          friheten og komforten til å nyte de gode øyeblikkene lenger – i alle
          situasjoner der komfort er førsteprioritet.
        </p>
      </div>

      {/* Product Showcase - Desktop */}
      <div className='hidden lg:block mb-20'>
        <div className='grid grid-cols-[1fr_auto_1fr] gap-8 items-start'>
          {/* Left Features */}
          <div className='space-y-8 pt-12'>
            {features
              .filter(f => f.side === 'left')
              .map((feature, index) => {
                const isActive = activeFeature === feature.id
                return (
                  <div
                    key={feature.id}
                    className='text-right'
                    style={{ marginTop: index === 0 ? '0' : '8rem' }}
                    onMouseEnter={() => setActiveFeature(feature.id)}
                    onMouseLeave={() => setActiveFeature(null)}
                  >
                    <div className='inline-block text-left max-w-xs'>
                      <div
                        className={`relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-xl border rounded-xl p-5 shadow-xl transition-all duration-300 cursor-pointer ${
                          isActive ?
                            'border-amber-500/50 shadow-2xl shadow-amber-500/20 scale-105'
                          : 'border-zinc-700/50 hover:border-zinc-600'
                        }`}
                      >
                        <div
                          className={`inline-flex items-center justify-center rounded-lg mb-3 p-2.5 transition-all duration-300 ${
                            isActive ?
                              'bg-gradient-to-br from-amber-500 to-orange-600 text-white'
                            : 'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          <feature.icon className='h-5 w-5' />
                        </div>
                        <h3 className='font-semibold text-zinc-100 mb-2 text-base'>
                          {feature.title}
                        </h3>
                        <p className='text-sm text-zinc-400 leading-relaxed'>
                          {feature.description}
                        </p>

                        {/* Connection dot */}
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 -right-3 w-2 h-2 rounded-full transition-all duration-300 ${
                            isActive ?
                              'bg-amber-500 ring-4 ring-amber-500/20'
                            : 'bg-zinc-600'
                          }`}
                        />

                        {/* Glow effect */}
                        {isActive && (
                          <div className='absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl -z-10 blur-xl' />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>

          {/* Center - Product */}
          <div className='relative flex-shrink-0'>
            <div className='relative bg-gradient-to-b from-zinc-50 to-zinc-100 rounded-2xl p-8 shadow-2xl'>
              <Image
                src={productImage}
                alt='Anatomi av Utekos Original'
                width={300}
                height={600}
                className='mx-auto'
                priority
              />
            </div>
          </div>

          {/* Right Features */}
          <div className='space-y-8 pt-12'>
            {features
              .filter(f => f.side === 'right')
              .map((feature, index) => {
                const isActive = activeFeature === feature.id
                return (
                  <div
                    key={feature.id}
                    style={{ marginTop: index === 0 ? '0' : '8rem' }}
                    onMouseEnter={() => setActiveFeature(feature.id)}
                    onMouseLeave={() => setActiveFeature(null)}
                  >
                    <div className='inline-block max-w-xs'>
                      <div
                        className={`relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-xl border rounded-xl p-5 shadow-xl transition-all duration-300 cursor-pointer ${
                          isActive ?
                            'border-amber-500/50 shadow-2xl shadow-amber-500/20 scale-105'
                          : 'border-zinc-700/50 hover:border-zinc-600'
                        }`}
                      >
                        <div
                          className={`inline-flex items-center justify-center rounded-lg mb-3 p-2.5 transition-all duration-300 ${
                            isActive ?
                              'bg-gradient-to-br from-amber-500 to-orange-600 text-white'
                            : 'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          <feature.icon className='h-5 w-5' />
                        </div>
                        <h3 className='font-semibold text-zinc-100 mb-2 text-base'>
                          {feature.title}
                        </h3>
                        <p className='text-sm text-zinc-400 leading-relaxed'>
                          {feature.description}
                        </p>

                        {/* Connection dot */}
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 -left-3 w-2 h-2 rounded-full transition-all duration-300 ${
                            isActive ?
                              'bg-amber-500 ring-4 ring-amber-500/20'
                            : 'bg-zinc-600'
                          }`}
                        />

                        {/* Glow effect */}
                        {isActive && (
                          <div className='absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl -z-10 blur-xl' />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='lg:hidden'>
        <div className='relative bg-gradient-to-b from-zinc-50 to-zinc-100 rounded-2xl p-8 shadow-2xl mb-8'>
          <Image
            src={productImage}
            alt='Anatomi av Utekos Original'
            width={280}
            height={560}
            className='mx-auto'
            priority
          />
        </div>

        <div className='space-y-4'>
          {features.map(feature => (
            <div
              key={feature.id}
              className='bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-5'
            >
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 rounded-lg bg-amber-500/10 p-3'>
                  <feature.icon className='h-5 w-5 text-amber-400' />
                </div>
                <div>
                  <h3 className='font-semibold text-zinc-100 mb-1'>
                    {feature.title}
                  </h3>
                  <p className='text-sm text-zinc-400 leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className='mt-24 space-y-16'>
        {/* Replaces Section */}
        <div className='text-center'>
          <h3 className='text-2xl sm:text-3xl font-bold tracking-tight mb-4'>
            Ett Plagg. Uendelige muligheter.
          </h3>
          <p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Utekos er designet for å erstatte en hel haug med utstyr. Mindre
            styr, mindre å pakke – mer tid til kos.
          </p>
          <div className='flex flex-wrap justify-center gap-3'>
            {[
              'Dunjakke',
              'Teppe',
              'Varmekåpe',
              'Fleecegenser',
              'Tribunestol'
            ].map(item => (
              <span
                key={item}
                className='px-5 py-2.5 bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20 text-amber-400 rounded-full font-medium text-sm hover:border-amber-500/40 transition-colors'
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Reward Section */}
        <div className='max-w-2xl mx-auto'>
          <div className='relative group'>
            <div className='absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500' />

            <div className='relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm rounded-xl p-8 border border-amber-500/20 shadow-xl'>
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 p-3'>
                  <Flame className='h-6 w-6 text-white' />
                </div>
                <div>
                  <h4 className='text-xl font-semibold text-zinc-100 mb-2'>
                    Belønningen etter turen
                  </h4>
                  <p className='text-zinc-400 leading-relaxed'>
                    En Utekos er for varm for aktivitet med høy puls. Den er
                    ikke for å bestige fjellet – den er for øyeblikket du kommer
                    frem. Det er plagget du bytter til for å få varmen tilbake,
                    restituere, og nyte belønningen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductAnatomySection
