import { Card, CardContent } from '@/components/ui/card'
import { iconMap } from './iconMap'
import { AnimatedBlock } from '@/components/AnimatedBlock'

// Steg 1: Definer en presis type for ikon-navnene basert på iconMap
type IconName = keyof typeof iconMap

// Steg 2: Oppdater HyttekosElement-typen til å bruke den presise typen
export type HyttekosElement = {
  icon: IconName
  title: string
  description: string
  color: string
  iconColor: string
}

export function HyttekosElementsGrid({
  elements
}: {
  elements: HyttekosElement[]
}) {
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
      {elements.map((element, index) => {
        // TypeScript forstår nå at element.icon er en gyldig nøkkel
        const IconComponent = iconMap[element.icon]
        if (!IconComponent) return null

        return (
          <AnimatedBlock
            key={element.title}
            className='will-animate-fade-in-up h-full'
            delay={`${index * 0.1}s`}
            threshold={0.5}
          >
            <Card className='group relative h-full overflow-hidden border-neutral-800 bg-sidebar-foreground'>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${element.color} to-transparent opacity-20 transition-opacity group-hover:opacity-30`}
              />
              <CardContent className='relative p-8'>
                <div className='mb-6 flex items-center gap-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background'>
                    <IconComponent className={`h-6 w-6 ${element.iconColor}`} />
                  </div>
                </div>
                <h3 className='mb-2 text-xl font-semibold'>{element.title}</h3>
                <p className='text-muted-foreground'>{element.description}</p>
              </CardContent>
            </Card>
          </AnimatedBlock>
        )
      })}
    </div>
  )
}
