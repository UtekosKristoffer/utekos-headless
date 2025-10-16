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
    width: 260,
    height: 190,
    data: {
      icon: 'lightbulb',
      label: 'Lys',
      description:
        'Levende lys i vinduskarmen, dimmere inne, og lysslynger på terrassen. Lyset som skaper den varme, innbydende stemningen.',
      iconColor: 'text-amber-400',
      shadowColor: '#facc15',
      handlePosition: 'top'
    }
  },
  {
    id: 'tekstur',
    type: 'custom',
    position: { x: 320, y: 150 },
    width: 260,
    height: 190,
    data: {
      icon: 'layers',
      label: 'Tekstur',
      description:
        'Det myke ullpleddet over skuldrene, saueskinn i stolene, og det grovstilte tømmeret. Kontraster som er gode både å ta på og se på.',
      iconColor: 'text-orange-400',
      shadowColor: '#fb923c',
      handlePosition: 'top'
    }
  },
  {
    id: 'lyd',
    type: 'custom',
    position: { x: 20, y: 360 },
    width: 260,
    height: 190,
    data: {
      icon: 'music',
      label: 'Lyd',
      description:
        'Det lave knitrende fra peisen, en rolig spilleliste i bakgrunnen, eller bare den dype, fredfulle stillheten fra skogen.',
      iconColor: 'text-violet-400',
      shadowColor: '#a78bfa',
      handlePosition: 'top'
    }
  },
  {
    id: 'varme',
    type: 'custom',
    position: { x: 320, y: 360 },
    width: 260,
    height: 190,
    data: {
      icon: 'thermometer',
      label: 'Varme',
      description:
        'Den lune peisvarmen inne som får deg til å slappe helt av. Og muligheten til å ta komforten med deg ut når kvelden blir kjølig.',
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
