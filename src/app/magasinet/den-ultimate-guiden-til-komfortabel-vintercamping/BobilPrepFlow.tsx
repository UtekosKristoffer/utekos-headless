import { ALargeSmall, Car, Droplets, Wrench } from 'lucide-react'

// --- Typer og hjelpere ---
const iconMap = {
  'a-large-small': ALargeSmall,
  'wrench': Wrench,
  'droplets': Droplets,
  'car': Car
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
    id: '1',
    type: 'input',
    position: { x: 0, y: 150 },
    width: 180,
    height: 120,
    data: { label: 'Bobilen må være klar' }
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 350, y: 0 },
    width: 256,
    height: 100,
    data: {
      icon: 'a-large-small',
      label: 'Isolasjon',
      description:
        'Sjekk tetningslister. Bruk isolasjonsmatter i førerhuset for å minimere varmetap.',
      iconColor: 'text-blue-400'
    }
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 350, y: 110 },
    width: 256,
    height: 100,
    data: {
      icon: 'wrench',
      label: 'Varmesystem',
      description:
        'Test Alde/Truma. Sørg for nok propan-gass og åpne alle luftdyser for sirkulasjon.',
      iconColor: 'text-orange-400'
    }
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 350, y: 220 },
    width: 256,
    height: 100,
    data: {
      icon: 'droplets',
      label: 'Vannsystem',
      description:
        'Sikre at tanker/rør er oppvarmet. Bruk frostvæske i gråvannstanken for å unngå is.',
      iconColor: 'text-cyan-400'
    }
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 350, y: 330 },
    width: 256,
    height: 100,
    data: {
      icon: 'car',
      label: 'Dekk & Kjetting',
      description:
        'Gode vinterdekk er et krav. Ta alltid med kjettinger for sikkerhet på fjellet.',
      iconColor: 'text-green-400'
    }
  }
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', style: { stroke: '#60a5fa' } },
  { id: 'e1-3', source: '1', target: '3', style: { stroke: '#fb923c' } },
  { id: 'e1-4', source: '1', target: '4', style: { stroke: '#22d3ee' } },
  { id: 'e1-5', source: '1', target: '5', style: { stroke: '#4ade80' } }
]

export default function BobilPrepFlow() {
  return (
    <div className='h-[450px] w-full rounded-lg bg-sidebar-foreground dot-pattern'>
      <svg viewBox='0 0 620 450' className='h-full w-full' aria-hidden='true'>
        {/* Linjer */}
        {initialEdges.map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source)!
          const targetNode = nodes.find(n => n.id === edge.target)!

          const sourceX = sourceNode.position.x + sourceNode.width
          const sourceY = sourceNode.position.y + sourceNode.height / 2
          const targetX = targetNode.position.x
          const targetY = targetNode.position.y + targetNode.height / 2

          const pathD = `M ${sourceX},${sourceY} C ${sourceX + 50},${sourceY} ${
            targetX - 50
          },${targetY} ${targetX},${targetY}`

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
              <div className='flex h-full items-center justify-center rounded-md border border-neutral-700 bg-sidebar-foreground p-4 text-center text-foreground'>
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
