import { ComparisonTable } from './ComparisonTable'
export function ComparisonSection() {
  return (
    <section className='py-24 bg-sidebar-foreground'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Detaljert sammenligning
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
            Her har vi brutt ned forskjellene, slik at du kan ta det beste
            valget.
          </p>
        </div>
        <ComparisonTable />
      </div>
    </section>
  )
}
