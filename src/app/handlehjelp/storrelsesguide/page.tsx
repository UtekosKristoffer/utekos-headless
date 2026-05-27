// Path: src/app/handlehjelp/storrelsesguide/page.tsx
import type { Metadata } from 'next'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
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
    description: 'Finn riktig størrelse og sikre deg den unike Utekos-komforten.',
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
    <article className='bg-overcast text-maritime-darkest'>
      <div className='container mx-auto px-4 pt-12 sm:pt-16'>
        <div className='mx-auto max-w-3xl text-center'>
          <BrandBadge
            label='Handlehjelp'
            backgroundColor='var(--cloud-dancer)'
            textColor='var(--maritime-darkest)'
            className='mb-4 px-4 py-2 text-sm'
          />
          <h1 className=' text-maritime-darkest mx-auto'>
            Finn passformen til din{' '}
            <span className='inline-flex items-baseline'>
              <UtekosWordmark
                aria-hidden='true'
                focusable='false'
                className='inline-block h-[0.72em] w-auto translate-y-[0.06em] align-baseline text-maritime-darkest'
              />
              <span className='sr-only'>Utekos</span>
            </span>
          </h1>
          <p className='mx-auto mt-5 max-w-2xl utekos-section-lead text-maritime-darkest/82'>
            Riktig størrelse gir mer ro, bedre varme og en passform som følger deg ute. Bruk guiden til å
            velge trygt før du handler.
          </p>
        </div>
      </div>
      <div className='sticky top-0 z-20 my-10 py-4 text-cloud-dancer sm:my-16'>
        <div className='container mx-auto px-4'>
          <nav
            className='flex flex-wrap items-center justify-center gap-2 sm:gap-3'
            aria-label='Hopp til produktguide'
          >
            {navigationLinks.map(link => (
              <BrandBadge
                asChild
                key={link.name}
                backgroundColor='var(--cloud-dancer)'
                textColor='var(--maritime-darkest)'
                className='border border-cloud-dancer/20 px-4 py-2 text-sm transition-[filter,transform] duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-button/45 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
              >
                <a href={link.href} data-track={`SizeGuideNav_${link.name}`}>
                  {link.name}
                </a>
              </BrandBadge>
            ))}
          </nav>
        </div>
      </div>

      <TechDownSizeGuide />

      <div className='container mx-auto px-4'>
        <div className='relative my-10 sm:my-24'>
          <div className='absolute inset-0 flex items-center' aria-hidden='true'>
            <div className='w-full border-t border-maritime-darkest/14' />
          </div>
        </div>
      </div>

      <UtekosSizeGuide />

      <div className='container mx-auto px-4'>
        <div className='relative sm:my-16'>
          <div className='absolute inset-0 flex items-center' aria-hidden='true'>
            <div className='w-full border-t border-maritime-darkest/14' />
          </div>
        </div>
      </div>

      <ComfyrobeSizeGuide />

      <BackToShopCta />
    </article>
  )
}
