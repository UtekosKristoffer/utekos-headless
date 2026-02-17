import { Check, Feather, Heart, Moon, type LucideIcon } from 'lucide-react'
export type IconName = keyof typeof iconMap
export const iconMap = {
  moon: Moon,
  feather: Feather,
  heart: Heart,
  check: Check
}

const layoutSize = 220
const centerX = 225
const centerY = 225
const nodeWidth = 160
const nodeHeight = 52
const centerNodeSize = 96

export const nodes = [
  {
    id: 'center',
    type: 'center',
    position: {
      x: centerX - centerNodeSize / 2,
      y: centerY - centerNodeSize / 2
    },
    width: centerNodeSize,
    height: centerNodeSize
  },
  {
    id: 'benefit-1',
    type: 'benefit',
    position: { x: centerX - layoutSize, y: centerY - layoutSize },
    width: nodeWidth,
    height: nodeHeight,
    data: {
      icon: 'moon' as IconName,
      text: 'Forlenget kveldene',
      color: '#60a5fa',
      iconColor: 'text-blue-400'
    }
  },
  {
    id: 'benefit-2',
    type: 'benefit',
    position: { x: centerX + layoutSize - nodeWidth, y: centerY - layoutSize },
    width: nodeWidth,
    height: nodeHeight,
    data: {
      icon: 'feather' as IconName,
      text: 'Overraskende lett',
      color: '#f472b6',
      iconColor: 'text-pink-400'
    }
  },
  {
    id: 'benefit-3',
    type: 'benefit',
    position: { x: centerX - layoutSize, y: centerY + layoutSize - nodeHeight },
    width: nodeWidth,
    height: nodeHeight,
    data: {
      icon: 'heart' as IconName,
      text: 'Gjennomført kvalitet',
      color: '#4ade80',
      iconColor: 'text-green-400'
    }
  },
  {
    id: 'benefit-4',
    type: 'benefit',
    position: {
      x: centerX + layoutSize - nodeWidth,
      y: centerY + layoutSize - nodeHeight
    },
    width: nodeWidth,
    height: nodeHeight,
    data: {
      icon: 'check' as IconName,
      text: 'Verdt hver krone',
      color: '#fb923c',
      iconColor: 'text-orange-400'
    }
  }
]

export const edges = [
  {
    id: 'e-center-1',
    sourceId: 'center',
    targetId: 'benefit-1',
    data: { color: '#60a5fa' }
  },
  {
    id: 'e-center-2',
    sourceId: 'center',
    targetId: 'benefit-2',
    data: { color: '#f472b6' }
  },
  {
    id: 'e-center-3',
    sourceId: 'center',
    targetId: 'benefit-3',
    data: { color: '#4ade80' }
  },
  {
    id: 'e-center-4',
    sourceId: 'center',
    targetId: 'benefit-4',
    data: { color: '#fb923c' }
  }
]
