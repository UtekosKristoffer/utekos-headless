import Link from 'next/link'
import { ArrowRight, Layers, Shield, Thermometer, Zap } from 'lucide-react'
import type { Route } from 'next'

export default function TechTeaserSection() {
  return (
    <section className='mt-12 w-full py-12'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='relative overflow-hidden rounded-sm border border-[#F4F1EA]/10 bg-[#2C2420] p-8 md:p-12 lg:p-16 shadow-2xl'>
          <div className='pointer-events-none absolute -left-[10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#E07A5F]/10 blur-[100px]' />

          <div className='relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16'>
            <div className='space-y-8'>
              <div className='inline-flex items-center gap-2 rounded-full border border-[#E07A5F]/30 bg-[#E07A5F]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E07A5F]'>
                <Zap className='h-3 w-3' />
                Innovasjon og materialer
              </div>

              <div className='space-y-4'>
                <h2 className='text-3xl font-serif font-medium tracking-tight text-[#F4F1EA] sm:text-4xl md:text-5xl'>
                  Vitenskapen bak <br />
                  <span className='bg-gradient-to-r from-[#E07A5F] via-[#ffb09c] to-[#E07A5F] bg-clip-text text-transparent'>
                    din komfort.
                  </span>
                </h2>
                <p className='max-w-xl text-lg leading-relaxed text-[#F4F1EA]/80 font-light'>
                  Det handler ikke bare om varme, men om hvordan varmen skapes.
                  Fra vår hydrofobiske <strong>TechDown™</strong> til det
                  robuste <strong>HydroGuard™</strong>-skallet. Oppdag
                  teknologien og funksjonaliteten som gjør at Utekos
                  revolusjonerer utendørsopplevelsen.
                </p>
              </div>

              {/* Feature Liste */}
              <ul className='space-y-5'>
                {[
                  {
                    icon: Thermometer,
                    title: 'Termisk effektivitet',
                    desc: 'Isolasjon som absorberer og varmer.'
                  },
                  {
                    icon: Shield,
                    title: 'HydroGuard™ beskyttelse',
                    desc: 'Pustende membran med 8000mm vannsøyle.'
                  },
                  {
                    icon: Layers,
                    title: '3-i-1 adaptivitet',
                    desc: 'Endre funksjon fra kokong til parkas.'
                  }
                ].map((item, idx) => (
                  <li key={idx} className='flex items-start gap-4'>
                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E07A5F]/10 text-[#E07A5F] mt-1'>
                      <item.icon className='h-4 w-4' />
                    </div>
                    <div>
                      <span className='block text-base font-medium text-[#F4F1EA]'>
                        {item.title}
                      </span>
                      <span className='block text-sm text-[#F4F1EA]/60 font-light'>
                        {item.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className='pt-6'>
                <Link
                  href={'/handlehjelp/teknologi-materialer' as Route}
                  className='group inline-flex items-center gap-2 rounded-sm bg-[#E07A5F] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#d0694e] shadow-lg shadow-[#E07A5F]/20'
                >
                  Utforsk teknologien
                  <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </div>
            </div>

            <div className='relative mx-auto mt-0 h-[320px] w-full max-w-md lg:mt-0 lg:aspect-square lg:h-auto'>
              <div className='relative h-full w-full'>
                <div className='absolute right-[5%] top-[5%] h-3/4 w-3/4 rounded-sm border border-[#F4F1EA]/5 bg-[#1F2421]/60 opacity-60 backdrop-blur-sm transition-transform duration-500 hover:translate-x-2 hover:-translate-y-2 lg:right-0 lg:top-0' />

                <div className='absolute bottom-[15%] right-[15%] top-[15%] w-3/4 rounded-sm border border-[#F4F1EA]/10 bg-[#1F2421]/90 p-6 backdrop-blur-md transition-transform duration-500 hover:translate-x-2 hover:-translate-y-2 lg:bottom-8 lg:right-8 lg:top-8'>
                  <div className='grid h-full grid-cols-2 gap-4 opacity-20'>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className='rounded-sm bg-[#F4F1EA]' />
                    ))}
                  </div>
                </div>

                <div className='absolute bottom-0 left-0 h-3/4 w-3/4 overflow-hidden rounded-sm border border-[#E07A5F]/30 bg-gradient-to-br from-[#1F2421] to-[#2C2420] shadow-2xl shadow-[#E07A5F]/10 transition-transform duration-500 hover:-translate-y-2'>
                  <div className='absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/carbon-fibre.png")] opacity-5 mix-blend-overlay' />

                  <div className='relative flex h-full flex-col justify-between p-6 lg:p-8'>
                    <div className='flex items-center justify-between border-b border-[#F4F1EA]/10 pb-4'>
                      <span className='text-xs font-bold uppercase text-[#E07A5F] tracking-widest'>
                        Core Tech
                      </span>
                      <Shield className='h-5 w-5 text-[#E07A5F]' />
                    </div>

                    <div className='space-y-2'>
                      <div className='h-1.5 w-1/3 rounded-full bg-[#F4F1EA]/10' />
                      <div className='h-1.5 w-1/2 rounded-full bg-[#F4F1EA]/10' />
                    </div>

                    <div>
                      <h3 className='text-xl font-serif font-bold text-[#F4F1EA] lg:text-2xl'>
                        SherpaCore™
                      </h3>
                      <p className='text-sm text-[#E07A5F] opacity-90'>
                        Thermal Lining
                      </p>
                    </div>
                  </div>
                </div>

                <div className='absolute bottom-0 right-0 flex h-20 w-20 items-center justify-center rounded-full border border-[#F4F1EA]/10 bg-[#1F2421] shadow-xl lg:-bottom-6 lg:-right-6 lg:h-24 lg:w-24'>
                  <div className='text-center'>
                    <span className='block text-lg font-bold text-[#E07A5F] lg:text-xl'>
                      8K
                    </span>
                    <span className='text-[9px] uppercase text-[#F4F1EA]/50 lg:text-[10px] tracking-wider'>
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
