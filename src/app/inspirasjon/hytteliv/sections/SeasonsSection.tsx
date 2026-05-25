// SeasonsSection.tsx (Server Component - for hytte-siden)
import { Tabs } from './Tabs'
export function SeasonsSection() {
  return (
    <section className='relative overflow-hidden bg-overcast py-24'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div
          className='hytte-seasons-glow-pulse absolute left-1/4 top-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, var(--mountain-view) 0%, transparent 90%)'
          }}
        />
        <div
          className='hytte-seasons-glow-pulse absolute right-1/4 bottom-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, var(--mountain-view) 0%, transparent 90%)',
            animationDelay: '4s'
          }}
        />
      </div>

      <div className='container mx-auto px-4'>
        <div className='animate-fade-in-up mb-16 text-center'>
          <h2 className='text-maritime-darkest'>Hytteglede i alle sesonger</h2>
          <p className='mx-auto mt-4 utekos-section-lead max-w-2xl text-maritime-darkest'>
            Få varme og ro gjennom alle fire årstider.
          </p>
        </div>
        <Tabs />
      </div>
    </section>
  )
}
