import { CheckIcon } from '@heroicons/react/24/outline'

export function TrustSection() {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              En garantert suksess
            </h2>
            <p className='mt-4 text-lg text-muted-foreground'>
              Vi gjør gaveshoppingen trygg og enkel for deg.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            <div className='flex flex-col items-center'>
              <CheckIcon className='h-8 w-8 text-cyan-400 mb-4' />
              <h3 className='font-semibold mb-2'>14 dagers åpent kjøp</h3>
              <p className='text-sm text-muted-foreground'>
                Bytt farge eller størrelse uten stress. Vi hjelper deg gjerne.
              </p>
            </div>
            <div className='flex flex-col items-center'>
              <CheckIcon className='h-8 w-8 text-emerald-400 mb-4' />
              <h3 className='font-semibold mb-2'>Rask levering</h3>
              <p className='text-sm text-muted-foreground'>
                Vi sender raskt fra vårt lager i Norge, slik at gaven kommer
                frem i tide.
              </p>
            </div>
            <div className='flex flex-col items-center'>
              <CheckIcon className='h-8 w-8 text-amber-400 mb-4' />
              <h3 className='font-semibold mb-2'>Trygg handel</h3>
              <p className='text-sm text-muted-foreground'>
                Vil tilbyr betaling med Klarna og Vipps
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
