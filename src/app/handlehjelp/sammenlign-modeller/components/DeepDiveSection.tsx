// Path: src/app/handlehjelp/sammenlign-modeller/components/DeepDiveSection.tsx
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { deepDiveSections } from '../utils/comparisonData'

export function DeepDiveSection() {
  return (
    <section
      aria-labelledby='sammenlign-modeller-deep-dive-heading'
      className='bg-cloud-dancer py-20 text-maritime-darkest sm:py-28'
    >
      <div className='mx-auto max-w-7xl px-[6vw]'>
        <div className='max-w-3xl md:max-w-4xl text-center w-full mx-auto'>
          <BrandBadge
            label='Slik velger du'
            backgroundColor='var(--primary)'
            className='mb-6 px-6 py-3 text-sm'
          />
          <h2 id='sammenlign-modeller-deep-dive-heading' className='text-maritime-darkest w-full mx-auto'>
            Se etter vær, vekt og hvor plagget skal bo
          </h2>
          <p className='mt-6 utekos-section-lead max-w-2xl mx-auto text-maritime-darkest'>
            De fleste velger riktig når de starter med bruk, ikke materiale. Her er de viktigste valgene
            forklart kort.
          </p>
        </div>

        <ul className='mt-14 divide-y divide-maritime-darkest/14 border-y border-maritime-darkest/14'>
          {deepDiveSections.map(section => (
            <li key={section.title}>
              <article className='mx-auto max-w-4xl py-10 lg:py-14'>
                <p className='  text-sm font-medium   text-maritime-darkest'>{section.eyebrow}</p>
                <h3 className='mt-4 font-google-sans text-3xl leading-[0.98] font-bold   text-maritime-darkest sm:text-4xl'>
                  {section.title}
                </h3>

                <ul className='mt-7 list-disc space-y-4 pl-5   text-base font-medium leading-[1.45]   text-maritime-darkest marker:text-primary sm:text-lg'>
                  <li className='text-maritime-darkest/90'>{section.body}</li>
                  {section.points.map(point => (
                    <li key={point} className='text-maritime-darkests/86'>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
