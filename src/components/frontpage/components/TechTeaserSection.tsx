import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Layers, Shield, Thermometer, Cpu } from 'lucide-react'
import type { Route } from 'next'
import SherpaCoraImg from '@public/1080/comfy-design-1080.png'
import TechTeaserMotion from './TechTeaserMotion'

export default function TechTeaserSection() {
  return (
    <section
      id='tech-teaser'
      className='mt-12 w-full py-12 md:py-24 overflow-hidden'
    >
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-950 p-8 shadow-2xl md:p-12 lg:p-20'>
          <div className='pointer-events-none absolute -left-[10%] top-0 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-sky-500/5 blur-[120px]' />
          <div className='pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] translate-y-1/3 rounded-full bg-orange-500/5 blur-[100px]' />

          <div className='relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20'>
            <div className='space-y-10'>
              <div className='gsap-content inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 backdrop-blur-sm'>
                <div className='relative flex h-2 w-2'>
                  {/* Ping-effekt i varmt gull */}
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75' />
                  {/* Statisk punkt i dypere rav/gull */}
                  <span className='relative inline-flex h-2 w-2 rounded-full bg-amber-500' />
                </div>
                {/* Tekst i lysere gull for god lesbarhet mot mørk bakgrunn */}
                <span className='text-xs font-bold uppercase tracking-widest text-amber-400'>
                  Innovasjon & Materialer
                </span>
              </div>

              <div className='space-y-6'>
                <h2 className='gsap-content text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl md:text-6xl'>
                  Vitenskapen bak <br />
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600'>
                    din komfort.
                  </span>
                </h2>
                <p className='gsap-content max-w-lg text-lg leading-relaxed text-neutral-400'>
                  Det handler ikke bare om varme, men om hvordan varmen skapes.
                  Fra vår hydrofobiske{' '}
                  <strong className='text-white'>TechDown™</strong> til det
                  robuste <strong className='text-white'>HydroGuard™</strong>
                  -skallet.
                </p>
              </div>

              <ul className='space-y-6'>
                {[
                  {
                    icon: Thermometer,
                    title: 'Termisk effektivitet',
                    desc: 'Isolasjon som absorberer og resirkulerer kroppsvarme.',
                    color: 'text-orange-400',
                    bg: 'bg-orange-500/10'
                  },
                  {
                    icon: Shield,
                    title: 'HydroGuard™ beskyttelse',
                    desc: 'Pustende membran med 8000mm vannsøyle.',
                    color: 'text-sky-400',
                    bg: 'bg-sky-500/10'
                  },
                  {
                    icon: Layers,
                    title: '3-i-1 adaptivitet',
                    desc: 'Fra isolerende kokong til bevegelig parkas på sekunder.',
                    color: 'text-emerald-400',
                    bg: 'bg-emerald-500/10'
                  }
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className='gsap-content group flex items-start gap-4'
                  >
                    <div
                      className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/5 ${item.bg} ${item.color} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <item.icon className='h-5 w-5' />
                    </div>
                    <div>
                      <span className='block text-base font-semibold text-white group-hover:text-sky-100 transition-colors'>
                        {item.title}
                      </span>
                      <span className='block text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors'>
                        {item.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className='gsap-content pt-4'>
                <Link
                  href={'/handlehjelp/teknologi-materialer' as Route}
                  data-track='TechTeaserSectionExploreTechClick'
                  className='group inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-bold text-neutral-950 transition-all hover:bg-sky-50 hover:scale-105 active:scale-95'
                >
                  Utforsk teknologien
                  <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </div>
            </div>
            <div
              data-tech-card
              className='gsap-card-visual relative mx-auto w-full max-w-md perspective-1000 lg:h-auto'
            >
              <div
                data-tilt-layer
                className='relative w-full aspect-[4/5] preserve-3d'
              >
                <div className='absolute -right-4 -top-4 h-full w-full rounded-2xl border border-white/5 bg-neutral-900/50 backdrop-blur-sm -z-10 transform translate-z-[-20px]' />

                <div className='relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl'>
                  <Image
                    src={SherpaCoraImg}
                    alt='SherpaCore Technology Layer'
                    fill
                    className='object-cover opacity-80'
                    sizes='(max-width: 768px) 100vw, 33vw'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent' />

                  <div
                    data-inner-parallax
                    className='gsap-inner-parallax relative flex h-full flex-col justify-between p-8'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md'>
                        <Cpu className='h-3.5 w-3.5 text-sky-400' />
                        <span className='text-[10px] font-bold uppercase tracking-widest text-white'>
                          Core Tech
                        </span>
                      </div>
                      <Shield className='h-5 w-5 text-neutral-500' />
                    </div>

                    <div>
                      <div className='mb-4 space-y-1.5 opacity-60'>
                        <div className='h-1 w-12 rounded-full bg-sky-500' />
                        <div className='h-1 w-8 rounded-full bg-neutral-600' />
                      </div>

                      <h3 className='text-3xl font-bold text-white tracking-tight'>
                        SherpaCore™
                      </h3>
                      <p className='text-sm font-medium text-sky-400'>
                        Thermal Lining System
                      </p>
                    </div>
                  </div>
                </div>

                <div className='gsap-inner-parallax absolute -bottom-6 -right-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-neutral-900 shadow-2xl translate-z-[40px]'>
                  <div className='text-center'>
                    <span className='block text-2xl font-bold text-sky-400'>
                      8K
                    </span>
                    <span className='text-[10px] font-bold uppercase tracking-wider text-neutral-500'>
                      Vannsøyle
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TechTeaserMotion targetId='tech-teaser' />
        </div>
      </div>
    </section>
  )
}
