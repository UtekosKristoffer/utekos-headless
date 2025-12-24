'use client'

import Link from 'next/link'
import { ArrowRight, Layers, Shield, Thermometer, Zap } from 'lucide-react'

export default function TechTeaserSection() {
  return (
    <section className='mt-12 w-full py-12'>
      <div className='container mx-auto max-w-7xl px-4'>
        {/* Selve boksen */}
        <div className='relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-8 md:p-12 lg:p-16'>
          {/* Bakgrunnseffekt (Subtil glød) inni boksen */}
          <div className='pointer-events-none absolute -left-[10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-sky-900/10 blur-[100px]' />

          <div className='relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16'>
            {/* --- VENSTRE KOLONNE: TEKST --- */}
            {/* Order-2 på mobil for å legge teksten under bildet hvis ønskelig, men her lar vi den ligge over (standard) */}
            <div className='space-y-8'>
              <div className='inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-400'>
                <Zap className='h-3 w-3' />
                Innovasjon og materialer
              </div>

              <div className='space-y-4'>
                <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl'>
                  Vitenskapen bak <br />
                  <span className='bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent'>
                    din komfort.
                  </span>
                </h2>
                <p className='max-w-xl text-lg leading-relaxed text-article-white/70'>
                  Det handler ikke bare om varme, men om hvordan varmen skapes.
                  Fra vår hydrofobiske <strong>TechDown™</strong> til det
                  robuste <strong>HydroGuard™</strong>-skallet. Oppdag
                  teknologien og funksjonaliteten som gjør at Utekos
                  revolusjonerer utendørsopplevelsen.
                </p>
              </div>

              {/* Feature Liste */}
              <ul className='space-y-4'>
                {[
                  {
                    icon: Thermometer,
                    title: 'Termisk effektivitet',
                    desc: 'Isolasjon som puster og varmer.'
                  },
                  {
                    icon: Shield,
                    title: 'HydroGuard™ beskyttelse',
                    desc: 'Vanntett membran med 8000mm søyle.'
                  },
                  {
                    icon: Layers,
                    title: '3-i-1 adaptivitet',
                    desc: 'Endre funksjon fra kokong til parkas.'
                  }
                ].map((item, idx) => (
                  <li key={idx} className='flex items-start gap-3'>
                    <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-sky-400'>
                      <item.icon className='h-3.5 w-3.5' />
                    </div>
                    <div>
                      <span className='block text-sm font-bold text-white'>
                        {item.title}
                      </span>
                      <span className='block text-sm text-neutral-500'>
                        {item.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className='pt-4'>
                <Link
                  href='/handlehjelp/teknologi-materialer'
                  className='group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-neutral-950 transition-all hover:bg-sky-50'
                >
                  Utforsk teknologien
                  <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </div>
            </div>

            {/* --- HØYRE KOLONNE: ABSTRAKT VISUALISERING --- */}
            {/* Fjernet 'hidden lg:block'. Lagt til fast høyde på mobil, aspect-square på desktop. */}
            <div className='relative mx-auto mt-0 h-[320px] w-full max-w-md lg:mt-0 lg:aspect-square lg:h-auto'>
              {/* Dette lager en "Lag-på-lag" effekt visuelt */}
              <div className='relative h-full w-full'>
                {/* Bakre kort (Dekor) - Justert posisjon for mobil */}
                <div className='absolute right-[5%] top-[5%] h-3/4 w-3/4 rounded-3xl border border-neutral-800 bg-neutral-900/50 opacity-40 backdrop-blur-sm transition-transform duration-500 hover:translate-x-2 hover:-translate-y-2 lg:right-0 lg:top-0' />

                {/* Midtre kort (Teknisk grid) - Justert posisjon for mobil */}
                <div className='absolute bottom-[15%] right-[15%] top-[15%] w-3/4 rounded-3xl border border-neutral-700 bg-neutral-900/80 p-6 backdrop-blur-md transition-transform duration-500 hover:translate-x-2 hover:-translate-y-2 lg:bottom-8 lg:right-8 lg:top-8'>
                  <div className='grid h-full grid-cols-2 gap-4 opacity-30'>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className='rounded-xl bg-neutral-800' />
                    ))}
                  </div>
                </div>

                {/* Fremre kort (Hovedfokus) - Justert størrelse for mobil */}
                <div className='absolute bottom-0 left-0 h-3/4 w-3/4 overflow-hidden rounded-3xl border border-sky-800/30 bg-gradient-to-br from-neutral-900 to-neutral-950 shadow-2xl shadow-sky-900/20 transition-transform duration-500 hover:-translate-y-2'>
                  <div className='absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/carbon-fibre.png")] opacity-10' />

                  <div className='relative flex h-full flex-col justify-between p-6 lg:p-8'>
                    <div className='flex items-center justify-between border-b border-neutral-800 pb-4'>
                      <span className='text-xs font-bold uppercase text-neutral-400'>
                        Core Tech
                      </span>
                      <Shield className='h-5 w-5 text-sky-500' />
                    </div>

                    <div className='space-y-2'>
                      <div className='h-2 w-1/3 rounded-full bg-neutral-800' />
                      <div className='h-2 w-1/2 rounded-full bg-neutral-800' />
                    </div>

                    <div>
                      <h3 className='text-xl font-bold text-white lg:text-2xl'>
                        SherpaCore™
                      </h3>
                      <p className='text-sm text-sky-400'>Thermal Lining</p>
                    </div>
                  </div>
                </div>

                {/* Flytende sirkel (Accent) - Flyttet inn i hjørnet på mobil, svever utenfor på desktop */}
                <div className='absolute bottom-0 right-0 flex h-20 w-20 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 shadow-xl lg:-bottom-6 lg:-right-6 lg:h-24 lg:w-24'>
                  <div className='text-center'>
                    <span className='block text-lg font-bold text-white lg:text-xl'>
                      8K
                    </span>
                    <span className='text-[9px] uppercase text-neutral-500 lg:text-[10px]'>
                      Vannsøyle
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
