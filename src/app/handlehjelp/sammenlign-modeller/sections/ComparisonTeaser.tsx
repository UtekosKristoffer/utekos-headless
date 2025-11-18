import { Button } from '@/components/ui/button'
import { ArrowRightIcon, Droplets, Feather, Layers } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
export function ComparisonTeaser() {
  return (
    <section className='mb-24'>
      <AnimatedBlock
        className='will-animate-fade-in-up'
        delay='0s'
        threshold={0.3}
      >
        <div className='rounded-lg border border-neutral-800 bg-sidebar-foreground shadow-sm'>
          <div className='p-8 text-center md:p-12'>
            <h2 className='text-3xl font-bold tracking-tight'>
              Usikker på hvilken Utekos du skal velge?
            </h2>
            <p className='mx-auto mt-4 max-w-2xl text-access/80'>
              Våre tre Utekos-modeller gir deg kompromissløs komfort, men har
              unike styrker. Få en rask oversikt her, eller dykk ned i detaljene
              i vår komplette guide.
            </p>
            <div className='mt-8 grid grid-cols-1 gap-6 text-left md:grid-cols-3'>
              <div className='rounded-lg border border-neutral-700 bg-background p-6'>
                <div className='flex items-center gap-3'>
                  <Feather className='h-6 w-6 text-violet-400' />
                  <h3 className='text-lg font-semibold'>Utekos Dun™</h3>
                </div>
                <p className='mt-2 text-sm text-access/80'>
                  Kvalitetsdun og innovative løsninger for funksjonell varme.
                </p>
              </div>

              <div className='rounded-lg border border-neutral-700 bg-background p-6'>
                <div className='flex items-center gap-3'>
                  <Droplets className='h-6 w-6 text-cyan-400' />
                  <h3 className='text-lg font-semibold'>Utekos TechDown™</h3>
                </div>
                <p className='mt-2 text-sm text-access/80'>
                  Vår varmeste og mest allsidige modell.
                </p>
              </div>
              <div className='rounded-lg border border-neutral-700 bg-background p-6'>
                <div className='flex items-center gap-3'>
                  <Layers className='h-6 w-6 text-emerald-400' />
                  <h3 className='text-lg font-semibold'>Utekos Mikrofiber™</h3>
                </div>
                <p className='mt-2 text-sm text-access/80'>
                  Det letteste medlemmet i Utekos-serien. Bygget for maksimal
                  allsidighet.
                </p>
              </div>
            </div>
            <Button asChild size='lg' className='mt-10'>
              <Link href='/handlehjelp/sammenlign-modeller'>
                Se full sammenligning
                <ArrowRightIcon className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedBlock>
    </section>
  )
}
