import { AboutSwiper } from '@/components/about/AboutSwiper'
import { corePhilosophies } from '@/constants/corePhilosophies'
import AboutUsOG from '@public/norsk-kveld.webp'
import { ArrowRightIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { GrunderSection } from './Sections/GrunderSection'
import { FindUsSection } from './Sections/FindUsSection'
import { PromiseSection } from './Sections/PromiseSection'
import { CTASection } from './Sections/CTASection'
export const metadata: Metadata = {
  title: 'Om Utekos | Vår historie og løfte til deg',
  description:
    'Lær om hvorfor Utekos ble skapt – en historie om å verdsette de små øyeblikkene og et løfte om kompromissløs komfort, designet i Norge for norske forhold.'
}

export default function AboutPage() {
  return (
    <main>
      {/* 1. HERO-SEKSJON */}
      <section className='relative h-[60vh] flex items-center justify-center text-center text-white overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <Image
            src={AboutUsOG}
            alt='Stemningsfullt bilde av norsk natur i skumringen'
            quality={100}
            fill
            sizes='100vw'
            className='object-cover'
            priority
          />
          <div className='absolute inset-0 bg-black/60' />
        </div>
        <div className='relative z-10 container px-4'>
          <h1 className='text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
            Utekos™ - Vår historie
          </h1>
          <p className='mt-6 text-lg max-w-2xl mx-auto leading-8 text-white/80'>
            Drevet av kalde kvelder og et ønske om å aldri la komfort stoppe de
            gode øyeblikkene.
          </p>
        </div>
      </section>

      <GrunderSection />

      {/* 3. FILOSOFI-SEKSJON */}
      <section className='py-24 sm:py-32 bg-sidebar-foreground'>
        <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-16 text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              Vår filosofi
            </h2>
            <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'>
              Fire prinsipper som ligger i hjertet av alt vi gjør.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {corePhilosophies.map((item, i) => (
              <div
                key={item.title}
                className='relative overflow-hidden rounded-xl border border-neutral-800 bg-background p-8 text-center'
              >
                <div
                  className={`animate-aurora absolute -inset-x-20 -inset-y-20 opacity-20 blur-3xl ${item.color} bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-from)_0%,transparent_50%)]`}
                />
                <div className='relative z-10'>
                  <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-sidebar-foreground border border-neutral-700'>
                    <item.icon className='h-6 w-6 text-foreground' />
                  </div>
                  <h3 className='mt-6 text-xl font-semibold'>{item.title}</h3>
                  <p className='mt-2 text-sm text-muted-foreground'>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LØFTE-SEKSJON */}
      <PromiseSection />

      <AboutSwiper />

      <FindUsSection />
      {/*  6. CTA-SEKSJON */}
      <CTASection />
    </main>
  )
}
