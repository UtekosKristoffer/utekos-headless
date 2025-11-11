// Path: src/app/produkter/components/MicrofiberSection/MicrofiberFathersDaySection.tsx

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Gift, FlameKindling, GiftIcon, WashingMachine } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType } from 'embla-carousel'

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
}

const ImageCarousel: React.FC<PropType> = props => {
  const { slides, options } = props
  const [emblaRef] = useEmblaCarousel(options)

  return (
    <div className='embla rounded-xl overflow-hidden shadow-2xl' ref={emblaRef}>
      <div className='embla__container'>
        {slides.map((src, index) => (
          <div className='embla__slide' key={index}>
            <div className='relative aspect-[2/3] w-full'>
              <Image
                src={src}
                alt={`Utekos Mikrofiber bilde ${index + 1}`}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 90vw, 45vw'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const iconMap = {
  'gift': Gift,
  'flame-kindling': FlameKindling,
  'washing-machine': WashingMachine
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

const fathersDayAdvantages: {
  icon: IconName
  title: string
  description: string
  color: string
}[] = [
  {
    icon: 'gift',
    title: '3-i-1: Gaven som passer til alt',
    description:
      'Bruk som parkas, fest den opp for aktivitet, eller dekk hele kroppen for maksimal varme på terrassen.',
    color: 'text-sky-400'
  },
  {
    icon: 'flame-kindling',
    title: 'Bygget for norsk utehygge',
    description:
      'Flammehemmende og vannavvisende. Tåler gnister fra bålpannen og holder ham varm i fuktig vær.',
    color: 'text-orange-400'
  },
  {
    icon: 'washing-machine',
    title: 'Varm og bekymringsfri',
    description:
      'Følelsen av dun, men tørker raskt, er allergivennlig og kan vaskes i maskin. Enkel å elske.',
    color: 'text-teal-300'
  }
]

export function MicrofiberFathersDaySection() {
  const variant1Images = [
    '/Soveposejakke_Black_1.png',
    '/farsdag/utekos-vargnatt-front-parkas.png',
    '/farsdag/utekos-vargnatt-halv-front.png',
    '/black_back_without95.webp'
  ]
  const variant2Images = [
    '/farsdag/utekos-fjellbla-front-u-bakgrunn.png',
    '/farsdag/utekos-fjellbla-parkas-u-bakgrunn-4.png',
    '/farsdag/utekos-fjellbla-halv-u-bakgrunn-4.png',
    '/farsdag/utekos-fjellbla-bak-u-bakgrunn-4.png'
  ]
  return (
    <section className='mx-auto rounded-lg border border-neutral-800 bg-sidebar-foreground mt-12 py-20 sm:py-32 md:mb-24'>
      <div className='container mx-auto max-w-7xl px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <AnimatedBlock className='will-animate-fade-in-up'>
            <h2 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
              Årets beste farsdagsgave?
            </h2>
          </AnimatedBlock>
          <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
            <p className='mx-auto mt-6 max-w-3xl text-lg leading-8 text-access/80'>
              Gi gaven som varmer – perfekt for den sosiale livsnyteren. Enten
              han er på hytta, ved bålpannen eller i bobilen, er Utekos
              Mikrofiber™ den ultimate komfort-oppgraderingen.
            </p>
          </AnimatedBlock>
        </div>

        {/* Bildekaruseller */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20'>
          <AnimatedBlock className='will-animate-fade-in-left' delay='0.2s'>
            <h3 className='mb-4 text-lg font-semibold text-foreground'>
              Farge: Vargnatt
            </h3>
            <ImageCarousel slides={variant1Images} />
          </AnimatedBlock>
          <AnimatedBlock className='will-animate-fade-in-right' delay='0.3s'>
            <h3 className='mb-4 text-lg font-semibold text-foreground'>
              Farge: Fjellblå
            </h3>
            <ImageCarousel slides={variant2Images} />
          </AnimatedBlock>
        </div>

        {/* Fordeler - Fiksert layout */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20'>
          {fathersDayAdvantages.map((advantage, index) => (
            <AnimatedBlock
              key={advantage.title}
              className='will-animate-fade-in-up'
              delay={`${0.4 + index * 0.1}s`}
            >
              <div className='flex flex-col items-center gap-4 text-center p-6 rounded-lg bg-background/30 hover:bg-background/50 transition-colors'>
                <div
                  className={`p-3 rounded-full bg-background/50 ${advantage.color}`}
                >
                  <IconRenderer name={advantage.icon} className='h-8 w-8' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-foreground mb-2'>
                    {advantage.title}
                  </h3>
                  <p className='text-sm text-muted-foreground leading-relaxed'>
                    {advantage.description}
                  </p>
                </div>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        {/* Pris og CTA */}
        <AnimatedBlock
          className='will-animate-fade-in-up flex flex-col items-center gap-6'
          delay='0.6s'
        >
          <div className='flex flex-col sm:flex-row items-center gap-4'>
            <span className='text-xl sm:text-2xl font-medium text-muted-foreground line-through'>
              1 590,-
            </span>
            <span className='text-4xl sm:text-5xl font-bold text-foreground'>
              1 290,00 kr
            </span>
          </div>
          <p className='text-lg text-access/80 text-center'>
            Spar 300,- med koden:
            <strong className='ml-1.5 rounded-md bg-sky-800/20 px-3 py-1.5 font-mono text-sky-400'>
              FARSDAG25
            </strong>
          </p>
          <Button asChild size='lg' className='group w-full sm:w-auto mt-4'>
            <Link href='/produkter/utekos-mikrofiber'>
              Kjøp farsdagsgaven her
              <GiftIcon className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-125' />
            </Link>
          </Button>
        </AnimatedBlock>
      </div>
    </section>
  )
}
