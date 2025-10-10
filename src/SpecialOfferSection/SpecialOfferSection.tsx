import { SpecialOfferImageSection } from './SpecialOfferImageSection'
import { SpecialOfferContentColumn } from './SpecialOfferContentColumn'

export function SpecialOfferSection() {
  return (
    <section className='mx-auto max-w-[95%] py-20 sm:py-24 md:max-w-7xl'>
      <div className='container mx-auto'>
        <div className='relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 md:p-12'>
          {/* Ambient background glow */}
          <div className='absolute inset-0 -z-10 overflow-hidden'>
            <div
              className='absolute left-1/4 top-1/4 h-[600px] w-[600px] opacity-20 blur-3xl'
              style={{
                background:
                  'radial-gradient(circle, #06b6d4 0%, transparent 70%)' // Cyan
              }}
            />
            <div
              className='absolute right-1/4 bottom-1/4 h-[600px] w-[600px] opacity-15 blur-3xl'
              style={{
                background:
                  'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
              }}
            />
          </div>
          <div className='grid grid-cols-1 relative rounded-2xl items-center gap-12 lg:grid-cols-2'>
            <SpecialOfferImageSection />
            <SpecialOfferContentColumn />
          </div>
        </div>
      </div>
    </section>
  )
}
