import { ALargeSmall, Car, Droplets, Wrench } from 'lucide-react'

import { type Node } from '@xyflow/react'

export const bobilPrepNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 150 },
    data: { label: 'Bobilen må være klar' },
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
    id: '2',
    position: { x: 350, y: 0 },
    data: {
      icon: ALargeSmall,
      label: 'Isolasjon',
      description:
        'Sjekk tetningslister. Bruk isolasjonsmatter i førerhuset for å minimere varmetap.',
      iconColor: 'text-blue-400'
    },
    type: 'custom'
  },
  {
    id: '3',
    position: { x: 350, y: 110 },
    data: {
      icon: Wrench,
      label: 'Varmesystem',
      description:
        'Test Alde/Truma. Sørg for nok propan-gass og åpne alle luftdyser for sirkulasjon.',
      iconColor: 'text-orange-400'
    },
    type: 'custom'
  },
  {
    id: '4',
    position: { x: 350, y: 220 },
    data: {
      icon: Droplets,
      label: 'Vannsystem',
      description:
        'Sikre at tanker/rør er oppvarmet. Bruk frostvæske i gråvannstanken for å unngå is.',
      iconColor: 'text-cyan-400'
    },
    type: 'custom'
  },
  {
    id: '5',
    position: { x: 350, y: 330 },
    data: {
      icon: Car,
      label: 'Dekk & Kjetting',
      description:
        'Gode vinterdekk er et krav. Ta alltid med kjettinger for sikkerhet på fjellet.',
      iconColor: 'text-green-400'
    },
    type: 'custom'
  }
]
