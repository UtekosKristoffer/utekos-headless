import { cn } from '@/lib/utils/className'
import type { RouteStopType } from './SectionMagasinetBobilHostferien'
import { AnimatedBlock } from '@/components/AnimatedBlock'

import {
  Tent,
  Mountain,
  Coffee,
  Utensils,
  Sunrise,
  MountainSnow,
  Trees,
  Fish,
  Milestone
} from 'lucide-react'

const iconMap = {
  'tent': Tent,
  'mountain': Mountain,
  'coffee': Coffee,
  'utensils': Utensils,
  'sunrise': Sunrise,
  'mountain-snow': MountainSnow, // Legg til
  'trees': Trees, // Legg til
  'fish': Fish, // Legg til
  'milestone': Milestone // Legg til
}

export type IconName = keyof typeof iconMap

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

export function RouteStop({
  stop,
  isLast,
  delay
}: {
  stop: RouteStopType
  isLast: boolean
  delay: number
}) {
  return (
    <div className='relative md:pt-6'>
      <div className='group relative flex items-center gap-4 rounded-xl border border-neutral-800 bg-sidebar-foreground p-6 transition-all duration-300 hover:border-neutral-700 md:min-h-[200px]'>
        <div
          className='animate-aurora pointer-events-none absolute -inset-x-2 -inset-y-16 opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-40'
          style={{
            background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${stop.glowColor} 100%)`
          }}
        />

        <div className='relative z-10 flex w-full items-start gap-4'>
          <div className='flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-all duration-300 group-hover:scale-110 group-hover:border-neutral-600'>
            {/* 'as IconName' er nå fjernet, da 'stop.icon' har riktig type */}
            <IconRenderer
              name={stop.icon}
              className={`h-7 w-7 ${stop.iconColor}`}
            />
          </div>
          <div className='flex-1'>
            <h4 className='mb-2 text-lg font-semibold text-foreground'>
              {stop.label}
            </h4>
            <p className='leading-relaxed text-muted-foreground'>
              {stop.description}
            </p>
          </div>
        </div>
        <div className='pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <div
            className='absolute inset-0 rounded-xl blur-sm opacity-20'
            style={{ background: stop.glowColor }}
          />
        </div>
      </div>

      {!isLast && (
        <AnimatedBlock
          className='will-animate-scale-y-from-top absolute left-[42px] top-[calc(100%+0.5rem)] h-8 w-1 rounded-full bg-gradient-to-b from-neutral-700 to-transparent'
          delay={`${delay + 0.3}s`}
          threshold={1}
        />
      )}
    </div>
  )
}
