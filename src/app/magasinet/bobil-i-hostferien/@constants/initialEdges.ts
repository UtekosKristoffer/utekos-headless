import type { Edge } from '@xyflow/react'

export const initialEdges: Edge[] = [
  {
    id: 'e-vest-1',
    source: 'start-vest',
    target: 'hardangervidda',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#facc15', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-vest-2',
    source: 'hardangervidda',
    target: 'hardanger',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#f87171', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-ost-1',
    source: 'start-ost',
    target: 'rondane',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#34d399', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-ost-2',
    source: 'rondane',
    target: 'roros',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#22d3ee', strokeWidth: 2, strokeDasharray: '5 5' }
  }
]
