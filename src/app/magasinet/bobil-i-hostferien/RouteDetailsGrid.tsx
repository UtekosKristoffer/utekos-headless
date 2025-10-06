import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { MountainSnow, Trees, type LucideIcon } from 'lucide-react'

type RouteIconName = 'mountainSnow' | 'trees'

const routeIconByName: Record<RouteIconName, LucideIcon> = {
  mountainSnow: MountainSnow,
  trees: Trees
}

interface RouteElement {
  icon: RouteIconName
  title: string
  description: string
  color: string
  iconColor: string
}

export function RouteDetailsGrid({ elements }: { elements: RouteElement[] }) {
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
      {elements.map((routeElement, routeElementIndex) => {
        const IconComponent = routeIconByName[routeElement.icon]

        return (
          <AnimatedBlock
            key={routeElement.title}
            className='will-animate-fade-in-up'
            delay={`${routeElementIndex * 0.1}s`}
            threshold={0.2}
          >
            <Card className='group rounded-lg relative h-full overflow-hidden border-neutral-800 bg-sidebar-foreground'>
              <div
                className={`absolute rounded-lg inset-0 bg-gradient-to-br ${routeElement.color} to-transparent opacity-10 transition-opacity group-hover:opacity-30`}
              />
              <CardContent className='relative p-8'>
                <div className='mb-6 flex items-center gap-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background'>
                    <IconComponent
                      className={`h-6 w-6 ${routeElement.iconColor}`}
                    />
                  </div>
                </div>
                <h2 className='mb-2 !mt-0 text-xl font-semibold'>
                  {routeElement.title}
                </h2>
                <p className='text-muted-foreground'>
                  {routeElement.description}
                </p>
              </CardContent>
            </Card>
          </AnimatedBlock>
        )
      })}
    </div>
  )
}
