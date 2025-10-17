import StapperImage from '@public/kompresjonsbag.webp'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Minimize2,
  Feather,
  ShieldCheck,
  Settings2,
  PackageCheck
} from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'

const iconMap = {
  'minimize-2': Minimize2,
  'feather': Feather,
  'shield-check': ShieldCheck,
  'settings-2': Settings2
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

const features: {
  icon: IconName
  title: string
  description: string
  colorClasses: string
}[] = [
  {
    icon: 'minimize-2',
    title: 'Maksimal plassbesparelse',
    description:
      'Reduserer volumet på klær og soveposer med over 50 %, og frigjør verdifull plass i bagasjen.',
    colorClasses: 'text-sky-400 border-sky-400/20 bg-sky-900/20'
  },
  {
    icon: 'feather',
    title: 'Ultralett design',
    description:
      'Veier kun ca. 100 gram. Du reduserer volum uten å legge til merkbart med vekt i oppakningen.',
    colorClasses: 'text-slate-300 border-slate-300/20 bg-slate-700/20'
  },
  {
    icon: 'shield-check',
    title: 'Slitesterkt materiale',
    description:
      'Laget for å tåle røff behandling på tur. Stram hardt og pakk tett, år etter år.',
    colorClasses: 'text-teal-400 border-teal-400/20 bg-teal-900/20'
  },
  {
    icon: 'settings-2',
    title: 'Enkel og jevn kompresjon',
    description:
      'Fire justerbare strammestropper lar deg enkelt komprimere innholdet jevnt og effektivt.',
    colorClasses: 'text-amber-400 border-amber-400/20 bg-amber-900/20'
  }
]

export function StapperFeatureSection() {
  return (
    <section className='relative overflow-hidden rounded-lg border border-neutral-800 bg-sidebar-foreground py-20 sm:py-32 md:mb-24'>
      {/* Bakgrunns-glød for å skape dybde */}
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10'
        style={{
          background:
            'radial-gradient(circle at 50% 30%, hsla(215, 40%, 20%, 0.3), transparent 70%)'
        }}
      />

      <div className='container mx-auto max-w-4xl px-4 text-center'>
        <AnimatedBlock className='will-animate-fade-in-up'>
          <h2 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
            Mer plass. Mindre stress.
          </h2>
        </AnimatedBlock>

        <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
          <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-access/80'>
            Forvandle voluminøse jakker og soveposer til kompakte pakker. Utekos
            Stapper™ er den smarte løsningen for deg som verdsetter en effektiv
            og organisert bagasje på hytta, i bobilen eller i tursekken.
          </p>
        </AnimatedBlock>

        <AnimatedBlock
          className='will-animate-fade-in-scale'
          delay='0.3s'
          threshold={0.5}
        >
          <div className='relative mx-auto mt-12 h-96 w-64'>
            <div className='absolute inset-0 rounded-full bg-primary/10 blur-3xl' />
            <Image
              src={StapperImage}
              alt='Utekos Stapper kompresjonsbag'
              fill
              className='object-contain'
              sizes='256px'
            />
          </div>
        </AnimatedBlock>

        <div className='mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-10 text-left md:grid-cols-2 lg:gap-y-16'>
          {features.map((feature, index) => (
            <AnimatedBlock
              key={feature.title}
              className='will-animate-fade-in-up relative flex items-start gap-4'
              delay={`${index * 0.1}s`}
            >
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border ${feature.colorClasses}`}
              >
                <IconRenderer name={feature.icon} className='h-6 w-6' />
              </div>
              <div>
                <h3 className='text-base font-semibold leading-7 text-foreground'>
                  {feature.title}
                </h3>
                <p className='mt-1 text-sm leading-6 text-muted-foreground'>
                  {feature.description}
                </p>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock className='will-animate-fade-in-up mt-16'>
          <Button asChild size='lg' className='group'>
            <Link href='/produkter/utekos-stapper'>
              Oppdag Stapper™
              <PackageCheck className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12' />
            </Link>
          </Button>
        </AnimatedBlock>
      </div>
    </section>
  )
}
