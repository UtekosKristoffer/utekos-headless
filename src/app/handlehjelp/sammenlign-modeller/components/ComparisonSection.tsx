// Path: src/app/handlehjelp/sammenlign-modeller/components/ComparisonSection.tsx
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ComparisonTable } from './ComparisonTable'

export function ComparisonSection() {
  return (
    <section id='sammenligning' className='overflow-hidden bg-overcast py-20 text-maritime-darkest sm:py-28'>
      <div className='mx-auto max-w-7xl px-[6vw]'>
        <div className='mb-12 grid gap-8 text-center'>
          <div>
            <BrandBadge
              label='Detaljert sammenligning'
              backgroundColor='var(--cloud-dancer)'
              className='mb-6 px-6 py-3 text-sm'
            />
            <h2 className='text-maritime-blue'>Sammenlign egenskapene</h2>
          </div>
          <p className='max-w-2xl mx-auto text-maritime-blue/82 utekos-section-lead'>
            Tabellen er laget for å gi deg en detaljert sammenligning av de tre Utekos-modellene. Les vannrett
            for én modell, eller loddrett for å se hvilken egenskap som betyr mest for deg.
          </p>
        </div>
        <ComparisonTable />
      </div>
    </section>
  )
}
