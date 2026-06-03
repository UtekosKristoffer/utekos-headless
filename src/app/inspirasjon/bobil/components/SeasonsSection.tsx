// SeasonsSection.tsx (Server Component)
import { Tabs } from './Tabs'

export function SeasonsSection() {
  return (
    <section className='relative isolate overflow-hidden bg-havdyp py-24 text-foreground'>
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div
          className='bobil-seasons-glow-pulse absolute left-1/4 top-1/4 size-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, var(--mountain-view) 0%, transparent 70%)'
          }}
        />
        <div
          className='bobil-seasons-glow-pulse absolute right-1/4 bottom-1/4 size-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, var(--demitasse) 0%, transparent 70%)',
            animationDelay: '4s'
          }}
        />
      </div>

      <div className='container mx-auto px-4'>
        <div className='animate-fade-in-up mb-16 text-center text-foreground'>
          <h2 className='text-foreground'>Tips for alle sesonger</h2>
          <p className='mx-auto mt-4 utekos-section-lead max-w-2xl text-foreground'>
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
