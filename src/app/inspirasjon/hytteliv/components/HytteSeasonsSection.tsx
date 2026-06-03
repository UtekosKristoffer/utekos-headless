// SeasonsSection.tsx (Server Component - for hytte-siden)

import { Tabs } from './Tabs'
export function HytteSeasonsSection() {
  return (
    <section className='relative overflow-hidden bg-overcast py-24'>
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div className='hytte-seasons-glow-pulse hytte-seasons-glow-bg absolute left-1/4 top-1/4 h-[500px] w-[500px] blur-3xl' />
        <div className='hytte-seasons-glow-pulse hytte-seasons-glow-bg hytte-seasons-glow-delay absolute right-1/4 bottom-1/4 h-[500px] w-[500px] blur-3xl' />
      </div>

      <div className='container mx-auto px-4'>
        <div className='animate-fade-in-up mb-16 text-center'>
          <h2 className='text-background'>Hytteglede i alle sesonger</h2>
          <p className='mx-auto mt-4 utekos-section-lead max-w-2xl text-background'>
            Få varme og ro gjennom alle fire årstider.
          </p>
        </div>
        <Tabs />
      </div>
    </section>
  )
}
