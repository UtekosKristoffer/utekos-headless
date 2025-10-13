import { corePhilosophies } from '@/constants/corePhilosophies'

export function PhilosophiesSection() {
  return (
    <section className='py-24 sm:py-32 bg-sidebar-foreground'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Vår filosofi
          </h2>
          <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'>
            Denne reisen formet fire ufravikelige prinsipper som ligger i
            hjertet av alt vi gjør.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {corePhilosophies.map((item, i) => (
            <div
              key={item.title}
              className='relative overflow-hidden rounded-xl border border-neutral-800 bg-background p-8 text-center'
            >
              <div
                className={`animate-aurora absolute -inset-x-20 -inset-y-20 opacity-20 blur-3xl ${item.color} bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-from)_0%,transparent_50%)]`}
              />
              <div className='relative z-10'>
                <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-sidebar-foreground border border-neutral-700'>
                  <item.icon className='h-6 w-6 text-foreground' />
                </div>
                <h3 className='mt-6 text-xl font-semibold'>{item.title}</h3>
                <p className='mt-2 text-sm text-muted-foreground'>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
