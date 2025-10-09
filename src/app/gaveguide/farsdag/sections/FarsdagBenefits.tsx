import { Home, Caravan, Flame, ShieldCheck } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

type Benefit = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  title: string
  description: string
  color: string
}

const benefits: Benefit[] = [
  {
    icon: Home,
    title: 'Elsker hyttelivet',
    description:
      'For den kalde morgenkaffen på terrassen, eller når han ankommer en kald hytte og trenger varme umiddelbart.',
    color: 'text-green-500' // Assosiasjon: Natur, skog
  },
  {
    icon: Caravan,
    title: 'Trives i bobilen eller båten',
    description:
      'En trofast følgesvenn på kjølige kvelder i havna eller på campingplassen, som lar ham nyte utelivet lenger.',
    color: 'text-sky-500' // Assosiasjon: Himmel, vann
  },
  {
    icon: Flame,
    title: 'Er sjefen ved bålpannen',
    description:
      'Gir ham full bevegelsesfrihet og komfort, slik at han kan fokusere på å skape sosial hygge og god stemning.',
    color: 'text-orange-500' // Assosiasjon: Ild, varme
  },
  {
    icon: ShieldCheck,
    title: 'Setter pris på kvalitet',
    description:
      'Dette er ikke en gave som blir glemt. Det er et funksjonelt og varig kvalitetsplagg han vil bruke igjen og igjen.',
    color: 'text-amber-500' // Assosiasjon: Kvalitet, verdi (gull)
  }
]

export function FarsdagBenefits() {
  return (
    <section className='flex w-full flex-col items-center border-b border-neutral-800 bg-background'>
      <div className='w-full max-w-7xl px-6 py-16 lg:px-8 sm:py-24'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl'>
            En gave som passer perfekt til pappaen som...
          </h2>
        </div>
        <div className='mx-auto mt-16 max-w-none'>
          <dl className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16'>
            {benefits.map(benefit => (
              <div key={benefit.title} className='flex items-start gap-x-4'>
                <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center'>
                  <benefit.icon
                    className={`h-8 w-8 ${benefit.color}`}
                    aria-hidden='true'
                  />
                </div>
                <div>
                  <dt className='font-semibold text-primary-foreground'>
                    {benefit.title}
                  </dt>
                  <dd className='mt-1 text-base leading-7 text-muted-foreground'>
                    {benefit.description}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
