// src/app/magasinet/oppgradering/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Home, ShoppingBag } from 'lucide-react'
import type { Route } from 'next'
export const metadata: Metadata = {
  title: 'Utekos Magasinet er under oppgradering | Utekos',
  description:
    'Utekos Magasinet er midlertidig under oppgradering. Finn veien videre til produkter, inspirasjon eller forsiden.',
  robots: {
    index: false,
    follow: true
  }
}

const links = [
  {
    href: '/produkter',
    label: 'Se produktene',
    description: 'Utforsk Utekos-plagg, tilbehør og varme løsninger.',
    icon: ShoppingBag
  },
  {
    href: '/inspirasjon',
    label: 'Gå til inspirasjon',
    description: 'Finn ideer for hytte, båt, bobil og gode øyeblikk ute.',
    icon: BookOpen
  },
  {
    href: '/',
    label: 'Til forsiden',
    description: 'Start på nytt og finn veien videre fra forsiden.',
    icon: Home
  }
]

export default function MagazineUpgradePage() {
  return (
    <main className='min-h-screen bg-overcast text-maritime-darkest'>
      <section className='container mx-auto flex min-h-[72vh] items-center px-4 py-20 sm:py-28'>
        <div className='mx-auto max-w-5xl text-center'>
          <p className='font-utekos-text text-sm font-semibold tracking-[0.18em] text-havdyp'>
            Utekos Magasinet
          </p>

          <h1 className='mx-auto mt-5 max-w-4xl text-balance font-google-sans text-5xl font-bold leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl'>
            Utekos Magasinet er under oppgradering
          </h1>

          <p className='mx-auto mt-6 max-w-3xl font-utekos-text text-lg leading-[1.6] tracking-tight text-maritime-darkest/76 sm:text-xl'>
            Vi oppdaterer magasinet vårt for å gi deg en enda bedre opplevelse, med mer relevante guider,
            artikler og inspirasjon. Mens vi gjør de siste justeringene, kan du gjerne utforske produktene
            våre, besøke inspirasjonssidene eller gå direkte til forsiden.
          </p>

          <div className='mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <Link
              href='/produkter'
              className='inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary-button/30 bg-primary-button px-7 py-3 font-utekos-text text-base font-semibold leading-[1.35] tracking-tight text-maritime-darkest transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
            >
              Se produktene
              <ArrowRight className='size-4' aria-hidden />
            </Link>

            <Link
              href='/inspirasjon'
              className='inline-flex min-h-12 items-center justify-center rounded-full border border-maritime-darkest/12 bg-cloud-dancer px-7 py-3 font-utekos-text text-base font-semibold leading-[1.35] tracking-tight text-maritime-darkest transition-transform duration-300 hover:-translate-y-0.5 hover:bg-cloud-dancer/90 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
            >
              Gå til inspirasjon
            </Link>
          </div>

          <div className='mt-14 grid grid-cols-1 gap-4 text-left md:grid-cols-3'>
            {links.map(link => {
              const Icon = link.icon

              return (
                <Link
                  key={link.href}
                  href={link.href as Route}
                  className='group rounded-lg border border-maritime-darkest/10 bg-cloud-dancer p-5 shadow-[0_22px_62px_-54px_color-mix(in_oklch,var(--maritime-darkest)_70%,transparent)] transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
                >
                  <div className='mb-4 flex size-11 items-center justify-center rounded-lg border border-maritime-darkest/10 bg-primary-button text-maritime-darkest'>
                    <Icon className='size-5' aria-hidden />
                  </div>

                  <h2 className='font-google-sans text-2xl font-bold leading-[0.95] tracking-tight text-maritime-darkest'>
                    {link.label}
                  </h2>

                  <p className='mt-3 font-utekos-text text-base leading-[1.55] tracking-tight text-maritime-darkest/76'>
                    {link.description}
                  </p>

                  <span className='mt-5 inline-flex items-center gap-2 font-utekos-text text-sm font-semibold text-havdyp'>
                    Gå videre
                    <ArrowRight
                      className='size-4 transition-transform group-hover:translate-x-1'
                      aria-hidden
                    />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
