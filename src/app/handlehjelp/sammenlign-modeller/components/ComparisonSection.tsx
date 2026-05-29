// Path: src/app/handlehjelp/sammenlign-modeller/components/ComparisonSection.tsx
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ComparisonTable } from './ComparisonTable'

export function ComparisonSection() {
  return (
    <section id='sammenligning' className='overflow-hidden bg-havdyp py-20 text-cloud-dancer sm:py-28'>
      <div className='mx-auto max-w-7xl px-[6vw]'>
        <div className='mb-12 grid gap-8 text-center'>
          <div>
            <BrandBadge
              label='Detaljert sammenligning'
              backgroundColor='var(--mountain-view)'
              className='mb-6 px-6 text-cloud-dancer py-3 text-sm'
            />
            <h2 className='text-cloud-dancer'>Sammenlign egenskapene</h2>
          </div>
          <p className='max-w-2xl mx-auto text-cloud-dancer utekos-section-lead'>
            Tabellen er laget for å gi deg en detaljert sammenligning av de tre Utekos-modellene. Les vannrett
            for én modell, eller loddrett for å se hvilken egenskap som betyr mest for deg.
          </p>
        </div>
        <ComparisonTable />
      </div>
    </section>
  )
}
