// Path: src/app/produkter/(oversikt)/components/MicrofiberSection/MikrofiberSection.tsx

import { MikrofiberImageSection } from './MikrofiberImageSection'
import { MikrofiberContentColumn } from './MikrofiberContentColumn'

export async function MikrofiberSection() {
  return (
    <section className='mx-auto w-full py-20 sm:py-24'>
      <div className='container mx-auto px-4'>
        <div className='relative overflow-hidden rounded-[1.75rem] border border-maritime-darkest/10 bg-overcast p-5 shadow-[0_28px_90px_-62px_color-mix(in_oklch,var(--maritime-darkest)_72%,transparent)] sm:p-8 lg:p-12'>
          <div className='pointer-events-none absolute inset-0 opacity-70'>
            <div
              className='absolute -left-20 top-0 size-[34rem] rounded-full blur-3xl'
              style={{
                background:
                  'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 58%, transparent) 0%, transparent 70%)'
              }}
            />
            <div
              className='absolute -right-24 bottom-0 size-[34rem] rounded-full blur-3xl'
              style={{
                background:
                  'radial-gradient(circle, color-mix(in oklch, var(--mountain-view) 34%, transparent) 0%, transparent 72%)'
              }}
            />
            <div
              className='absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl'
              style={{
                background:
                  'radial-gradient(circle, color-mix(in oklch, var(--cloud-dancer) 32%, transparent) 0%, transparent 74%)'
              }}
            />
          </div>

          <div className='relative z-10 grid grid-cols-1 gap-8 rounded-2xl lg:grid-cols-2 lg:items-stretch lg:gap-12'>
            <MikrofiberImageSection />
            <MikrofiberContentColumn />
          </div>
        </div>
      </div>
    </section>
  )
}
