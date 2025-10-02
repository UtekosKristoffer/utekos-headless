// Path: src/app/inspirasjon/grillkvelden/GrillClientComponents.tsx

'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Link from 'next/link'
export function GrillHeroSection() {
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
            Grillkvelden som{' '}
            <span className='text-primary'>aldri tar slutt</span>
          </h1>

          <p className='mt-6 max-w-2xl text-xl text-muted-foreground'>
            Bli verten for de uforglemmelige kveldene, der de gode samtalene og
            latteren fortsetter lenge etter at den siste pølsen er grillet.
          </p>

          <div className='mt-8 flex flex-wrap gap-4'>
            <Button asChild size='lg'>
              <Link href='/produkter'>
                Bli klar for kvelden
                <ArrowRightIcon className='ml-2 size-4' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='#bruksomrader'>Se øyeblikkene</Link>
            </Button>
          </div>

          {/* 
            <div className='mt-12 flex flex-wrap gap-8'>
            <div>
              <p className='text-3xl font-bold text-orange-400'>+2t</p>
              <p className='text-sm text-muted-foreground'>ekstra utekos</p>
            </div>
            <div>
              <p className='text-3xl font-bold text-emerald-400'>100%</p>
              <p className='text-sm text-muted-foreground'>fornøyde gjester</p>
            </div>
            <div>
              <p className='text-3xl font-bold text-rose-400'>5★</p>
              <p className='text-sm text-muted-foreground'>fra grillmestere</p>
            </div>
            </div>
            */}
        </motion.div>
      </div>
    </section>
  )
}
