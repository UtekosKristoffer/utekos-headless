import { type Node } from '@xyflow/react'
import { Layers, Lightbulb, Music, Thermometer } from 'lucide-react'
export const initialNodes: Node[] = [
  {
    id: 'center',
    position: { x: 250, y: 200 },
    data: { label: 'Den Perfekte Hyttekosen' },
    type: 'default',
    style: {
      background: 'oklch(var(--sidebar-foreground))',
      color: 'oklch(var(--foreground))',
      border: '1px solid oklch(var(--border))',
      width: 180,
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: 600,
      borderRadius: '8px',
      padding: '12px'
    }
  },
  {
    id: 'lys',
    position: { x: 230, y: 50 },
    data: {
      icon: Lightbulb,
      label: 'Lys',
      description:
        'Levende lys, dimmere og lysslynger skaper en lun og innbydende atmosfære.',
      iconColor: 'text-amber-400',
      shadowColor: '#facc15',
      handle: { type: 'target', position: 'bottom' }
    },
    type: 'custom'
  },
  {
    id: 'lyd',
    position: { x: 0, y: 190 },
    data: {
      icon: Music,
      label: 'Lyd',
      description:
        'Knitring fra peisen, en rolig spilleliste eller bare den dype stillheten fra naturen.',
      iconColor: 'text-violet-400',
      shadowColor: '#a78bfa',
      handle: { type: 'target', position: 'right' }
    },
    type: 'custom'
  },
  {
    id: 'tekstur',
    position: { x: 480, y: 190 },
    data: {
      icon: Layers,
      label: 'Tekstur',
      description:
        'Myke ullpledd, saueskinn og grovt treverk. Kontraster som er gode å ta og se på.',
      iconColor: 'text-orange-400',
      shadowColor: '#fb923c',
      handle: { type: 'target', position: 'left' }
    },
    type: 'custom'
  },
  {
    id: 'varme',
    position: { x: 230, y: 350 },
    data: {
      icon: Thermometer,
      label: 'Varme',
      description:
        'Den lune peisvarmen inne, og muligheten til å ta med komforten ut på terrassen.',
      iconColor: 'text-rose-400',
      shadowColor: '#f472b6',
      handle: { type: 'target', position: 'top' }
    },
    type: 'custom'
  }
]
