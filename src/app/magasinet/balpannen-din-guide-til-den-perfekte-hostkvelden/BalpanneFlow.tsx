import {
  ListChecks,
  MapPin,
  ShoppingBasket,
  Sparkles,
  UserCheck
} from 'lucide-react'

// --- Typer og hjelpere ---
const iconMap = {
  'map-pin': MapPin,
  'list-checks': ListChecks,
  'shopping-basket': ShoppingBasket,
  'user-check': UserCheck,
  'sparkles': Sparkles
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
type DefaultNodeData = { label: string }
type CustomNodeData = {
  icon: IconName
  label: string
  description: string
  iconColor: string
  shadowColor: string
}

// Definerer en "diskriminert union" for nodene
type FlowNode =
  | {
      id: string
      type: 'default'
      position: { x: number; y: number }
      width: number
      data: DefaultNodeData
    }
  | {
      id: string
      type: 'custom'
      position: { x: number; y: number }
      width: number
      data: CustomNodeData
    }

// --- Node Data (nå med den presise typen) ---
const nodes: FlowNode[] = [
  {
    id: 'center',
    type: 'default',
    position: { x: 50, y: 380 },
    width: 220,
    data: { label: 'De 5 P-ene for Perfekt Bålkos' }
  },
  {
    id: 'plassering',
    type: 'custom',
    position: { x: 350, y: 0 },
    width: 280,
    data: {
      icon: 'map-pin',
      label: '1. Plassering',
      description:
        'Velg et trygt underlag, god avstand til bygninger, og tenk på hvor vinden kommer fra.',
      iconColor: 'text-green-400',
      shadowColor: '#4ade80'
    }
  },
  {
    id: 'preparasjoner',
    type: 'custom',
    position: { x: 400, y: 190 },
    width: 280,
    data: {
      icon: 'list-checks' as IconName,
      label: '2. Preparasjoner',
      description:
        'Ha tørr ved, opptenningsbriketter og slukkeutstyr (vann/sand) klart før du tenner på.',
      iconColor: 'text-cyan-400',
      shadowColor: '#22d3ee'
    }
  },
  {
    id: 'proviantering',
    type: 'custom',
    position: { x: 450, y: 380 },
    width: 280,
    data: {
      icon: 'shopping-basket' as IconName,
      label: '3. Proviantering',
      description:
        'Pølser, pinnebrød, marshmallows og varm drikke på termos. Forbered alt på forhånd.',
      iconColor: 'text-amber-400',
      shadowColor: '#facc15'
    }
  },
  {
    id: 'personlig-komfort',
    type: 'custom',
    position: { x: 500, y: 570 },
    width: 280,
    data: {
      icon: 'user-check' as IconName,
      label: '4. Personlig Komfort',
      description:
        'Sitteunderlag er bra, Utekos er best. Holder deg varm fra alle kanter, hele kvelden.',
      iconColor: 'text-rose-400',
      shadowColor: '#f472b6'
    }
  },
  {
    id: 'prikken-over-i-en',
    type: 'custom',
    position: { x: 550, y: 760 },
    width: 280,
    data: {
      icon: 'sparkles' as IconName,
      label: '5. Prikken over i-en',
      description:
        'En lysslynge i et tre, en god spilleliste og gode venner. Den siste magien skaper du selv.',
      iconColor: 'text-violet-400',
      shadowColor: '#a78bfa'
    }
  }
]

const edges = nodes
  .filter(n => n.id !== 'center')
  .map(node => ({
    id: `e-center-${node.id}`,
    sourceId: 'center',
    targetId: node.id,
    style: {
      stroke: (node.data as CustomNodeData).shadowColor,
      strokeWidth: 2
    }
  }))

// --- Hovedkomponenten ---
export default function BalpanneFlow() {
  const centerNode = nodes.find(n => n.id === 'center')!

  return (
    <div className='relative h-[980px] w-full overflow-hidden rounded-lg border border-neutral-800 bg-background dot-pattern'>
      {/* SVG-lerret for linjene */}
      <svg
        width='100%'
        height='100%'
        className='absolute inset-0'
        aria-hidden='true'
      >
        {edges.map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.sourceId)!
          const targetNode = nodes.find(n => n.id === edge.targetId)!

          const sourceX = sourceNode.position.x + sourceNode.width / 2
          const sourceY = sourceNode.position.y + 35
          const targetX = targetNode.position.x
          const targetY = targetNode.position.y + 90

          const pathD = `M ${sourceX},${sourceY} C ${sourceX + 50},${sourceY} ${
            targetX - 50
          },${targetY} ${targetX},${targetY}`

          return <path key={edge.id} d={pathD} style={edge.style} fill='none' />
        })}
      </svg>

      {/* Noder rendret som div-elementer */}
      {nodes.map(node => (
        <div
          key={node.id}
          className='absolute'
          style={{
            left: `${node.position.x}px`,
            top: `${node.position.y}px`
          }}
        >
          {node.type === 'default' && (
            <div
              className='flex items-center justify-center rounded-lg border border-neutral-700 p-3 text-center text-sm font-semibold'
              style={{
                width: `${node.width}px`,
                background: 'oklch(var(--sidebar-foreground))',
                color: 'oklch(var(--foreground))'
              }}
            >
              {node.data.label}
            </div>
          )}
          {node.type === 'custom' && (
            <div className='relative flex w-[280px] min-h-[180px] flex-col justify-center rounded-xl border border-neutral-800 bg-sidebar-foreground p-5'>
              <div
                className='absolute inset-0 rounded-lg blur-xl opacity-20'
                style={{ background: node.data.shadowColor }}
              />
              <div className='relative z-10'>
                <div className='mb-4 flex items-center gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background'>
                    {/* Nå vet TypeScript at node.data.icon er trygg å bruke her */}
                    <IconRenderer
                      name={node.data.icon}
                      className={`h-6 w-6 ${node.data.iconColor}`}
                    />
                  </div>
                  <h3 className='text-base font-semibold'>{node.data.label}</h3>
                </div>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {node.data.description}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
