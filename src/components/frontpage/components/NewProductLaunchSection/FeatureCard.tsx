import { cn } from '@/lib/utils/className'
import { CloudRain, Feather, Gift, ShieldCheck } from 'lucide-react'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'

const iconMap = {
  'cloud-rain': CloudRain,
  'feather': Feather,
  'shield-check': ShieldCheck,
  'gift': Gift
}

const toneStyles = {
  water: {
    bg: 'var(--ancient-water)',
    icon: 'border-maritime-blue bg-maritime-blue text-cloud-dancer'
  },
  mauve: {
    bg: 'var(--bleached-mauve)',
    icon: 'border-maritime-blue bg-maritime-blue text-cloud-dancer'
  },
  overcast: {
    bg: 'var(--overcast)',
    icon: 'border-maritime-blue bg-maritime-blue text-cloud-dancer'
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

  return (
    <BrandBadge
      asChild
      backgroundColor={tone.bg}
      textColor='var(--maritime-blue)'
      className='w-full justify-start whitespace-normal rounded-2xl border border-maritime-blue/40 p-5 pr-8 shadow-[0_1px_0_rgba(255,255,255,0.18)]'
    >
      <article>
        <div className='flex items-start gap-4'>
          <span
            className={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-full border',
              tone.icon
            )}
          >
            <IconComponent aria-hidden='true' className='size-5' />
          </span>

          <div className='min-w-0 flex-1 pt-1'>
            <h3 className='mb-1.5 text-base font-medium tracking-[-0.01em] text-maritime-blue'>
              {feature.title}
            </h3>

            <p className='text-sm leading-relaxed text-maritime-blue'>
              {feature.description}
            </p>
          </div>
        </div>
      </article>
    </BrandBadge>
  )
}
