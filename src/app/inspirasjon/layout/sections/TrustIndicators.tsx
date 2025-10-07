import { CheckIcon } from '@heroicons/react/24/outline'
export function TrustIndicators() {
  return (
    <section className='border-t border-neutral-800 py-8'>
      <div className='container mx-auto px-4'>
        {/* Lagt til w-fit og mx-auto for å sentrere hele blokken */}
        <div className='mx-auto flex w-fit flex-col items-start gap-4 text-sm text-muted-foreground md:flex-row md:gap-8'>
          <div className='flex items-center gap-2'>
            {/* Oppdatert farge til text-green-700 */}
            <CheckIcon className='h-4 w-4 text-green-700' />
            <span>Rask levering (1-3 dager)</span>
          </div>
          <div className='flex items-center gap-2'>
            <CheckIcon className='h-4 w-4 text-green-700' />
            <span>Fri frakt over 999 kr</span>
          </div>
          <div className='flex items-center gap-2'>
            <CheckIcon className='h-4 w-4 text-green-700' />
            <span>Enkel retur</span>
          </div>
        </div>
      </div>
    </section>
  )
}
