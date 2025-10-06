import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Building2, Coffee, Sofa } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { cn } from '@/lib/utils/className'

// --- Typer og hjelpere ---
const iconMap = {
  'coffee': Coffee,
  'sofa': Sofa,
  'building2': Building2,
  'book-open': BookOpen
}
type IconName = keyof typeof iconMap

function IconRenderer({
  name,
  className
}: {
  name: IconName
  className?: string
}) {
  const Icon = iconMap[name]
  return Icon ? <Icon className={cn('size-5', className)} /> : null
}

// Definerer en presis type for data-strukturen
type TerraceIdea = {
  name: string
  highlight: string
  icon: IconName
  color: string
}

// Dataen bruker nå den presise typen
export const terraceIdeasData: TerraceIdea[] = [
  {
    name: 'Morgenkaffe-kroken',
    highlight: 'En lun start på dagen',
    icon: 'coffee',
    color: 'text-amber-400'
  },
  {
    name: 'Lounge-området',
    highlight: 'For sosiale kvelder',
    icon: 'sofa',
    color: 'text-rose-500'
  },
  {
    name: 'Balkong-oasen',
    highlight: 'Maksimal komfort, minimal plass',
    icon: 'building2',
    color: 'text-cyan-400'
  },
  {
    name: 'Lesekroken',
    highlight: 'Fordyp deg i en annen verden',
    icon: 'book-open',
    color: 'text-emerald-500'
  }
]

export function TerraceIdeasGrid({ ideas }: { ideas: TerraceIdea[] }) {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Ideer for din uteplass
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Uansett størrelse på uteplassen din, kan den bli en oase for komfort
            og hygge.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {ideas.map((idea, index) => (
            <AnimatedBlock
              key={idea.name}
              className='will-animate-fade-in-up h-full'
              delay={`${index * 0.1}s`}
            >
              <Card className='group border-neutral-800 bg-sidebar-foreground transition-colors hover:bg-sidebar-foreground/80'>
                <CardContent className='p-6'>
                  <div className='mb-3 flex items-start justify-between'>
                    <h3 className='text-lg font-semibold'>{idea.name}</h3>
                    <IconRenderer
                      name={idea.icon}
                      className={`${idea.color} transition-colors group-hover:text-primary`}
                    />
                  </div>
                  <p className='text-sm text-foreground/80'>{idea.highlight}</p>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
