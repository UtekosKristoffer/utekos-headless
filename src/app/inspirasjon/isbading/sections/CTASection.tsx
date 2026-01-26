// Path: src/app/inspirasjon/isbading/sections/CTASection.tsx

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'

export function CTASection() {
  return (
    <section className='relative overflow-hidden py-24'>
      <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10' />
      <div className='container relative mx-auto px-4 text-center'>
        <AnimatedBlock className='will-animate-fade-in-scale'>
          <h2 className='text-fluid-display mb-6 font-bold tracking-tight'>
            Klar for det kalde gys?
          </h2>
          <p className='mx-auto mb-8 max-w-2xl text-xl text-muted-foreground'>
            Ikke la frykten for kulden stoppe deg. Med Utekos er du alltid bare
            sekunder unna varmen.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Button
              asChild
              size='lg'
              className='group gap-2 bg-cyan-600 hover:bg-cyan-700'
            >
              <Link href={'/produkter' as Route}>
                Se isbadeutstyret
                <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href={'/handlehjelp/storrelsesguide' as Route}>
                Finn din størrelse
              </Link>
            </Button>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  )
}
