import { cn } from '@/lib/utils/className'
import { Anchor, Car, Home } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'

// Hjelper-komponent for å mappe streng til ikon
const iconMap = {
  home: Home,
  car: Car,
  anchor: Anchor
}
type IconName = keyof typeof iconMap

function IconRenderer({
  name,
  className
}: {
  name: IconName
  className?: string
}) {
  const Icon = iconMap[name]
  return Icon ? <Icon className={className} /> : null
}

const moments: {
  Icon: IconName
  title: string
  description: string
  gradientColor: string
}[] = [
  {
    Icon: 'home',
    title: 'På hytten',
    description:
      'Fra iskald ankomst til umiddelbar varme. Utekos er den perfekte hytteuniformen for de kjølige kveldene på terrassen og den ferske morgenkaffen ute.',
    gradientColor: 'from-blue-500'
  },
  {
    Icon: 'car',
    title: 'I bobilen',
    description:
      'Lett å pakke, genial i bruk. Bytt ut store pledd og ekstra jakker med ett plagg som gjør hvert eneste stopp til en varm og komfortabel opplevelse.',
    gradientColor: 'from-pink-500'
  },
  {
    Icon: 'anchor',
    title: 'I båten',
    description:
      'Nyt solnedgangen fra dekk uten å la den kalde sjøbrisen ødelegge øyeblikket. Den beskytter mot trekk og lar deg forlenge båtkvelden i ren komfort.',
    gradientColor: 'from-green-500'
  }
]

// Gjenbrukbar kort-komponent (nå en ren Server Component)
function MomentCard({
  Icon,
  title,
  description,
  gradientColor
}: {
  Icon: IconName
  title: string
  description: string
  gradientColor: string
}) {
  return (
    <div className='relative h-full overflow-hidden rounded-xl border border-neutral-800 bg-sidebar-foreground p-8'>
      {/* Den animerte "nordlys"-effekten */}
      <div
        className={cn(
          'animate-aurora absolute -inset-x-2 -inset-y-16 opacity-30 blur-2xl',
          'bg-[radial-gradient(120%_120%_at_50%_0%,transparent_30%,_var(--tw-gradient-from)_100%)]',
          gradientColor
        )}
      />

      <div className='relative z-10 flex h-full flex-col'>
        <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background'>
          <IconRenderer name={Icon} className='h-6 w-6 text-foreground' />
        </div>
        <h3 className='mt-6 text-xl font-semibold text-foreground'>{title}</h3>
        <p className='mt-2 text-access/80'>{description}</p>
      </div>
    </div>
  )
}

export function MomentsSection() {
  return (
    <section className='mx-auto max-w-[95%] py-16 sm:py-24 md:max-w-7xl'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Skapt for dine øyeblikk
          </h2>
          <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'>
            Uansett hvor du finner roen, er Utekos designet for å gjøre
            øyeblikket bedre.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {moments.map((moment, i) => (
            <AnimatedBlock
              key={moment.title}
              className='will-animate-fade-in-up h-full'
              delay={`${i * 0.2}s`}
              threshold={0.5}
            >
              <MomentCard {...moment} />
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
