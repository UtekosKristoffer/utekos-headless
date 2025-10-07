import { Layers, Lightbulb, Music, Thermometer } from 'lucide-react'
export const iconMap = {
  lightbulb: Lightbulb,
  music: Music,
  layers: Layers,
  thermometer: Thermometer
}
export type IconName = keyof typeof iconMap

export type NodeData = {
  icon?: IconName
  label: string
  description?: string
  iconColor?: string
  shadowColor?: string
  handlePosition?: 'top' | 'right' | 'bottom' | 'left'
}

export type FlowNode = {
  id: string
  type: 'default' | 'custom'
  position: { x: number; y: number }
  width: number
  height: number
  data: NodeData
}

// --- Ny, mobilvennlig og balansert node-data ---
export const nodes: FlowNode[] = [
  {
    id: 'center',
    type: 'default',
    position: { x: 210, y: 20 },
    width: 180,
    height: 70,
    data: { label: 'Den perfekte hyttekosen' }
  },
  {
    id: 'lys',
    type: 'custom',
    position: { x: 20, y: 150 },
    width: 260, // Litt bredere for å unngå tekstbryt
    height: 180, // Økt høyde
    data: {
      icon: 'lightbulb',
      label: 'Lys',
      description:
        'Levende lys, dimmere og lysslynger skaper en lun og innbydende atmosfære.',
      iconColor: 'text-amber-400',
      shadowColor: '#facc15',
      handlePosition: 'top' // Alle kobler til toppen nå
    }
  },
  {
    id: 'tekstur',
    type: 'custom',
    position: { x: 320, y: 150 },
    width: 260,
    height: 180,
    data: {
      icon: 'layers',
      label: 'Tekstur',
      description:
        'Myke ullpledd, saueskinn og grovt treverk. Kontraster som er gode å ta og se på.',
      iconColor: 'text-orange-400',
      shadowColor: '#fb923c',
      handlePosition: 'top'
    }
  },
  {
    id: 'lyd',
    type: 'custom',
    position: { x: 20, y: 350 },
    width: 260,
    height: 180,
    data: {
      icon: 'music',
      label: 'Lyd',
      description:
        'Knitring fra peisen, en rolig spilleliste eller bare den dype stillheten fra naturen.',
      iconColor: 'text-violet-400',
      shadowColor: '#a78bfa',
      handlePosition: 'top'
    }
  },
  {
    id: 'varme',
    type: 'custom',
    position: { x: 320, y: 350 },
    width: 260,
    height: 180,
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

export const edges = [
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
