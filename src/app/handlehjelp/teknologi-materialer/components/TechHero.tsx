// Path: src/app/handlehjelp/teknologi-materialer/layout/TechHero.tsx

import { ArrowDown } from 'lucide-react'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'

export function TechHero() {
  return (
    <section className='relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden border-b border-cloud-dancer/5 mb-24 text-center'>
      {/* Bakgrunnseffekter */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ancient-water/20 blur-[120px]' />
        <div className='absolute bottom-0 right-0 h-[400px] w-[400px] translate-y-1/3 rounded-full bg-havdyp/20 blur-[100px]' />
      </div>

      <div className='relative z-10 container mx-auto px-4'>
        <div className='mx-auto max-w-4xl space-y-8 flex flex-col items-center'>
          <BrandBadge
            backgroundColor='rgba(138, 169, 178, 0.1)'
            textColor='oklch(0.8733 0.0246 259.82)'
            className='border border-ancient-water/30 !text-sm !py-2 !px-4'
          >
            Skapt for komfort
          </BrandBadge>

          <h1 className='text-5xl font-bold   text-foreground sm:text-7xl md:text-8xl'>
            Ett plagg. <br />
            <span className='bg-linear-to-r from-ancient-water via-cloud-dancer to-ancient-water bg-clip-text text-transparent opacity-90'>
              Tre opplevelser.
            </span>
          </h1>

          <p className='mx-auto max-w-2xl text-lg leading-relaxed text-foreground/90 md:text-xl'>
            Det unike med Utekos er friheten til å velge. Fra en isolerende kokong til en elegant parkas på
            sekunder. Vi kaller det <strong className='text-foreground'>adaptiv funksjonalitet</strong>.
          </p>
        </div>
      </div>
      <div className='absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-foreground/90'>
        <ArrowDown className='h-6 w-6' />
      </div>
    </section>
  )
}
