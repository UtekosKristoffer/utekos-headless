// Path: src/app/handlehjelp/storrelsesguide/page.tsx
import type { Metadata } from 'next'
import { Activity } from 'react'
import { BackToShopCta } from './BackToShopCta'
import { ComfyrobeSizeGuide } from './ComfyrobeSizeGuide'
import { TechDownSizeGuide } from './TechDownSizeGuide'
import { UtekosSizeGuide } from './UtekosSizeGuide'
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Størrelsesguide for Utekos | Finn din perfekte passform',
  description:
    'Sikre deg den ultimate komforten. Vår detaljerte størrelsesguide for Utekos Dun, Mikrofiber og Comfyrobe hjelper deg å velge riktig størrelse for de gode stundene.',
  alternates: {
    canonical: '/handlehjelp/storrelsesguide'
  },
  openGraph: {
    title: 'Størrelsesguide for Utekos | Finn din perfekte passform',
    description:
      'Finn riktig størrelse og sikre deg den unike Utekos-komforten.',
    url: '/handlehjelp/storrelsesguide',
    siteName: 'Utekos',
    images: [
      {
        url: 'https://utekos.no/og-storrelsesskjema-techdown.png',
        width: 1200,
        height: 630,
        alt: 'Illustrasjon av måleskjema for Utekos-produkter.'
      }
    ],
    locale: 'no_NO',
    type: 'website'
  }
}

const navigationLinks = [
  { name: 'TechDown™', href: '#tech-down-size-guide' },
  { name: 'Utekos™', href: '#utekos-size-guide' },
  { name: 'Comfyrobe™', href: '#comfyrobe-size-guide' }
]

export default function SizeGuidePage() {
  return (
    <>
      <section>
        <Activity>
          <div className='container mx-auto px-4 pt-12 sm:pt-16'>
            <div className='mx-auto max-w-3xl text-center'>
              <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
                Finn din perfekte passform
              </h1>
              <p className='mt-4 text-lg text-foreground/80'>
                Riktig størrelse er nøkkelen til den ultimate
                komfortopplevelsen. Denne guiden gir deg tryggheten du trenger
                for å velge riktig.
              </p>
            </div>
          </div>
        </Activity>
        <Activity>
          <div className='sticky top-0 z-20 my-10 bg-black/60 py-4 backdrop-blur-md sm:my-16'>
            <div className='container mx-auto px-4'>
              <nav
                className='flex items-center justify-center gap-2 sm:gap-6'
                aria-label='Hopp til produktguide'
              >
                {navigationLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    className='transform rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 text-center text-sm font-semibold text-neutral-200 transition-all duration-150 ease-in-out hover:border-neutral-500 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black'
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </Activity>

        <Activity>
          <section id='tech-down-size-guide' className='scroll-mt-28'>
            <TechDownSizeGuide />
          </section>
        </Activity>

        <div className='container mx-auto px-4'>
          <div className='relative my-10 sm:my-24'>
            <div
              className='absolute inset-0 flex items-center'
              aria-hidden='true'
            >
              <div className='w-full border-t border-neutral-800' />
            </div>
          </div>
        </div>

        <Activity>
          <section id='utekos-size-guide' className='scroll-mt-28'>
            <UtekosSizeGuide />
          </section>
        </Activity>

        <div className='container mx-auto px-4'>
          <div className='relative sm:my-16'>
            <div
              className='absolute inset-0 flex items-center'
              aria-hidden='true'
            >
              <div className='w-full border-t border-neutral-800' />
            </div>
          </div>
        </div>

        <Activity>
          <section id='comfyrobe-size-guide' className='scroll-mt-28'>
            <ComfyrobeSizeGuide />
          </section>
        </Activity>

        <Activity>
          <BackToShopCta />
        </Activity>
      </section>
    </>
  )
}
