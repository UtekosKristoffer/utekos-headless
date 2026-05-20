import { Check, Feather, Heart, Moon } from 'lucide-react'

export type IconName = keyof typeof iconMap

export const iconMap = {
  moon: Moon,
  feather: Feather,
  heart: Heart,
  check: Check
}

const centerX = 225
const centerY = 225
const nodeWidth = 200
const nodeHeight = 52
const centerNodeSize = 108
const offsetX = 225
const offsetY = 182

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
    position: { x: centerX - offsetX, y: centerY - offsetY },
    width: nodeWidth,
    height: nodeHeight,
    data: {
      icon: 'moon' as IconName,
      text: 'Forlenget kveldene',
      color: 'var(--ancient-water)',
      iconColor: 'text-cloud-dancer'
    }
  },
  {
    id: 'benefit-2',
    type: 'benefit',
    position: { x: centerX + offsetX - nodeWidth, y: centerY - offsetY },
    width: nodeWidth,
    height: nodeHeight,
    data: {
      icon: 'feather' as IconName,
      text: 'Overraskende lett',
      color: 'var(--overcast)',
      iconColor: 'text-cloud-dancer'
    }
  },
  {
    id: 'benefit-3',
    type: 'benefit',
    position: { x: centerX - offsetX, y: centerY + offsetY - nodeHeight },
    width: nodeWidth,
    height: nodeHeight,
    data: {
      icon: 'heart' as IconName,
      text: 'Gjennomført kvalitet',
      color: 'var(--bleached-mauve)',
      iconColor: 'text-cloud-dancer'
    }
  },
  {
    id: 'benefit-4',
    type: 'benefit',
    position: {
      x: centerX + offsetX - nodeWidth,
      y: centerY + offsetY - nodeHeight
    },
    width: nodeWidth,
    height: nodeHeight,
    data: {
      icon: 'check' as IconName,
      text: 'Verdt hver krone',
      color: 'var(--dusted-peri)',
      iconColor: 'text-cloud-dancer'
    }
  }
]

export const edges = [
  {
    id: 'e-center-1',
    sourceId: 'center',
    targetId: 'benefit-1',
    data: { color: 'var(--ancient-water)' }
  },
  {
    id: 'e-center-2',
    sourceId: 'center',
    targetId: 'benefit-2',
    data: { color: 'var(--overcast)' }
  },
  {
    id: 'e-center-3',
    sourceId: 'center',
    targetId: 'benefit-3',
    data: { color: 'var(--bleached-mauve)' }
  },
  {
    id: 'e-center-4',
    sourceId: 'center',
    targetId: 'benefit-4',
    data: { color: 'var(--dusted-peri)' }
  }
]
