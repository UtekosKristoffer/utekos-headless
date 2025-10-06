import { Coffee, Footprints, Wind } from 'lucide-react'

// --- Typer og hjelpere ---
const iconMap = {
  wind: Wind,
  footprints: Footprints,
  coffee: Coffee
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
  return Icon ? <Icon className={className} /> : null
}

// Definerer de ulike data-formene
type InputNodeData = { label: string }
type CustomNodeData = {
  icon: IconName
  label: string
  description: string
  iconColor: string
}

// Definerer en "diskriminert union" for nodene
type FlowNode =
  | {
      id: string
      type: 'input'
      position: { x: number; y: number }
      width: number
      height: number
      data: InputNodeData
    }
  | {
      id: string
      type: 'custom'
      position: { x: number; y: number }
      width: number
      height: number
      data: CustomNodeData
    }

// --- Node Data (nå med den presise typen) ---
const nodes: FlowNode[] = [
  {
    id: 'center',
    type: 'input',
    position: { x: (900 - 180) / 2, y: 0 },
    width: 180,
    height: 100,
    data: { label: 'Livet på Vintercampingen' }
  },
  {
    id: 'c1',
    type: 'custom',
    position: { x: 0, y: 220 },
    width: 256,
    height: 100,
    data: {
      icon: 'wind',
      label: 'Lufting',
      description:
        'Luft ut kort og effektivt et par ganger om dagen for å redusere kondens.',
      iconColor: 'text-sky-400'
    }
  },
  {
    id: 'c2',
    type: 'custom',
    position: { x: (900 - 256) / 2, y: 220 },
    width: 256,
    height: 100,
    data: {
      icon: 'footprints',
      label: 'Kom deg ut',
      description:
        'Bruk de lyse timene. En gåtur i snøen gir energi og gjør det bedre å komme inn igjen.',
      iconColor: 'text-emerald-400'
    }
  },
  {
    id: 'c3',
    type: 'custom',
    position: { x: 900 - 256, y: 220 },
    width: 256,
    height: 100,
    data: {
      icon: 'coffee',
      label: 'Skap Hygge',
      description:
        'Bruk lysslynger for stemning og ha alltid varm drikke tilgjengelig på en termos.',
      iconColor: 'text-rose-400'
    }
  }
]

const edges = [
  { id: 'ec-1', source: 'center', target: 'c1', style: { stroke: '#38bdf8' } },
  { id: 'ec-2', source: 'center', target: 'c2', style: { stroke: '#34d399' } },
  { id: 'ec-3', source: 'center', target: 'c3', style: { stroke: '#f472b6' } }
]

export function VintercampFlow() {
  return (
    <div className='h-auto w-full rounded-lg bg-sidebar-foreground dot-pattern p-4'>
      <svg viewBox='0 0 900 320' className='h-full w-full' aria-hidden='true'>
        {/* Linjer */}
        {edges.map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source)!
          const targetNode = nodes.find(n => n.id === edge.target)!

          const sourceX = sourceNode.position.x + sourceNode.width / 2
          const sourceY = sourceNode.position.y + sourceNode.height
          const targetX = targetNode.position.x + targetNode.width / 2
          const targetY = targetNode.position.y

          const pathD = `M ${sourceX},${sourceY} C ${sourceX},${sourceY + 60} ${targetX},${targetY - 60} ${targetX},${targetY}`

          return (
            <path
              key={edge.id}
              d={pathD}
              fill='none'
              strokeWidth={2}
              style={edge.style}
            />
          )
        })}

        {/* Noder */}
        {nodes.map(node => (
          <foreignObject
            key={node.id}
            x={node.position.x}
            y={node.position.y}
            width={node.width}
            height={node.height}
          >
            {node.type === 'input' && (
              <div className='flex h-full items-center justify-center rounded-md border border-neutral-700 bg-sidebar-foreground p-4 text-center font-semibold text-foreground'>
                {node.data.label}
              </div>
            )}
            {node.type === 'custom' && (
              <div className='flex h-full w-full items-center rounded-lg border border-neutral-700 bg-background p-4 shadow-lg'>
                <div className='flex items-center gap-3'>
                  <IconRenderer
                    name={node.data.icon}
                    className={`h-5 w-5 ${node.data.iconColor}`}
                  />
                  <div>
                    <h4 className='text-base font-bold text-foreground'>
                      {node.data.label}
                    </h4>
                    <p className='text-sm text-muted-foreground'>
                      {node.data.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </foreignObject>
        ))}
      </svg>
    </div>
  )
}
