// Path: src/app/inspirasjon/bobil/sections/BobilClientComponents.tsx

'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function BobilHeroSection() {
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
            <span>Bobilliv</span>
          </div>

          <h1 className='text-fluid-display font-bold tracking-tight'>
            Bobilliv uten <span className='text-primary'>kompromisser</span>
          </h1>

          <p className='mt-6 max-w-2xl text-xl text-muted-foreground'>
            Fra den første morgenkaffen til de sene kveldene rundt bordet.
            Oppdag hvordan Utekos forvandler hver stopp til en destinasjon verdt
            å huske.
          </p>

          <div className='mt-8 flex flex-wrap gap-4'>
            <Button asChild size='lg'>
              <Link href='/produkter'>
                Se produktene
                <ArrowRightIcon className='ml-2 size-4' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='#bruksomrader'>Utforsk mulighetene</Link>
            </Button>
          </div>

          <div className='mt-12 flex flex-wrap gap-8'>
            <div>
              <p className='text-3xl font-bold text-teal-400'>87%</p>
              <p className='text-sm text-muted-foreground'>
                bruker bobilen oftere
              </p>
            </div>
            <div>
              <p className='text-3xl font-bold text-yellow-400'>+2 mnd</p>
              <p className='text-sm text-muted-foreground'>lengre sesong</p>
            </div>
            <div>
              <p className='text-3xl font-bold text-fuchsia-400'>5★</p>
              <p className='text-sm text-muted-foreground'>
                fra bobilentusiaster
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
