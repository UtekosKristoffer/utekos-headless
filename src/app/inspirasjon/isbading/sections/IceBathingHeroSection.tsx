// Path: src/app/inspirasjon/isbading/sections/IceBathingHeroSection.tsx

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'

export function IceBathingHeroSection() {
  return (
    <section className='relative min-h-[85vh] overflow-hidden flex flex-col justify-center'>
      <div className='absolute inset-0 select-none'>
        <Image
          src='/comfyrobe/comfy-isbading-1080.png'
          alt='Isbader som nyter varmen i Comfyrobe - mobil'
          fill
          className='object-cover md:hidden'
          priority
        />

        <Image
          src='/comfyrobe/comfy-isbading-1080-master.png'
          alt='Isbader som nyter varmen i Comfyrobe - desktop'
          fill
          className='hidden object-cover md:block'
          priority
        />

        <div className='absolute inset-0 bg-black/60' />
      </div>

      <div className='container relative z-10 mx-auto px-4 py-24 text-center'>
        <div className='mx-auto max-w-4xl'>
          <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
            <h1 className='text-fluid-display font-bold tracking-tight text-white drop-shadow-sm'>
              Det kalde gys -{' '}
              <span className='block text-cyan-200 sm:inline'>
                den varme belønningen
              </span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up' delay='0.3s'>
            <p className='mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-neutral-100 drop-shadow-sm'>
              Mestringsfølelsen etter et isbad er unik. Men turen tilbake til
              bilen trenger ikke være en kamp. Gjør overgangen fra null grader
              til full komfort umiddelbar.
            </p>
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-up mt-10 flex flex-wrap justify-center gap-4'
            delay='0.4s'
          >
            <Button
              asChild
              size='lg'
              className='group min-w-[200px] border-none bg-white text-neutral-900 hover:bg-neutral-100'
            >
              <Link href={'/produkter/comfyrobe' as Route}>
                Kle deg for kulden
                <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
