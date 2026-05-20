import { CheckIcon } from '@heroicons/react/24/outline'
export function TrustIndicators() {
  return (
    <section className='border-t bg-maritime-darkest border-chocolate-plum py-8'>
      <div className='container mx-auto px-4'>
        {/* Lagt til w-fit og mx-auto for å sentrere hele blokken */}
        <div className='mx-auto flex w-fit flex-col items-start gap-4 text-sm text-cloud-dancer md:flex-row md:gap-8'>
          <div className='flex items-center gap-2'>
            {/* Oppdatert farge til text-primary-button */}
            <CheckIcon className='h-4 w-4 text-primary-button' />
            <span>Rask levering</span>
          </div>
          <div className='flex items-center gap-2'>
            <CheckIcon className='h-4 w-4 text-primary-button' />
            <span>Fri frakt over 999 kr</span>
          </div>
          <div className='flex items-center gap-2'>
            <CheckIcon className='h-4 w-4 text-primary-button' />
            <span>Enkel retur</span>
          </div>
        </div>
      </div>
    </section>
  )
}
