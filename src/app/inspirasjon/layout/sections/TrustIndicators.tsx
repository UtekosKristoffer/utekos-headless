import { CheckIcon } from '@heroicons/react/24/outline'
export function TrustIndicators() {
  return (
    <section className='border-t border-slate-100 bg-havdyp py-8'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto flex w-fit flex-col items-start gap-4 text-sm leading-text-paragraph tracking-[-0.01em] text-foreground md:flex-row md:gap-8'>
          <div className='flex items-center gap-2'>
            <CheckIcon className='size-4 text-orange-slice' />
            <span>Rask levering</span>
          </div>
          <div className='flex items-center gap-2'>
            <CheckIcon className='size-4 text-orange-slice' />
            <span>Fri frakt over 999 kr</span>
          </div>
          <div className='flex items-center gap-2'>
            <CheckIcon className='size-4 text-orange-slice' />
            <span>Enkel retur</span>
          </div>
        </div>
      </div>
    </section>
  )
}
