// Path: src/app/inspirasjon/hytteliv/CabinClientComponents.tsx

'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function CabinHeroSection() {
  return (
    <section className='relative flex min-h-[70vh] items-center'>
      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />
      <div className='container relative mx-auto px-4 py-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='max-w-3xl'
        >
          <div className='mb-6 flex items-center gap-2 text-sm text-muted-foreground'>
            <Link
              href='/inspirasjon'
              className='transition-colors hover:text-foreground'
            >
              Inspirasjon
            </Link>
            <span>/</span>
            <span>Hytteliv</span>
          </div>

          <h1 className='text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
            Hyttekos, <span className='text-primary'>perfeksjonert</span>
          </h1>

          <p className='mt-6 max-w-2xl text-xl text-muted-foreground'>
            Fra den krystallklare morgenluften på terrassen, til de magiske
            kveldene under stjernene. Gjør hytten til et fristed for komfort,
            uansett årstid.
          </p>

          <div className='mt-8 flex flex-wrap gap-4'>
            <Button asChild size='lg'>
              <Link href='/produkter'>
                Finn din Utekos
                <ArrowRightIcon className='ml-2 size-4' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='#bruksomrader'>Se bruksområdene</Link>
            </Button>
          </div>

          <div className='mt-12 flex flex-wrap gap-8'>
            <div>
              <p className='text-3xl font-bold text-cyan-400'>9/10</p>
              <p className='text-sm text-muted-foreground'>
                forlenger utekosen
              </p>
            </div>
            <div>
              <p className='text-3xl font-bold text-lime-400'>+3 mnd</p>
              <p className='text-sm text-muted-foreground'>
                lengre terrassesesong
              </p>
            </div>
            <div>
              <p className='text-3xl font-bold text-violet-400'>5★</p>
              <p className='text-sm text-muted-foreground'>
                fra hytteentusiaster
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
