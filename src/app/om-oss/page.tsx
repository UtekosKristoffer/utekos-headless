import { AboutSwiper } from '@/components/about/AboutSwiper'
import { corePhilosophies } from '@/constants/corePhilosophies'
import AboutUsOG from '@public/norsk-kveld.webp'
import { ArrowRightIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import UtekosFounder from '../../../public/blue_bag1.webp'
import { PromiseSection } from './Sections/PromiseSection'
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

      {/*  2. GRÜNDER-SEKSJON */}
      <section className='py-24 sm:py-32'>
        <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* ENDRING 1: Fjerner `items-center` og endrer grid-kolonner for mobil */}
          <div className='grid grid-cols-2 gap-12 lg:gap-16'>
            {/* Venstre kolonne: Bilde */}
            {/* ENDRING 2: Legger til `h-full` for å sikre at containeren fyller høyden */}
            <div className='flex h-full flex-col rounded-xl border border-neutral-800 p-2'>
              <div className='relative h-full w-full overflow-hidden rounded-lg'>
                <Image
                  src={UtekosFounder}
                  alt='Portrett av gründeren av Utekos'
                  width={1333}
                  height={2000}
                  className='object-cover object-top h-full w-full'
                />
              </div>
            </div>

            {/* Høyre kolonne: Tekst */}
            {/* ENDRING 3: Legger til `flex` for å kunne sentrere innholdet vertikalt */}
            <div className='flex h-full flex-col justify-center'>
              <div className='prose prose-invert max-w-none text-lg text-muted-foreground'>
                <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
                  Fra idé til virkelighet
                </h2>
                <p>
                  Utekos ble født ut av et enkelt, gjenkjennelig problem: de
                  utallige gangene en perfekt kveld på terrassen, i båten eller
                  utenfor bobilen ble kuttet kort av kulden. Jeg var lei av
                  stive pledd og upraktiske lag med klær.
                </p>
                <p>
                  Tanken var å skape ett enkelt, kompromissløst plagg. Et
                  verktøy for komfort som var så behagelig at du glemte du hadde
                  det på, men så funksjonelt at det lot deg eie øyeblikket,
                  uansett temperatur. Etter måneder med design, testing og
                  perfeksjonering av materialer her i Norge, ble Utekos en
                  realitet.
                </p>
                <p className='font-semibold text-foreground'>
                  – En hyllest til de små, verdifulle øyeblikkene i en travel
                  hverdag.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* 5. SWIPER-SEKSJON */}
      <section className='py-24 sm:py-32 mx-auto bg-sidebar-foreground px-4 py-16'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Et glimt av Utekos
          </h2>
          <p className='mt-4 text-lg leading-8 text-muted-foreground'>
            Se hvordan kompromissløs komfort gir liv til dine favorittøyeblikk
            utendørs.
          </p>
        </div>
        <div className='mt-12'>
          <AboutSwiper />
        </div>
      </section>

      {/*  6. CTA-SEKSJON */}
      <section className='py-24 sm:py-32'>
        <div className='container mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Klar til å oppleve komforten?
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
            Se hvordan vår filosofi og våre materialvalg kommer til live i
            produktene som er designet for å forlenge dine beste øyeblikk.
          </p>
          <div className='mt-8'>
            <Link
              href='/produkter'
              className='inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            >
              Se alle produkter
              <ArrowRightIcon className='ml-2 h-4 w-4' />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
