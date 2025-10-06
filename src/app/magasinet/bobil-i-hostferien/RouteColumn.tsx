import { MapPin } from 'lucide-react'
import { RouteStop } from './RouteStop'
import type { RouteType } from './SectionMagasinetBobilHostferien'
import { AnimatedBlock } from '@/components/AnimatedBlock'

export function RouteColumn({
  route,
  delay
}: {
  route: RouteType
  delay: number
}) {
  return (
    <AnimatedBlock
      className='will-animate-fade-in-up flex flex-col'
      delay={`${delay}s`}
      threshold={0.2}
    >
      {/* Start badge */}
      <AnimatedBlock
        className='will-animate-fade-in-scale mb-8 flex justify-center'
        delay={`${delay + 0.1}s`}
      >
        <div className='relative inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-sidebar-foreground px-6 py-3 shadow-lg'>
          <MapPin className='h-5 w-5 text-foreground' />
          <span className='text-lg font-semibold text-foreground'>
            {route.start.label}
          </span>
        </div>
      </AnimatedBlock>

      {/* Stops */}
      <div className='flex flex-col gap-6'>
        {route.stops.map((stop, idx) => (
          <AnimatedBlock
            key={stop.label}
            className='will-animate-fade-in-left'
            delay={`${delay + 0.2 + idx * 0.15}s`}
            threshold={0.5}
          >
            <RouteStop
              stop={stop}
              isLast={idx === route.stops.length - 1}
              delay={delay + 0.2 + idx * 0.15}
            />
          </AnimatedBlock>
        ))}
      </div>
    </AnimatedBlock>
  )
}
