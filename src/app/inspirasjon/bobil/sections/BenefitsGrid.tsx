import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Benefit } from '../types'

import {
  CalendarIcon,
  SparklesIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

import { ThermometerIcon } from 'lucide-react'

export const benefitsData = [
  {
    icon: ThermometerIcon,
    title: 'Øyeblikkelig varme',
    description: 'Fra kald morgen til koselig stund på sekunder',
    color: 'text-dusted-peri'
  },
  {
    icon: SparklesIcon,
    title: 'Kompakt og praktisk',
    description: 'Tar minimal plass i bobilen, maksimal komfort på turen',
    color: 'text-primary-button'
  },
  {
    icon: CalendarIcon,
    title: 'Forleng sesongen',
    description: 'Bruk bobilen fra tidlig vår til sen høst i komfort',
    color: 'text-ancient-water'
  },
  {
    icon: UsersIcon,
    title: 'Sosial magnet',
    description: 'Bli samlingspunktet på campingplassen',
    color: 'text-bleached-mauve'
  }
]

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <section className='bg-mountain-view py-24 text-cloud-dancer'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='font-brand-sans text-fluid-display font-bold leading-[0.95] tracking-[-0.01em]'>
            Skapt for bobilisten
          </h2>
          <p className='mt-4 font-utekos-text text-lg leading-[1.45] tracking-[-0.02em] text-cloud-dancer/82'>
            Komfort som følger bobilen — fra tidlig vår til sen høst.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {benefits.map((benefit, benefitIndex) => (
            <AnimatedBlock
              key={benefit.title}
              className='will-animate-fade-in-scale text-center'
              delay={`${benefitIndex * 0.05}s`}
              threshold={0.2}
            >
              <div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-cloud-dancer/12 bg-maritime-darkest/24'>
                <benefit.icon className={`size-8 ${benefit.color}`} aria-hidden />
              </div>
              <h3 className='mb-2 font-brand-sans text-lg font-bold leading-[0.95] tracking-[-0.01em] text-cloud-dancer'>
                {benefit.title}
              </h3>
              <p className='font-utekos-text text-sm leading-[1.45] tracking-[-0.02em] text-cloud-dancer/82'>
                {benefit.description}
              </p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
