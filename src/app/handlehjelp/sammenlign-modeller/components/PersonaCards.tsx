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
        <div className='max-w-3xl px-4 items-center md:max-w-3xl lg:max-w-4xl justify-center text-center w-full mx-auto'>
          <BrandBadge
            label='Velg etter bruk'
            backgroundColor='var(--havdyp)'
            className='mb-6 px-6 py-3 text-cloud-dancer text-sm'
          />
          <h2 className='text-havdyp mx-auto md:max-w-3xl'>Hva er riktig Utekos for deg?</h2>
          <p className='mt-6 max-w-2xl md:max-w-3xl lg:max-w-4xl utekos-section-lead mx-auto  text-maritime-darkest'>
            Å velge riktig Utekos handler i stor grad om å finne balansen mellom varme, vekt, pakkvolum og hva
            du faktisk skal bruke jakken til.
          </p>
        </div>

        <div className='mt-14 grid gap-8 lg:grid-cols-3'>
          {modelRecommendations.map(model => (
            <article key={model.key} className='group overflow-hidden bg-havdyp text-cloud-dancer'>
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
                  <h3 className='font-google-sans text-3xl leading-[0.95] font-bold tracking-[-0.01em] text-cloud-dancer'>
                    {model.name}
                  </h3>
                  <p className='mt-3   text-lg font-medium leading-[1.35]   text-cloud-dancer'>
                    {model.bestFor}
                  </p>
                  <p className='mt-4   text-base leading-[1.45]   text-clud-dancer/7'>{model.description}</p>
                  <ul className='mt-6 space-y-2   text-sm font-medium   text-cloud-dancer'>
                    {model.proofPoints.map(point => (
                      <li key={point} className='flex items-center gap-3'>
                        <span className='size-2 rounded-full bg-cloud-dancer' />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span className='mt-7 inline-flex   text-base font-medium   text-cloud-dancer underline decoration-cloud-dancer underline-offset-8 transition-colors duration-300 group-hover:text-overcast'>
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
