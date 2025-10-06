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
          <h2 className='text-fluid-display mb-6 font-bold tracking-tight'>
            Klar for din ultimate hytteopplevelse?
          </h2>
          <p className='mx-auto mb-8 max-w-2xl text-xl text-muted-foreground'>
            Bli en del av de som vet hvordan man skaper ekte hyttekos – uansett
            hvor kaldt det er utenfor.
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
