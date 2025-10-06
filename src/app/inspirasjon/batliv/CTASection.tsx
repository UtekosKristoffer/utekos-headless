import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'

export function CTASection() {
  return (
    <section className='relative overflow-hidden py-24'>
      <div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10' />
      <div className='container relative mx-auto px-4 text-center'>
        <AnimatedBlock className='will-animate-fade-in-scale'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-6'>
            Klar for å kaste loss?
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
            Bli en av de mange båteierne som har oppdaget hemmeligheten bak en
            varmere og lengre sesong på sjøen.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Button asChild size='lg' className='group gap-2'>
              <Link href={'/produkter' as Route}>
                Se alle produkter
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
