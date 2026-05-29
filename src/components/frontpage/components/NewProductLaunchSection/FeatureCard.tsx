import { cn } from '@/lib/utils/className'
import { CloudRain, Feather, Gift, ShieldCheck } from 'lucide-react'
import type { CSSProperties } from 'react'

const iconMap = {
  'cloud-rain': CloudRain,
  'feather': Feather,
  'shield-check': ShieldCheck,
  'gift': Gift
}

const toneStyles = {
  water: {
    bg: 'var(--ancient-water)',
    icon: 'border-havdyp bg-havdyp text-cloud-dancer'
  },
  mauve: {
    bg: 'var(--bleached-mauve)',
    icon: 'border-havdyp bg-havdyp text-cloud-dancer'
  },
  overcast: {
    bg: 'var(--overcast)',
    icon: 'border-havdyp bg-havdyp text-cloud-dancer'
  }
} as const

export interface Feature {
  icon: keyof typeof iconMap
  title: string
  description: string
  tone: keyof typeof toneStyles
}

interface FeatureCardProps {
  feature: Feature
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const IconComponent = iconMap[feature.icon] ?? CloudRain
  const tone = toneStyles[feature.tone] ?? toneStyles.water
  const cardStyle = {
    '--feature-card-bg': tone.bg
  } as CSSProperties

  return (
    <article
      className='w-full rounded-2xl border border-havdyp/32 bg-[var(--feature-card-bg)] p-4 pr-5 text-havdyp shadow-[0_1px_0_color-mix(in_oklab,var(--cloud-dancer)_18%,transparent)] sm:p-5 sm:pr-8'
      style={cardStyle}
    >
      <div className='flex items-start gap-3 sm:gap-4'>
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full border sm:size-11',
            tone.icon
          )}
        >
          <IconComponent aria-hidden='true' className='size-5' />
        </span>

        <div className='min-w-0 flex-1 pt-0.5 sm:pt-1'>
          <h3 className='mb-1.5 text-base font-semibold leading-snug tracking-[-0.01em]'>{feature.title}</h3>

          <p className='text-sm leading-[1.45] tracking-[-0.01em]'>{feature.description}</p>
        </div>
      </div>
    </article>
  )
}
