import { TestimonialSection } from './TestimonialSection'
export function TestimonialConstellation() {
  return (
    <section className='mx-auto max-w-[95%] py-24 sm:py-32 md:max-w-7xl'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Hva sier andre livsnytere?
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-access/80'>
            Ekte tilbakemeldinger fra kunder som, i likhet med deg, verdsetter
            komfort og kvalitetstid.
          </p>
        </div>

        <TestimonialSection />
      </div>
    </section>
  )
}
