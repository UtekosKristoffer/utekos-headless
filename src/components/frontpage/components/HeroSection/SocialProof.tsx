// Path: src/components/frontpage/SocialProof.tsx
import { KlarnaLogo } from '@/components/logo/payments/KlarnaLogo'
import { VippsLogo } from '@/components/logo/payments/VippsLogo'

export function SocialProof() {
  return (
    <div className='animate-fade-in-up mx-auto max-w-4xl'>
      <div className='grid grid-cols-1 gap-6 text-center md:grid-cols-3'>
        <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700'>
          <div className='absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          <div className='relative'>
            <p className='text-xl font-bold text-foreground'>Rask levering</p>
            <p className='mt-1 text-sm text-muted-foreground'>2-5 dager</p>
          </div>
        </div>

        <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700'>
          <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          <div className='relative'>
            <p className='text-xl font-bold text-foreground'>2000+</p>
            <p className='mt-1 text-sm text-muted-foreground'>
              Fornøyde kunder
            </p>
          </div>
        </div>

        <div className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700'>
          <div className='absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          <div className='relative'>
            <span className='text-xl font-bold'>Trygg handel</span>
            <div className='mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2'>
              <VippsLogo className='h-6 w-auto' />
              <KlarnaLogo className='h-6 w-auto' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
