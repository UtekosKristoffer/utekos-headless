// Path: src/app/inspirasjon/terrassen/sections/CTASection.tsx

'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Link from 'next/link'

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
            Klar for å oppgradere uteplassen?
          </h2>
          <p className='mx-auto mb-8 max-w-2xl text-xl text-muted-foreground'>
            Invester i komforten som gjør at du kan nyte ditt eget hjem enda
            mer, uansett årstid.
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
