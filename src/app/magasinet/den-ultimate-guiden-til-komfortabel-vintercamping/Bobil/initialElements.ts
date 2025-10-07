import { ALargeSmall, Car, Droplets, Wrench } from 'lucide-react'
export const iconMap = {
  'a-large-small': ALargeSmall,
  'wrench': Wrench,
  'droplets': Droplets,
  'car': Car
}
export type IconName = keyof typeof iconMap
export type InputNodeData = { label: string }
export type CustomNodeData = {
  icon: IconName
  label: string
  description: string
  iconColor: string
}

// Definerer en "diskriminert union" for nodene
export type FlowNode =
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
export const nodes: FlowNode[] = [
  {
    id: '1',
    type: 'input',
    position: { x: 0, y: 150 },
    width: 180,
    height: 120,
    data: { label: 'Klargjøring av bobilen' }
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
      description: 'Hold tanker/rør varme. Bruk frostvæske i gråvannstanken.',
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
      label: 'Dekk og kjetting',
      description:
        'Gode vinterdekk er et krav. Ta alltid med kjettinger for sikkerhet på fjellet.',
      iconColor: 'text-green-400'
    }
  }
]

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', style: { stroke: '#60a5fa' } },
  { id: 'e1-3', source: '1', target: '3', style: { stroke: '#fb923c' } },
  { id: 'e1-4', source: '1', target: '4', style: { stroke: '#22d3ee' } },
  { id: 'e1-5', source: '1', target: '5', style: { stroke: '#4ade80' } }
]
