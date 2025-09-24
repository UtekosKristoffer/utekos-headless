// Korrekt sti er '@public/special_turkis_doll_widthout.webp'

'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio' // <-- NY IMPORT
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import specialEditionImage from '@public/special_turkis_doll_widthout.webp'
import { motion } from 'framer-motion'
import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '../components/ui/button'

const totalStock = 11
const remainingStock = 11

export function SpecialOfferSection() {
  const stockPercentage = (remainingStock / totalStock) * 100

  return (
    <section className='w-full py-20 sm:py-24'>
      <div className='container mx-auto'>
        <div className='relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 md:p-12'>
          <div
            aria-hidden='true'
            className='absolute -left-1/2 -top-1/2 h-[200%] w-[200%] bg-[radial-gradient(circle_farthest-side,rgba(0,113,227,0.15)_0%,rgba(0,0,0,0)_100%)] opacity-50 z-[-1]'
          />

          <div className='grid grid-cols-1 relative items-center gap-12 lg:grid-cols-2'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className='relative -mx-8 -mt-8 h-auto lg:m-0 flex items-center justify-center'
            >
              <Carousel className='w-full max-w-sm sm:max-w-md md:max-w-lg'>
                <CarouselContent>
                  {/* --- START PÅ ENDRING --- */}
                  <CarouselItem>
                    <div className='p-1'>
                      <AspectRatio
                        ratio={2 / 3}
                        className='bg-transparent rounded-md'
                      >
                        <Image
                          src={specialEditionImage}
                          alt='Utekos Special Edition'
                          fill
                          className='object-contain rounded-md p-4'
                          sizes='(max-width: 1024px) 80vw, 40vw'
                        />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className='p-1'>
                      <AspectRatio ratio={2 / 3} className='rounded-md'>
                        <Image
                          src='/special_bag.webp'
                          alt='Inkludert Utekos-bag'
                          fill
                          className='object-contain rounded-md p-4'
                          sizes='(max-width: 1024px) 80vw, 40vw'
                        />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className='left-2 sm:left-4 border-neutral-700 bg-neutral-800/50 hover:bg-neutral-800 hover:text-white' />
                <CarouselNext className='right-2 sm:right-4 border-neutral-700 bg-neutral-800/50 hover:bg-neutral-800 hover:text-white' />
              </Carousel>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl text-balance'>
                En sjelden mulighet
              </h2>
              <p className='mt-4 text-lg text-neutral-400'>
                Vår utgående Special Edition kommer aldri tilbake. Sikre deg en
                av de aller siste til en eksepsjonell pris.
              </p>
              <div className='mt-8'>
                <p className='text-sm font-medium text-neutral-300'>
                  Kun {remainingStock} igjen på lager!
                </p>
                <div className='mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-800'>
                  <motion.div
                    className='h-full rounded-full bg-sky-500'
                    initial={{ width: '100%' }}
                    whileInView={{ width: `${stockPercentage}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>

              <ul className='mt-8 space-y-3 text-sm text-neutral-300'>
                <li className='flex items-center gap-3'>
                  <CheckIcon className='h-5 w-5 text-sky-400' />
                  <span>
                    <span className='font-semibold text-white'>
                      -53% rabatt
                    </span>{' '}
                    – Nå kun 750,- (før 1490,-)
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <CheckIcon className='h-5 w-5 text-sky-400' />
                  <span>
                    <span className='font-semibold text-white'>
                      Praktisk Utekos-bag
                    </span>{' '}
                    inkludert
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <CheckIcon className='h-5 w-5 text-sky-400' />
                  <span>
                    Kun tilgjengelig i{' '}
                    <span className='font-semibold text-white'>
                      størrelse L
                    </span>
                  </span>
                </li>
              </ul>

              <Link
                href='/produkter/utekos-special-edition'
                className={buttonVariants({
                  size: 'lg',
                  className:
                    'mt-8 w-full sm:w-auto bg-sky-500 text-white hover:bg-sky-600'
                })}
              >
                Sikre deg din før det er for sent
                <ArrowRightIcon className='ml-2 h-4 w-4' />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
