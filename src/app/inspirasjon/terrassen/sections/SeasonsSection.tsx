import { Tabs } from './Tabs'

export function SeasonsSection() {
  return (
    <section className='relative py-24 overflow-hidden'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div
          className='seasons-glow-pulse absolute left-1/4 top-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)'
          }}
        />
        <div
          className='seasons-glow-pulse absolute right-1/4 bottom-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
            animationDelay: '4s'
          }}
        />
      </div>

      <div className='container mx-auto px-4'>
        <div className='animate-fade-in-up mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
            Din uteplass gjennom året
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
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
