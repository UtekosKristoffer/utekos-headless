// Path: src/app/om-oss/Sections/PromiseSection.tsx
import { Handshake, Heart, ShieldCheck } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'

export function PromiseSection() {
  return (
    <section className='relative py-24 sm:py-32 bg-[#1F2421] overflow-hidden'>
      {/* Bakgrunns-atmosfære (Varm peis-glød) */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E07A5F]/10 blur-[120px] rounded-full pointer-events-none' />

      <div className='container mx-auto max-w-4xl px-6 relative z-10'>
        {/* SENTRERT SØYLE */}
        <div className='flex flex-col items-center text-center'>
          {/* 1. IKON / SEGL */}
          <AnimatedBlock className='relative mb-8' delay='0s'>
            <div className='relative flex h-24 w-24 items-center justify-center rounded-full border border-[#E07A5F]/30 bg-[#2C2420] text-[#E07A5F] shadow-[0_0_30px_rgba(224,122,95,0.2)]'>
              <Handshake className='h-10 w-10' strokeWidth={1.5} />
            </div>
            {/* Den gylne tråden som starter under ikonet */}
            <div className='absolute left-1/2 top-full h-16 w-px bg-gradient-to-b from-[#E07A5F]/50 to-transparent -translate-x-1/2' />
          </AnimatedBlock>

          {/* 2. OVERSKRIFT */}
          <AnimatedBlock className='mb-12' delay='0.1s'>
            <h2 className='text-4xl md:text-5xl font-serif text-[#F4F1EA] mb-4'>
              Vårt løfte til deg
            </h2>
            <div className='h-1 w-12 bg-[#E07A5F] mx-auto rounded-full opacity-80' />
          </AnimatedBlock>

          {/* 3. LØFTENE (Kort) */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
            {/* Løfte 1: Følelsen */}
            <AnimatedBlock
              className='group relative flex flex-col items-center p-8 rounded-sm bg-[#2C2420] border border-[#F4F1EA]/5 hover:border-[#E07A5F]/30 transition-all duration-500'
              delay='0.2s'
            >
              <div className='mb-4 p-3 rounded-full bg-[#E07A5F]/10 text-[#E07A5F]'>
                <Heart className='w-6 h-6' />
              </div>
              <p className='text-lg text-[#F4F1EA]/90 font-serif italic mb-2'>
                Mer enn et plagg
              </p>
              <p className='text-[#F4F1EA]/60 leading-relaxed font-light'>
                Vi lover deg følelsen av umiddelbar varme og velvære. En garanti
                for at du kan nyte øyeblikket lenger, uten å fryse.
              </p>
            </AnimatedBlock>

            {/* Løfte 2: Investeringen */}
            <AnimatedBlock
              className='group relative flex flex-col items-center p-8 rounded-sm bg-[#2C2420] border border-[#F4F1EA]/5 hover:border-[#E07A5F]/30 transition-all duration-500'
              delay='0.3s'
            >
              <div className='mb-4 p-3 rounded-full bg-[#E07A5F]/10 text-[#E07A5F]'>
                <ShieldCheck className='w-6 h-6' />
              </div>
              <p className='text-lg text-[#F4F1EA]/90 font-serif italic mb-2'>
                En varig verdi
              </p>
              <p className='text-[#F4F1EA]/60 leading-relaxed font-light'>
                Se på det som en investering i din egen livskvalitet.
                Kompromissløs komfort og overlegen allsidighet, designet for å
                gi deg flere timer utendørs, år etter år.
              </p>
            </AnimatedBlock>
          </div>
        </div>
      </div>
    </section>
  )
}
