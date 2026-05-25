// Path: src/app/om-oss/Sections/PromiseSection.tsx
import { Handshake, Heart, ShieldCheck } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'

export function PromiseSection() {
  return (
    <section className='relative isolate overflow-hidden bg-maritime-darkest py-24 sm:py-32'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--dusted-peri)_24%,transparent)_0%,transparent_70%)] blur-[120px]' />
        <div className='absolute bottom-0 left-[12%] size-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ancient-water)_18%,transparent)_0%,transparent_72%)] blur-3xl' />
      </div>

      <div className='container relative z-10 mx-auto max-w-4xl px-6'>
        <div className='flex flex-col items-center text-center'>
          <AnimatedBlock className='mb-6 will-animate-fade-in-up' delay='0s'>
            <BrandBadge
              label='Vårt løfte'
              backgroundColor='var(--dusted-peri)'
              textColor='var(--maritime-darkest)'
              className='shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--dusted-peri)_80%,transparent)]'
            />
          </AnimatedBlock>

          <AnimatedBlock className='relative mb-8' delay='0s'>
            <div className='relative flex size-24 items-center justify-center rounded-full border border-cloud-dancer/14 bg-cloud-dancer text-maritime-darkest shadow-[0_24px_70px_-42px_color-mix(in_oklab,var(--cloud-dancer)_70%,transparent)]'>
              <Handshake className='size-10' strokeWidth={1.5} />
            </div>
            <div className='absolute left-1/2 top-full h-16 w-px -translate-x-1/2 bg-gradient-to-b from-dusted-peri/60 to-transparent' />
          </AnimatedBlock>

          <AnimatedBlock className='mb-12' delay='0.1s'>
            <h2 className='mb-5 text-4xl leading-[0.95] font-bold tracking-tight text-cloud-dancer md:text-5xl'>
              Vårt løfte til deg
            </h2>
            <p className='mx-auto max-w-2xl text-xl leading-[1.45] tracking-tight text-cloud-dancer/85'>
              Komforten skal merkes med en gang, og kvaliteten skal fortsette å
              bære øyeblikkene ute.
            </p>
          </AnimatedBlock>

          <div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2'>
            <AnimatedBlock
              className='group relative flex flex-col items-center rounded-[1.75rem] border border-ancient-water/18 bg-[color-mix(in_oklab,var(--cloud-dancer)_92%,var(--ancient-water))] p-8 shadow-[0_24px_70px_-48px_color-mix(in_oklab,var(--maritime-darkest)_55%,transparent)] transition-all duration-500 hover:-translate-y-1 hover:border-dusted-peri/38'
              delay='0.2s'
            >
              <div className='mb-5 rounded-full border border-maritime-blue/14 bg-maritime-blue p-4 text-cloud-dancer transition-transform duration-300 group-hover:scale-105'>
                <Heart className='size-6' strokeWidth={1.6} />
              </div>
              <h3 className='mb-3 text-xl leading-[1] font-semibold font-google-sans tracking-tight text-maritime-darkest'>
                Mer enn et plagg
              </h3>
              <p className='text-lg leading-[1.45] font-utekos-text tracking-tight text-maritime-darkest'>
                Vi lover deg følelsen av umiddelbar varme og velvære. En garanti
                for at du kan nyte øyeblikket lenger, uten å fryse.
              </p>
            </AnimatedBlock>

            <AnimatedBlock
              className='group relative flex flex-col items-center rounded-[1.75rem] border border-ancient-water/18 bg-[color-mix(in_oklab,var(--cloud-dancer)_92%,var(--ancient-water))] p-8 shadow-[0_24px_70px_-48px_color-mix(in_oklab,var(--maritime-darkest)_55%,transparent)] transition-all duration-500 hover:-translate-y-1 hover:border-dusted-peri/38'
              delay='0.3s'
            >
              <div className='mb-5 rounded-full border border-maritime-blue/14 bg-maritime-darkest p-4 text-cloud-dancer transition-transform duration-300 group-hover:scale-105'>
                <ShieldCheck className='size-6' strokeWidth={1.6} />
              </div>
              <h3 className='mb-3 text-xl leading-[1] font-semibold tracking-tight text-maritime-darkest'>
                En varig verdi
              </h3>
              <p className='text-lg leading-[1.45] font-utekos-text tracking-tight text-maritime-darkest'>
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
