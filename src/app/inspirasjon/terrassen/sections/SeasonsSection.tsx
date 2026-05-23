// Path: src/app/inspirasjon/terrassen/sections/SeasonsSection.tsx

import { Tabs } from './Tabs'

export function SeasonsSection() {
  return (
    <section className='relative isolate overflow-hidden bg-maritime-blue py-24'>
      <div className='pointer-events-none absolute inset-0 -z-10 opacity-20'>
        <div
          className='seasons-glow-pulse absolute left-[8%] top-[14%] size-[31rem] rounded-full blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--primary-button) 44%, transparent) 0%, transparent 70%)'
          }}
        />
        <div
          className='seasons-glow-pulse absolute bottom-[8%] right-[8%] size-[31rem] rounded-full blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 54%, transparent) 0%, transparent 70%)',
            animationDelay: '4s'
          }}
        />
      </div>

      <div className='container mx-auto px-4'>
        <div className='animate-fade-in-up mb-16 text-center'>
          <h2 className='text-3xl font-bold leading-[0.95] font-utekos-text tracking-tight text-cloud-dancer sm:text-4xl lg:text-5xl'>
            Din uteplass gjennom året
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg leading-[1.45] font-utekos-text tracking-tight text-cloud-dancer/88'>
            Forleng sesongen på terrassen
          </p>
        </div>

        <div className='seasons-fade-in-delayed'>
          <Tabs />
        </div>
      </div>
    </section>
  )
}
