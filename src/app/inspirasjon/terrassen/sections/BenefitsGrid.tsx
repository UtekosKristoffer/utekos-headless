'use client'

import { motion } from 'framer-motion'
import type { Benefit } from '../types'
import { Thermometer, Home, Sparkles, Users } from 'lucide-react'

export const benefitsData: Benefit[] = [
  {
    icon: Thermometer,
    title: 'Øyeblikkelig komfort',
    description: 'Fra kjølig trekk til lun hygge på et øyeblikk.',
    color: 'text-orange-500'
  },
  {
    icon: Home,
    title: 'Utvider hjemmet ditt',
    description: 'Gjør uteplassen til en funksjonell del av huset, oftere.',
    color: 'text-emerald-500'
  },
  {
    icon: Sparkles,
    title: 'Enkel i bruk',
    description:
      'Lett å ta frem, lett å rydde vekk. Alltid klar for en kosestund.',
    color: 'text-yellow-400'
  },
  {
    icon: Users,
    title: 'Inviterer til samvær',
    description: 'Skap en innbydende atmosfære som gjestene dine vil elske.',
    color: 'text-rose-500'
  }
]

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            En investering i hjemmet
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Få mer ut av uteplassen du allerede har. Utekos er designet for å
            maksimere komforten i hverdagen.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className='text-center'
            >
              <div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-neutral-800 bg-sidebar-foreground'>
                <benefit.icon className={`size-8 ${benefit.color}`} />
              </div>
              <h3 className='mb-2 text-lg font-semibold'>{benefit.title}</h3>
              <p className='text-sm text-muted-foreground'>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
