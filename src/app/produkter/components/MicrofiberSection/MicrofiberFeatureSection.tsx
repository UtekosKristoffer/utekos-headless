import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  CloudDrizzle,
  Feather,
  Sparkles,
  ThermometerSun,
  Mountain,
  WashingMachine,
  Award,
  type LucideProps
} from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'

// Hjelper-komponent for å mappe streng til ikon
const iconMap = {
  'cloud-drizzle': CloudDrizzle,
  'washing-machine': WashingMachine,
  'feather': Feather,
  'thermometer-sun': ThermometerSun,
  'mountain': Mountain,
  'award': Award
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
  return Icon ? <Icon className={className} aria-hidden='true' /> : null
}

const microfiberAdvantages: {
  icon: IconName
  title: string
  description: string
  color: string
}[] = [
  {
    icon: 'cloud-drizzle',
    title: 'Overlegen i fuktig Vær',
    description: 'Beholder isolasjonsevnen og varmen selv når den blir våt.',
    color: 'text-sky-800'
  },
  {
    icon: 'washing-machine',
    title: 'Enkelt vedlikehold',
    description:
      'Tørker raskt og er enkel å vaske uten å bekymre seg for klumping.',
    color: 'text-slate-200'
  },
  {
    icon: 'feather',
    title: 'Allergivennlig og vegansk',
    description: 'Et 100 % dunfritt alternativ som er trygt for alle.',
    color: 'text-teal-400'
  }
]

const downAdvantages: {
  icon: IconName
  title: string
  description: string
  color: string
}[] = [
  {
    icon: 'thermometer-sun',
    title: 'Uslåelig varme-til-vekt',
    description: 'Gir maksimal varme med minimal vekt og pakkvolum.',
    color: 'text-orange-400'
  },
  {
    icon: 'mountain',
    title: 'Ekstrem komprimerbarhet',
    description:
      'Kan pakkes ned til en utrolig liten størrelse i tørre forhold.',
    color: 'text-slate-300'
  },
  {
    icon: 'award',
    title: 'Luksuriøs følelse',
    description: 'Den lette, luftige og naturlige følelsen av premium dun.',
    color: 'text-purple-300'
  }
]

export function MicrofiberFeatureSection() {
  return (
    <section className='mx-auto rounded-lg border border-neutral-800 bg-sidebar-foreground py-20 sm:py-32 md:mb-24'>
      <div className='container mx-auto max-w-7xl px-4 text-center'>
        <AnimatedBlock className='will-animate-fade-in-up'>
          <h2 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
            Mikrofiber eller Dun?
          </h2>
        </AnimatedBlock>
        <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
          <p className='mx-auto mt-6 max-w-3xl text-lg leading-8 text-access/80'>
            Velg riktig varme for ditt eventyr. Mens dun er uslåelig på vekt, er
            Utekos Mikrofiber™ den robuste og bekymringsfrie partneren for det
            ustabile norske klimaet.
          </p>
        </AnimatedBlock>

        <div className='mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-3 lg:gap-8'>
          {/* Mikrofiber Fordeler */}
          <div className='flex flex-col gap-8'>
            {microfiberAdvantages.map((advantage, index) => (
              <AnimatedBlock
                key={advantage.title}
                className='will-animate-fade-in-left'
                delay={`${0.3 + index * 0.1}s`}
              >
                <div className='flex items-start gap-4 text-left'>
                  <IconRenderer
                    name={advantage.icon}
                    className={`h-8 w-8 flex-shrink-0 ${advantage.color}`}
                  />
                  <div>
                    <h3 className='font-semibold text-foreground'>
                      {advantage.title}
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {advantage.description}
                    </p>
                  </div>
                </div>
              </AnimatedBlock>
            ))}
          </div>

          {/* Bilde */}
          <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
            <div className='relative w-full aspect-[2/3]'>
              <Image
                src='/black_back_without95.webp'
                alt='Utekos Mikrofiber klar for alle værforhold'
                fill
                className='rounded-2xl object-cover shadow-2xl'
                sizes='(max-width: 1024px) 80vw, 30vw'
              />
            </div>
          </AnimatedBlock>

          {/* Dun Fordeler */}
          <div className='flex flex-col gap-8'>
            {downAdvantages.map((advantage, index) => (
              <AnimatedBlock
                key={advantage.title}
                className='will-animate-fade-in-right'
                delay={`${0.3 + index * 0.1}s`}
              >
                <div className='flex items-start gap-4 text-left lg:flex-row-reverse lg:text-right'>
                  <IconRenderer
                    name={advantage.icon}
                    className={`h-8 w-8 flex-shrink-0 ${advantage.color}`}
                  />
                  <div>
                    <h3 className='font-semibold text-foreground'>
                      {advantage.title}
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {advantage.description}
                    </p>
                  </div>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>

        <AnimatedBlock
          className='will-animate-fade-in-up mt-16 flex flex-col items-center gap-6'
          delay='0.6s'
        >
          <p className='text-4xl font-bold text-foreground'>1 290,00 kr</p>
          <Button asChild size='lg' className='group w-full sm:w-auto'>
            <Link href='/produkter/utekos-mikrofiber'>
              Velg bekymringsfri varme
              <Sparkles className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-125' />
            </Link>
          </Button>
        </AnimatedBlock>
      </div>
    </section>
  )
}
