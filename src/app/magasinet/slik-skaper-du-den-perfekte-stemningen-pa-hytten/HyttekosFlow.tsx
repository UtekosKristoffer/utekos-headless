import { Layers, Lightbulb, Music, Thermometer } from 'lucide-react'

// --- Typer og hjelpere (uendret) ---
const iconMap = {
  lightbulb: Lightbulb,
  music: Music,
  layers: Layers,
  thermometer: Thermometer
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

type NodeData = {
  icon?: IconName
  label: string
  description?: string
  iconColor?: string
  shadowColor?: string
  handlePosition?: 'top' | 'right' | 'bottom' | 'left'
}

type FlowNode = {
  id: string
  type: 'default' | 'custom'
  position: { x: number; y: number }
  width: number
  height: number
  data: NodeData
}

// --- Ny, balansert og romslig node-data ---
const nodes: FlowNode[] = [
  {
    id: 'center',
    type: 'default',
    position: { x: 310, y: 215 },
    width: 180,
    height: 70,
    data: { label: 'Den Perfekte Hyttekosen' }
  },
  {
    id: 'lys',
    type: 'custom',
    position: { x: 290, y: 0 },
    width: 220,
    height: 140,
    data: {
      icon: 'lightbulb',
      label: 'Lys',
      description:
        'Levende lys, dimmere og lysslynger skaper en lun og innbydende atmosfære.',
      iconColor: 'text-amber-400',
      shadowColor: '#facc15',
      handlePosition: 'bottom'
    }
  },
  {
    id: 'lyd',
    type: 'custom',
    position: { x: 0, y: 180 },
    width: 220,
    height: 140,
    data: {
      icon: 'music',
      label: 'Lyd',
      description:
        'Knitring fra peisen, en rolig spilleliste eller bare den dype stillheten fra naturen.',
      iconColor: 'text-violet-400',
      shadowColor: '#a78bfa',
      handlePosition: 'right'
    }
  },
  {
    id: 'tekstur',
    type: 'custom',
    position: { x: 580, y: 180 },
    width: 220,
    height: 140,
    data: {
      icon: 'layers',
      label: 'Tekstur',
      description:
        'Myke ullpledd, saueskinn og grovt treverk. Kontraster som er gode å ta og se på.',
      iconColor: 'text-orange-400',
      shadowColor: '#fb923c',
      handlePosition: 'left'
    }
  },
  {
    id: 'varme',
    type: 'custom',
    position: { x: 290, y: 360 },
    width: 220,
    height: 140,
    data: {
      icon: 'thermometer',
      label: 'Varme',
      description:
        'Den lune peisvarmen inne, og muligheten til å ta med komforten ut på terrassen.',
      iconColor: 'text-rose-400',
      shadowColor: '#f472b6',
      handlePosition: 'top'
    }
  }
]

const edges = [
  {
    id: 'e-c-lys',
    source: 'center',
    target: 'lys',
    style: { stroke: '#facc15' }
  },
  {
    id: 'e-c-lyd',
    source: 'center',
    target: 'lyd',
    style: { stroke: '#a78bfa' }
  },
  {
    id: 'e-c-tekstur',
    source: 'center',
    target: 'tekstur',
    style: { stroke: '#fb923c' }
  },
  {
    id: 'e-c-varme',
    source: 'center',
    target: 'varme',
    style: { stroke: '#f472b6' }
  }
]

export default function HyttekosFlow() {
  return (
    <div className='h-auto w-full overflow-hidden rounded-lg border border-neutral-800 bg-background dot-pattern p-4'>
      <svg
        viewBox='0 0 800 500' // Romsligere viewBox
        className='h-full w-full'
        aria-hidden='true'
      >
        {/* Linjer */}
        {edges.map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source)!
          const targetNode = nodes.find(n => n.id === edge.target)!

          const sourceX = sourceNode.position.x + sourceNode.width / 2
          const sourceY = sourceNode.position.y + sourceNode.height / 2

          let targetX = targetNode.position.x + targetNode.width / 2
          let targetY = targetNode.position.y + targetNode.height / 2

          // Kalkulerer nøyaktig kant-posisjon basert på handlePosition
          switch (targetNode.data.handlePosition) {
            case 'top':
              targetY = targetNode.position.y + targetNode.height
              break
            case 'bottom':
              targetY = targetNode.position.y
              break
            case 'left':
              targetX = targetNode.position.x + targetNode.width
              break
            case 'right':
              targetX = targetNode.position.x
              break
          }

          const pathD = `M ${sourceX},${sourceY} C ${sourceX},${(sourceY + targetY) / 2} ${targetX},${(sourceY + targetY) / 2} ${targetX},${targetY}`

          return (
            <path
              key={edge.id}
              d={pathD}
              fill='none'
              strokeWidth={2}
              strokeDasharray='5 5'
              style={{
                ...edge.style,
                animation: 'stroke-draw 1s linear infinite'
              }}
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
            {node.type === 'default' && (
              <div className='flex h-full items-center justify-center rounded-lg border border-neutral-700 bg-sidebar-foreground p-3 text-center text-sm font-semibold text-foreground'>
                {node.data.label}
              </div>
            )}
            {node.type === 'custom' && (
              <div className='relative h-full w-full rounded-lg border border-neutral-800 bg-sidebar-foreground p-5'>
                <div
                  className='absolute inset-0 rounded-lg blur-xl opacity-20'
                  style={{ background: node.data.shadowColor }}
                />
                <div className='relative z-10'>
                  <div className='mb-4 flex items-center gap-3'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background'>
                      <IconRenderer
                        name={node.data.icon!}
                        className={`h-6 w-6 ${node.data.iconColor}`}
                      />
                    </div>
                    <h3 className='text-base font-semibold'>
                      {node.data.label}
                    </h3>
                  </div>
                  <p className='text-sm leading-relaxed text-muted-foreground'>
                    {node.data.description}
                  </p>
                </div>
              </div>
            )}
          </foreignObject>
        ))}
      </svg>
    </div>
  )
}
