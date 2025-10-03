// Path: src/app/magasinet/5-enkle-tips-for-a-forlenge-terrassesongen/initialElements.ts

import { Position, type Edge, type Node } from '@xyflow/react'
import { Coffee, Layers, Lightbulb, Thermometer, Wind } from 'lucide-react'

const NODE_WIDTH = 300
const NODE_HEIGHT = 120
const VERTICAL_GAP = 100
const HORIZONTAL_GAP = 10
const MOBILE_VERTICAL_GAP = 40
const DEFAULT_NODE_WIDTH = 250

export const getLayoutedElements = (
  nodes: Node[],
  isMobile: boolean
): { nodes: Node[] } => {
  if (isMobile) {
    const visibleNodes = nodes.filter(
      n => n.id !== 'center' && !n.id.startsWith('group-')
    )
    const layoutedNodes = visibleNodes.map((node, index) => ({
      ...node,
      position: { x: 0, y: index * (NODE_HEIGHT + MOBILE_VERTICAL_GAP) }
    }))
    return { nodes: layoutedNodes }
  }

  const centerNode = nodes.find(node => node.id === 'center')!
  const surroundingNodes = nodes.filter(
    node => node.id !== 'center' && !node.id.startsWith('group-')
  )

  const totalWidth =
    surroundingNodes.length * NODE_WIDTH
    + (surroundingNodes.length - 1) * HORIZONTAL_GAP
  const startX = -totalWidth / 2

  const positionedSurroundingNodes = surroundingNodes.map((node, index) => ({
    ...node,
    position: {
      x: startX + index * (NODE_WIDTH + HORIZONTAL_GAP),
      y: NODE_HEIGHT + VERTICAL_GAP
    },
    data: {
      ...node.data,
      handlePosition: Position.Top
    }
  }))

  const middleIndex = Math.floor(surroundingNodes.length / 2)
  const middleNode = positionedSurroundingNodes[middleIndex]!
  const middleNodeCenterX = middleNode.position.x + NODE_WIDTH / 2

  centerNode.position = {
    x: middleNodeCenterX - DEFAULT_NODE_WIDTH / 2,
    y: 0
  }

  const layoutedNodes: Node[] = [centerNode, ...positionedSurroundingNodes]

  return { nodes: layoutedNodes }
}

export const initialEdges: Edge[] = [
  {
    id: 'e-c-tekstiler',
    source: 'center',
    target: 'tekstiler',
    type: 'default',
    animated: true,
    style: { stroke: '#fb923c', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-c-belysning',
    source: 'center',
    target: 'belysning',
    type: 'default',
    animated: true,
    style: { stroke: '#facc15', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-c-levegg',
    source: 'center',
    target: 'levegg',
    type: 'default',
    animated: true,
    style: { stroke: '#22d3ee', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-c-varme',
    source: 'center',
    target: 'varme',
    type: 'default',
    animated: true,
    style: { stroke: '#f472b6', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-c-drikke',
    source: 'center',
    target: 'drikke',
    type: 'default',
    animated: true,
    style: { stroke: '#4ade80', strokeWidth: 2, strokeDasharray: '5 5' }
  }
]

export const initialNodes: Node[] = [
  { id: 'group-left', position: { x: 0, y: 0 }, data: {} },
  { id: 'group-right', position: { x: 0, y: 0 }, data: {} },
  {
    id: 'center',
    position: { x: 0, y: 0 },
    data: { label: 'Forleng Terrassesesongen' },
    type: 'default',
    style: {
      background: 'oklch(var(--sidebar-foreground))',
      color: 'oklch(var(--foreground))',
      border: '1px solid oklch(var(--neutral-border))',
      width: DEFAULT_NODE_WIDTH,
      textAlign: 'center',
      fontSize: '22px',
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
      handle: { type: 'target', position: Position.Top }
    },
    type: 'custom'
  },
  {
    id: 'belysning',
    position: { x: 0, y: 0 },
    data: {
      icon: Lightbulb,
      label: '2. Riktig Belysning',
      description:
        'Varme, dempede lyskilder som lysslynger og lykter skaper en intim og trygg atmosfære.',
      iconColor: 'text-amber-400',
      shadowColor: '#facc15',
      handle: { type: 'target', position: Position.Top }
    },
    type: 'custom'
  },
  {
    id: 'levegg',
    position: { x: 0, y: 0 },
    data: {
      icon: Wind,
      label: '3. Lun Levegg',
      description:
        'En enkel levegg eller noen store planter kan stoppe den kjølige trekken og skape en lun krok.',
      iconColor: 'text-cyan-400',
      shadowColor: '#22d3ee',
      handle: { type: 'target', position: Position.Top }
    },
    type: 'custom'
  },
  {
    id: 'varme',
    position: { x: 0, y: 0 },
    data: {
      icon: Thermometer,
      label: '4. Varme fra Utekos',
      description:
        'Den mest effektive måten å holde seg varm på. En personlig varmekilde som fungerer umiddelbart.',
      iconColor: 'text-rose-400',
      shadowColor: '#f472b6',
      handle: { type: 'target', position: Position.Top }
    },
    type: 'custom'
  },
  {
    id: 'drikke',
    position: { x: 0, y: 0 },
    data: {
      icon: Coffee,
      label: '5. Varme Drikker',
      description:
        'En kopp te, kakao eller kaffe varmer fra innsiden og er en essensiell del av kosen.',
      iconColor: 'text-emerald-400',
      shadowColor: '#4ade80',
      handle: { type: 'target', position: Position.Top }
    },
    type: 'custom'
  }
]

export const layoutEdges: Edge[] = [
  { id: 'l-center-left', source: 'center', target: 'group-left' },
  { id: 'l-center-right', source: 'center', target: 'group-right' },
  { id: 'l-left-tekstiler', source: 'group-left', target: 'tekstiler' },
  { id: 'l-tekstiler-belysning', source: 'tekstiler', target: 'belysning' },
  { id: 'l-belysning-levegg', source: 'belysning', target: 'levegg' },
  { id: 'l-right-varme', source: 'group-right', target: 'varme' },
  { id: 'l-varme-drikke', source: 'varme', target: 'drikke' }
]
