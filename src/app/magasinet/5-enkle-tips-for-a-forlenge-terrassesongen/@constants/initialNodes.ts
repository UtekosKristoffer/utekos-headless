import { Position, type Node } from '@xyflow/react'
import { Coffee, Layers, Lightbulb, Thermometer, Wind } from 'lucide-react'

export const initialNodes: Node[] = [
  {
    id: 'center',
    position: { x: 400, y: 220 },
    data: { label: 'Forleng Terrassesesongen' },
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
    id: 'tekstiler',
    position: { x: 0, y: 0 },
    data: {
      icon: Layers,
      label: '1. Tekstiler & Pledd',
      description:
        'Myke ullpledd, puter og saueskinn isolerer og skaper en umiddelbar følelse av lunhet.',
      iconColor: 'text-orange-400',
      shadowColor: '#fb923c',
      handle: { type: 'target', position: Position.Right }
    },
    type: 'custom'
  },
  {
    id: 'belysning',
    position: { x: 0, y: 220 },
    data: {
      icon: Lightbulb,
      label: '2. Riktig Belysning',
      description:
        'Varme, dempede lyskilder som lysslynger og lykter skaper en intim og trygg atmosfære.',
      iconColor: 'text-amber-400',
      shadowColor: '#facc15',
      handle: { type: 'target', position: Position.Right }
    },
    type: 'custom'
  },
  {
    id: 'levegg',
    position: { x: 0, y: 440 },
    data: {
      icon: Wind,
      label: '3. Lun Levegg',
      description:
        'En enkel levegg eller noen store planter kan stoppe den kjølige trekken og skape en lun krok.',
      iconColor: 'text-cyan-400',
      shadowColor: '#22d3ee',
      handle: { type: 'target', position: Position.Right }
    },
    type: 'custom'
  },
  {
    id: 'varme',
    position: { x: 800, y: 110 },
    data: {
      icon: Thermometer,
      label: '4. Varme fra Utekos',
      description:
        'Den mest effektive måten å holde seg varm på. En personlig varmekilde som fungerer umiddelbart.',
      iconColor: 'text-rose-400',
      shadowColor: '#f472b6',
      handle: { type: 'target', position: Position.Left }
    },
    type: 'custom'
  },
  {
    id: 'drikke',
    position: { x: 800, y: 330 },
    data: {
      icon: Coffee,
      label: '5. Varme Drikker',
      description:
        'En kopp te, kakao eller kaffe varmer fra innsiden og er en essensiell del av kosen.',
      iconColor: 'text-emerald-400',
      shadowColor: '#4ade80',
      handle: { type: 'target', position: Position.Left }
    },
    type: 'custom'
  }
]
