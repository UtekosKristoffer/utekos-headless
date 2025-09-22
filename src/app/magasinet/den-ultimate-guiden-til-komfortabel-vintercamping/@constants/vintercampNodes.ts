import { Position, type Node } from '@xyflow/react'
import { Coffee, Footprints, Wind } from 'lucide-react'

export const vintercampNodes: Node[] = [
  {
    id: 'center',
    position: { x: 250, y: 150 },
    data: { label: 'Livet på Vintercampingen' },
    type: 'input',
    style: {
      background: 'oklch(var(--sidebar-foreground))',
      color: 'oklch(var(--foreground))',
      border: '1px solid oklch(var(--border))',
      width: 180,
      textAlign: 'center'
    }
  },
  {
    id: 'c1',
    position: { x: 0, y: 0 },
    data: {
      icon: Wind,
      label: 'Lufting',
      description:
        'Luft ut kort og effektivt et par ganger om dagen for å redusere kondens.',
      iconColor: 'text-sky-400',
      shadowColor: '#38bdf8',
      // NYTT: Definerer at festepunktet skal være til høyre
      handle: { type: 'target', position: Position.Right }
    },
    type: 'custom'
  },
  {
    id: 'c2',
    position: { x: 500, y: 0 },
    data: {
      icon: Footprints,
      label: 'Kom deg ut',
      description:
        'Bruk de lyse timene. En gåtur i snøen gir energi og gjør det bedre å komme inn igjen.',
      iconColor: 'text-emerald-400',
      shadowColor: '#34d399',
      // NYTT: Definerer at festepunktet skal være til venstre
      handle: { type: 'target', position: Position.Left }
    },
    type: 'custom'
  },
  {
    id: 'c3',
    position: { x: 250, y: 300 },
    data: {
      icon: Coffee,
      label: 'Skap Hygge',
      description:
        'Bruk lysslynger for stemning og ha alltid varm drikke tilgjengelig på en termos.',
      iconColor: 'text-rose-400',
      shadowColor: '#f472b6',
      // NYTT: Definerer at festepunktet skal være på toppen
      handle: { type: 'target', position: Position.Top }
    },
    type: 'custom'
  }
]
