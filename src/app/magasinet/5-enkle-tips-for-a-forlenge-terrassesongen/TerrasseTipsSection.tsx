'use client'

import { motion } from 'framer-motion'
import { Coffee, Layers, Lightbulb, Thermometer, Wind } from 'lucide-react'
import { cn } from '@/lib/utils/className'

const tips = [
  {
    Icon: Layers,
    title: '1. Tekstiler & Pledd',
    description:
      'Myke ullpledd, puter og saueskinn isolerer og skaper en umiddelbar følelse av lunhet.',
    glowColor: '#fb923c',
    iconColor: 'text-orange-400'
  },
  {
    Icon: Lightbulb,
    title: '2. Riktig Belysning',
    description:
      'Varme, dempede lyskilder som lysslynger og lykter skaper en intim og trygg atmosfære.',
    glowColor: '#facc15',
    iconColor: 'text-amber-400'
  },
  {
    Icon: Wind,
    title: '3. Lun Levegg',
    description:
      'En enkel levegg eller noen store planter kan stoppe den kjølige trekken og skape en lun krok.',
    glowColor: '#22d3ee',
    iconColor: 'text-cyan-400'
  },
  {
    Icon: Thermometer,
    title: '4. Varme fra Utekos',
    description:
      'Den mest effektive måten å holde seg varm på. En personlig varmekilde som fungerer umiddelbart.',
    glowColor: '#f472b6',
    iconColor: 'text-rose-400'
  },
  {
    Icon: Coffee,
    title: '5. Varme Drikker',
    description:
      'En kopp te, kakao eller kaffe varmer fra innsiden og er en essensiell del av kosen.',
    glowColor: '#4ade80',
    iconColor: 'text-emerald-400'
  }
]

interface TipCardProps {
  Icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  glowColor: string
  iconColor: string
  delay: number
}

function TipCard({
  Icon,
  title,
  description,
  glowColor,
  iconColor,
  delay
}: TipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className='group relative h-full overflow-hidden rounded-xl border border-neutral-800 bg-sidebar-foreground p-8 transition-all duration-300'
    >
      {/* Aurora gradient effect with inline style for color */}
      <div
        className='animate-aurora absolute -inset-x-2 -inset-y-16 opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-40'
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${glowColor} 100%)`
        }}
      />

      <div className='relative z-10 flex h-full flex-col'>
        <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-all duration-300 group-hover:scale-110 group-hover:border-neutral-600'>
          <Icon
            className={cn('h-6 w-6 transition-colors duration-300', iconColor)}
          />
        </div>
        <h3 className='mt-6 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-opacity-90'>
          {title}
        </h3>
        <p className='mt-2 text-muted-foreground'>{description}</p>
      </div>

      {/* Subtle border glow on hover */}
      <div className='absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div
          className='absolute inset-0 rounded-xl blur-sm opacity-20'
          style={{ background: glowColor }}
        />
      </div>
    </motion.div>
  )
}

export function TerrasseTipsSection() {
  return (
    <section className='py-16 mx-auto md:max-w-7xl max-w-[95%] sm:py-24'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='mb-16 text-center'
        >
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            5 Enkle Tips for å Forlenge Terrassesongen
          </h2>
          <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'>
            Med noen enkle grep kan du nyte terrassen din langt utover sommeren.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5'>
          {tips.map((tip, i) => (
            <TipCard key={tip.title} {...tip} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}
