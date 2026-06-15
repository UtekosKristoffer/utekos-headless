'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

type ProductPageErrorStateProps = {
  error: Error
  isRetrying: boolean
  onRetry: () => void
}

export function ProductPageErrorState({ error, isRetrying, onRetry }: ProductPageErrorStateProps) {
  return (
    <section className='relative isolate overflow-hidden bg-overcast px-4 py-24 text-havdyp sm:py-32'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-[10%] top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ancient-water)_58%,transparent)_0%,transparent_72%)] blur-3xl' />
        <div className='absolute bottom-12 right-[8%] h-80 w-80 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--very-peri)_22%,transparent)_0%,transparent_72%)] blur-3xl' />
      </div>

      <section
        aria-labelledby='product-error-heading'
        className='mx-auto max-w-2xl rounded-[1.75rem] border border-cloud-dancer/70 bg-cloud-dancer/72 p-8 text-center shadow-2xl shadow-havdyp/10 backdrop-blur-sm sm:p-10'
      >
        <div className='mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-havdyp/14 bg-havdyp text-foreground'>
          <AlertTriangle className='h-6 w-6' aria-hidden='true' />
        </div>
        <h1 id='product-error-heading' className='mb-4 text-3xl font-serif text-havdyp sm:text-4xl'>
          Vi fikk ikke hentet produktet
        </h1>
        <p className='mx-auto max-w-xl text-base leading-relaxed text-havdyp/74 sm:text-lg'>
          {error.message || 'Prøv igjen om litt, eller gå tilbake til produktene.'}
        </p>
        <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <Button
            type='button'
            onClick={onRetry}
            disabled={isRetrying}
            className='h-12 rounded-full bg-flame-orange px-7 text-background hover:bg-flame-orange/88'
          >
            {isRetrying ? 'Prøver igjen...' : 'Prøv igjen'}
          </Button>
          <Button
            asChild
            variant='outline'
            className='h-12 rounded-full border-havdyp/20 bg-cloud-dancer px-7 text-havdyp hover:bg-ancient-water'
          >
            <Link href='/produkter'>Se alle produkter</Link>
          </Button>
        </div>
      </section>
    </section>
  )
}
