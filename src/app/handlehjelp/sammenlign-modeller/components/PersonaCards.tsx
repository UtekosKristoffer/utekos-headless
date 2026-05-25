// Path: src/app/handlehjelp/sammenlign-modeller/components/PersonaCards.tsx
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { modelRecommendations } from '../utils/comparisonData'

export function PersonaCards() {
  return (
    <section id='velg-etter-bruk' className='bg-cloud-dancer py-20 text-maritime-darkest sm:py-28'>
      <div className='mx-auto max-w-7xl'>
        <div className='max-w-3xl items-center md:max-w-3xl lg:max-w-4xl justify-center text-center w-full mx-auto'>
          <BrandBadge
            label='Velg etter bruk'
            backgroundColor='var(--ancient-water)'
            className='mb-6 px-6 py-3 text-sm'
          />
          <h2 className='text-maritime-blue mx-auto md:max-w-3xl'>Hva er riktig Utekos for deg?</h2>
          <p className='mt-6 max-w-2xl md:max-w-3xl lg:max-w-4xl utekos-section-lead mx-auto text-maritime-darkest'>
            Å velge riktig Utekos handler i stor grad om å finne balansen mellom varme, vekt, pakkvolum og hva
            du faktisk skal bruke jakken til.
          </p>
        </div>

        <div className='mt-14 grid gap-8 lg:grid-cols-3'>
          {modelRecommendations.map(model => (
            <article key={model.key} className='group overflow-hidden bg-overcast text-maritime-darkest'>
              <Link href={model.href as Route} className='block'>
                <div className='relative aspect-[4/3] overflow-hidden'>
                  <Image
                    src={model.imageSrc}
                    alt={model.imageAlt}
                    fill
                    sizes='(max-width: 1024px) 100vw, 33vw'
                    className='object-cover transition-transform duration-700 group-hover:scale-[1.04]'
                  />
                </div>
                <div className='p-7 sm:p-8'>
                  <BrandBadge
                    label={model.badge}
                    backgroundColor='var(--cloud-dancer)'
                    className='mb-6 px-5 py-2 text-sm'
                  />
                  <h3 className='font-google-sans text-3xl leading-[0.95] font-bold tracking-[-0.01em] text-maritime-blue'>
                    {model.name}
                  </h3>
                  <p className='mt-3 font-utekos-text text-lg font-medium leading-[1.35] tracking-tight text-maritime-darkest'>
                    {model.bestFor}
                  </p>
                  <p className='mt-4 font-utekos-text text-base leading-[1.45] tracking-tight text-maritime-blue/78'>
                    {model.description}
                  </p>
                  <ul className='mt-6 space-y-2 font-utekos-text text-sm font-medium tracking-tight text-maritime-darkest'>
                    {model.proofPoints.map(point => (
                      <li key={point} className='flex items-center gap-3'>
                        <span className='size-2 rounded-full bg-maritime-blue' />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span className='mt-7 inline-flex font-utekos-text text-base font-medium tracking-tight text-maritime-blue underline decoration-maritime-blue/25 underline-offset-8 transition-colors duration-300 group-hover:text-maritime-darkest'>
                    {model.cta}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
