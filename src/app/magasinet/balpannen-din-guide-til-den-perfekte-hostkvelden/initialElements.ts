import {
  ListChecks,
  MapPin,
  ShoppingBasket,
  Sparkles,
  UserCheck
} from 'lucide-react'

export const iconMap = {
  'map-pin': MapPin,
  'list-checks': ListChecks,
  'shopping-basket': ShoppingBasket,
  'user-check': UserCheck,
  'sparkles': Sparkles
}
export type IconName = keyof typeof iconMap

export type DefaultNodeData = { label: string }
export type CustomNodeData = {
  icon: IconName
  label: string
  description: string
  iconColor: string
  shadowColor: string
}

// Felles type for alle noder for å sikre at alle har dimensjoner
export type FlowNode = {
  id: string
  type: 'default' | 'custom'
  position: { x: number; y: number }
  width: number
  height: number
  data: DefaultNodeData | CustomNodeData
}

export const nodes: FlowNode[] = [
  {
    id: 'center',
    type: 'default',
    position: { x: 50, y: 380 },
    width: 220,
    height: 70, // Lagt til høyde for presis beregning
    data: { label: 'De 5 P-ene for perfekt bålkos' }
  },
  {
    id: 'plassering',
    type: 'custom',
    position: { x: 350, y: 0 },
    width: 280,
    height: 180, // Lagt til høyde
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
    height: 180, // Lagt til høyde
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
    height: 180, // Lagt til høyde
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
    height: 180, // Lagt til høyde
    data: {
      icon: 'user-check' as IconName,
      label: '4. Personlig komfort',
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
    height: 180, // Lagt til høyde
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

export const edges = nodes
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
