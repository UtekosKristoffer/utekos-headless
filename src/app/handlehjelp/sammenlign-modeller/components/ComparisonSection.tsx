// Path: src/app/handlehjelp/sammenlign-modeller/components/ComparisonSection.tsx
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ComparisonTable } from './ComparisonTable'

export function ComparisonSection() {
  return (
    <section
      id='sammenligning'
      className='overflow-hidden bg-overcast py-20 text-maritime-darkest sm:py-28'
    >
      <div className='mx-auto max-w-7xl px-[6vw]'>
        <div className='mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end'>
          <div>
            <BrandBadge
              label='Detaljert sammenligning'
              backgroundColor='var(--cloud-dancer)'
              className='mb-6 px-6 py-3 text-sm'
            />
            <h2 className='font-google-sans text-4xl leading-[0.95] font-bold tracking-[-0.01em] text-maritime-blue sm:text-6xl'>
              Utekos Dun vs Mikrofiber vs TechDown
            </h2>
          </div>
          <p className='max-w-2xl font-utekos-text text-lg leading-[1.45] tracking-tight text-maritime-blue/82 sm:text-xl'>
            Tabellen er laget for raske svar. Les vannrett for én modell, eller
            loddrett for å se hvilken egenskap som betyr mest for deg.
          </p>
        </div>
        <ComparisonTable />
      </div>
    </section>
  )
}
