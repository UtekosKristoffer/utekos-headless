import type { Edge } from '@xyflow/react'

export const initialEdges: Edge[] = [
  // KORRIGERT: Ledningene er nå seriekoblet nedover i hver kolonne
  // Ute
  {
    id: 'e-ute-1',
    source: 'ute',
    target: 'tak',
    type: 'smoothstep',
    style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-ute-2',
    source: 'tak',
    target: 'vannkraner',
    type: 'smoothstep',
    style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-ute-3',
    source: 'vannkraner',
    target: 'mobler',
    type: 'smoothstep',
    style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 5' }
  },

  // Inne
  {
    id: 'e-inne-1',
    source: 'inne',
    target: 'mus',
    type: 'smoothstep',
    style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-inne-2',
    source: 'mus',
    target: 'kjoleskap',
    type: 'smoothstep',
    style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-inne-3',
    source: 'kjoleskap',
    target: 'tekstiler',
    type: 'smoothstep',
    style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5 5' }
  },

  // Systemer
  {
    id: 'e-systemer-1',
    source: 'systemer',
    target: 'vann',
    type: 'smoothstep',
    style: { stroke: '#22d3ee', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-systemer-2',
    source: 'vann',
    target: 'strom',
    type: 'smoothstep',
    style: { stroke: '#22d3ee', strokeWidth: 2, strokeDasharray: '5 5' }
  },
  {
    id: 'e-systemer-3',
    source: 'strom',
    target: 'personlig-komfort',
    type: 'smoothstep',
    style: { stroke: '#f472b6', strokeWidth: 2, strokeDasharray: '5 5' }
  }
]
