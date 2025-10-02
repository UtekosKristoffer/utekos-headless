'use client'

import { ArrowRightIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className='relative overflow-hidden py-24'>
      <div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10' />
      <div className='container relative mx-auto px-4 text-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className='text-fluid-display mb-6 font-bold tracking-tight'>
            Klar for din ultimate hytteopplevelse?
          </h2>
          <p className='mx-auto mb-8 max-w-2xl text-xl text-muted-foreground'>
            Bli en del av de som vet hvordan man skaper ekte hyttekos – uansett
            hvor kaldt det er utenfor.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Button asChild size='lg' className='gap-2'>
              <Link href='/produkter'>
                Se alle produkter
                <ArrowRightIcon className='size-4' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='/handlehjelp/storrelsesguide'>
                Finn din størrelse
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
