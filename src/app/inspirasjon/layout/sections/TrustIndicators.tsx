import { CheckIcon } from '@heroicons/react/24/outline'
export function TrustIndicators() {
  return (
    <section className='border-t border-chocolate-plum bg-maritime-darkest py-8'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto flex w-fit flex-col items-start gap-4 text-sm leading-[1.45] tracking-[-0.01em] text-cloud-dancer md:flex-row md:gap-8'>
          <div className='flex items-center gap-2'>
            <CheckIcon className='size-4 text-primary-button' />
            <span>Rask levering</span>
          </div>
          <div className='flex items-center gap-2'>
            <CheckIcon className='size-4 text-primary-button' />
            <span>Fri frakt over 999 kr</span>
          </div>
          <div className='flex items-center gap-2'>
            <CheckIcon className='size-4 text-primary-button' />
            <span>Enkel retur</span>
          </div>
        </div>
      </div>
    </section>
  )
}
