// Path: src/app/handlehjelp/sammenlign-modeller/components/DeepDiveSection.tsx
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { deepDiveSections } from '../utils/comparisonData'

export function DeepDiveSection() {
  return (
    <section className='bg-maritime-darkest py-20 text-cloud-dancer sm:py-28'>
      <div className='mx-auto max-w-7xl px-[6vw]'>
        <div className='max-w-3xl'>
          <BrandBadge
            label='Slik velger du'
            backgroundColor='var(--primary-button)'
            className='mb-6 px-6 py-3 text-sm'
          />
          <h2 className='font-google-sans text-4xl leading-[0.95] font-bold tracking-tight text-cloud-dancer sm:text-6xl'>
            Se etter vær, vekt og hvor plagget skal bo
          </h2>
          <p className='mt-6 max-w-2xl font-utekos-text text-lg leading-[1.45] tracking-tight text-cloud-dancer/84 sm:text-xl'>
            De fleste velger riktig når de starter med bruk, ikke materiale. Her
            er de viktigste valgene forklart kort.
          </p>
        </div>

        <div className='mt-14 divide-y divide-cloud-dancer/14 border-y border-cloud-dancer/14'>
          {deepDiveSections.map(section => (
            <article
              key={section.title}
              className='grid gap-8 py-10 lg:grid-cols-[0.42fr_0.58fr] lg:py-14'
            >
              <div>
                <p className='font-utekos-text text-sm font-medium tracking-tight text-cloud-dancer'>
                  {section.eyebrow}
                </p>
                <h3 className='mt-4 font-google-sans text-3xl leading-[0.98] font-bold tracking-tight text-cloud-dancer sm:text-4xl'>
                  {section.title}
                </h3>
              </div>
              <div>
                <p className='font-utekos-text text-lg leading-[1.45] tracking-tight text-cloud-dancer/86'>
                  {section.body}
                </p>
                <ul className='mt-7 grid gap-3 font-utekos-text text-base font-medium tracking-tight text-cloud-dancer sm:grid-cols-3'>
                  {section.points.map(point => (
                    <li key={point} className='border-l border-overcast pl-4'>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
