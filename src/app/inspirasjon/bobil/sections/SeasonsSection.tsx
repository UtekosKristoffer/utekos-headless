// SeasonsSection.tsx (Server Component)
import { Tabs } from './Tabs'

export function SeasonsSection() {
  return (
    <section className='relative overflow-hidden py-24'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div
          className='bobil-seasons-glow-pulse absolute left-1/4 top-1/4 size-[500px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, var(--mountain-view) 0%, transparent 70%)'
          }}
        />
        <div
          className='bobil-seasons-glow-pulse absolute right-1/4 bottom-1/4 size-[500px] blur-3xl'
          style={{
            background:
              'radial-gradient(circle, var(--demitasse) 0%, transparent 70%)',
            animationDelay: '4s'
          }}
        />
      </div>

      <div className='container mx-auto px-4'>
        <div className='animate-fade-in-up mb-16 text-center text-cloud-dancer'>
          <h2 className='font-brand-sans text-3xl font-bold leading-[0.95] tracking-[-0.01em] sm:text-4xl lg:text-5xl'>
            Tips for alle sesonger
          </h2>
          <p className='font-utekos-text mx-auto mt-4 max-w-2xl text-lg leading-[1.5] tracking-tight text-cloud-dancer/90'>
            Utekos følger deg på eventyr hele året
          </p>
        </div>

        <div className='bobil-seasons-fade-in-delayed'>
          <Tabs />
        </div>
      </div>
    </section>
  )
}
