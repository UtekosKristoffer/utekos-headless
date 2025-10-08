import { Wind, Footprints, Coffee } from 'lucide-react'

// --- Types and helpers ---
export const iconMap = {
  wind: Wind,
  footprints: Footprints,
  coffee: Coffee
}
export type IconName = keyof typeof iconMap
export type InputNodeData = { label: string }
export type CustomNodeData = {
  icon: IconName
  label: string
  description: string
  iconColor: string
}

// Discriminated union for nodes
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

// --- Node Data (with precise type) ---
export const nodes: FlowNode[] = [
  {
    id: 'center',
    type: 'input',
    position: { x: (900 - 180) / 2, y: 0 },
    width: 180,
    height: 100,
    data: { label: 'Livet på vintercampingen' }
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
      label: 'Skap hygge',
      description:
        'Bruk lysslynger for stemning og ha alltid varm drikke tilgjengelig på en termos.',
      iconColor: 'text-rose-400'
    }
  }
]

export const edges = [
  { id: 'ec-1', source: 'center', target: 'c1', style: { stroke: '#38bdf8' } },
  { id: 'ec-2', source: 'center', target: 'c2', style: { stroke: '#34d399' } },
  { id: 'ec-3', source: 'center', target: 'c3', style: { stroke: '#f472b6' } }
]
