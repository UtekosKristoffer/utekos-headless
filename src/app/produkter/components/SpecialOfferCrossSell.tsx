import { buttonVariants } from '@/components/ui/button'
import { SparklesIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import specialEditionImage from '@public/special/kate.png'

interface SpecialOfferCrossSellProps {
  currentProductHandle: string
}

export function SpecialOfferCrossSell({
  currentProductHandle
}: SpecialOfferCrossSellProps) {
  if (currentProductHandle === 'utekos-special-edition') return null

  return (
    <section className='mt-12' aria-label='Siste sjanse-tilbud'>
      <div className='relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/30 p-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6'>
          <div className='relative h-24 w-24 shrink-0'>
            <Image
              src={specialEditionImage}
              alt='Utekos Special Edition'
              fill
              className='object-contain'
              sizes='96px'
              priority={false}
              loading='lazy'
              fetchPriority='low'
              decoding='async'
              quality={70}
            />
          </div>

          <div className='min-w-0 flex-grow'>
            <h3 className='flex items-center gap-2 font-semibold text-white'>
              <SparklesIcon className='size-5 text-sky-400' />
              Et siste sjanse-kupp!
            </h3>
            <p className='mt-2 max-w-prose text-sm leading-relaxed text-neutral-400'>
              Legg til vår utgående Special Edition for kun{' '}
              <span className='font-bold text-white'>750,-</span>. Kommer aldri
              tilbake.
            </p>
          </div>

          <div className='shrink-0'>
            <Link
              href='/produkter/utekos-special-edition'
              className={buttonVariants({
                variant: 'outline',
                className:
                  'w-full sm:w-auto border-sky-500/50 text-sky-400 hover:border-sky-500 hover:bg-sky-500/10 hover:text-sky-300'
              })}
            >
              Se tilbudet
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
