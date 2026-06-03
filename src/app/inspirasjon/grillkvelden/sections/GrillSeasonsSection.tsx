import { Tabs } from './Tabs'

export function GrillSeasonsSection() {
  return (
    <section className='relative isolate overflow-hidden bg-havdyp py-24 text-foreground'>
      <div className='pointer-events-none absolute inset-0 -z-10 opacity-20'>
        <div
          className='grill-seasons-glow-pulse absolute left-1/4 top-1/4 size-[31rem] rounded-full blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--primary) 44%, transparent) 0%, transparent 70%)'
          }}
        />
        <div
          className='grill-seasons-glow-pulse absolute bottom-1/4 right-1/4 size-[31rem] rounded-full blur-3xl'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--mountain-view) 54%, transparent) 0%, transparent 70%)',
            animationDelay: '4s'
          }}
        />
      </div>

      <div className='container mx-auto px-4'>
        <div className='animate-fade-in-up mb-16 text-center'>
          <h2 className='text-foreground'>Grilling i alle sesonger</h2>
          <p className='mx-auto mt-4 max-w-2xl utekos-section-lead text-foreground/88'>
            Hold varmen ved grillen — fra tidlig vår til sen høst.
          </p>
        </div>

        <Tabs />
      </div>
    </section>
  )
}
