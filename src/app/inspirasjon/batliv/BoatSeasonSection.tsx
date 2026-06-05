// BoatSeasonSection.tsx (Server Component)
import { Tabs } from './Tabs'

export function BoatSeasonSection() {
  return (
    <section className='relative py-24 overflow-hidden'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div
          className='boat-seasons-glow-pulse absolute left-1/4 top-1/4 h-125 w-125 blur-3xl'
          style={{
            background: 'radial-gradient(circle, var(--ancient-water) 0%, transparent 70%)'
          }}
        />
        <div
          className='boat-seasons-glow-pulse absolute right-1/4 bottom-1/4 h-125 w-125 blur-3xl'
          style={{
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            animationDelay: '4s'
          }}
        />
      </div>

      <div className='container mx-auto px-4'>
        <div className='animate-fade-in-up mb-16 text-center'>
          <h2 className='text-background mx-auto max-w-3xl'>Tips for en lengre sesong</h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-background'>
            Nyt båtlivet fra tidlig vår til sen høst
          </p>
        </div>

        <div className='boat-seasons-fade-in-delayed'>
          <Tabs />
        </div>
      </div>
    </section>
  )
}
