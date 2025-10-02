'use client'

import { buttonVariants } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { SparklesIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import specialEditionImage from '@public/special_turkis_doll_widthout.webp'

interface SpecialOfferCrossSellProps {
  currentProductHandle: string
}

export function SpecialOfferCrossSell({
  currentProductHandle
}: SpecialOfferCrossSellProps) {
  if (currentProductHandle === 'utekos-special-edition') {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.5 }}
      className='mt-12'
    >
      <div className='relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/30 p-6'>
        <div className='flex flex-col sm:flex-row sm:items-center gap-6'>
          {/* Bilde */}
          <div className='relative h-24 w-24 flex-shrink-0'>
            <Image
              src={specialEditionImage}
              alt='Utekos Special Edition'
              fill
              className='object-contain'
              sizes='96px'
            />
          </div>

          {/* Tekst og Knapp */}
          <div className='flex-grow'>
            <h3 className='flex items-center gap-2 font-semibold text-white'>
              <SparklesIcon className='size-5 text-sky-400' />
              Et siste sjanse-kupp!
            </h3>
            <p className='mt-2 text-sm text-neutral-400'>
              Legg til vår utgående Special Edition for kun{' '}
              <span className='font-bold text-white'>750,-</span>. Kommer aldri
              tilbake.
            </p>
          </div>

          {/* CTA Knapp */}
          <div className='flex-shrink-0'>
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
    </motion.div>
  )
}
