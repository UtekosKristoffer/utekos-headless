'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function TerraceHeroSection() {
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
          <h1 className='text-fluid-display font-bold tracking-tight'>
            Din terrasse, <span className='text-primary'>hele året</span>
          </h1>

          <p className='mt-6 max-w-2xl text-xl text-muted-foreground'>
            Gjør uteplassen til husets beste rom. Fra den første kaffen i
            vårsolen til de sene sommerkveldene – nyt øyeblikkene lenger.
          </p>

          <div className='mt-8 flex flex-wrap gap-4'>
            <Button asChild size='lg'>
              <Link href='/produkter'>
                Oppdag din Utekos
                <ArrowRightIcon className='ml-2 size-4' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='#bruksomrader'>Se bruksområdene</Link>
            </Button>
          </div>

          <div className='mt-12 flex flex-wrap gap-8'>
            <div>
              <p className='text-3xl font-bold text-emerald-400'>2x</p>
              <p className='text-sm text-muted-foreground'>
                mer bruk av uteplassen
              </p>
            </div>
            <div>
              <p className='text-3xl font-bold text-amber-400'>+100</p>
              <p className='text-sm text-muted-foreground'>
                dager med utekos i året
              </p>
            </div>
            <div>
              <p className='text-3xl font-bold text-rose-400'>5★</p>
              <p className='text-sm text-muted-foreground'>fra huseiere</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
