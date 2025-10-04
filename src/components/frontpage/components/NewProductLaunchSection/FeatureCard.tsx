'use client'

import { motion } from 'framer-motion'
interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  glowColor: string
}

interface FeatureCardProps {
  feature: Feature
  delay: number
}

export function FeatureCard({ feature, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
      className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-sidebar-foreground p-4 transition-all duration-300'
    >
      {/* Aurora gradient effect */}
      <div
        className='absolute -inset-x-2 -inset-y-8 opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-30'
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${feature.glowColor} 100%)`
        }}
      />

      <div className='relative z-10 flex items-start gap-4'>
        <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-all duration-300 group-hover:scale-110 group-hover:border-neutral-600'>
          <feature.icon className='h-6 w-6 text-sky-800' />
        </div>
        <div className='flex-1'>
          <h4 className='mb-1 font-semibold text-foreground'>
            {feature.title}
          </h4>
          <p className='text-sm leading-relaxed text-muted-foreground'>
            {feature.description}
          </p>
        </div>
      </div>

      {/* Subtle border glow on hover */}
      <div className='absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div
          className='absolute inset-0 rounded-lg blur-sm opacity-20'
          style={{ background: feature.glowColor }}
        />
      </div>
    </motion.div>
  )
}
