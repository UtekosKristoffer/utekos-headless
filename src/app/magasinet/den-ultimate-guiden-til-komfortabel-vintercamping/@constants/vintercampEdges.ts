import type { Edge } from '@xyflow/react'

export const vintercampEdges: Edge[] = [
  // KORRIGERT: Går nå fra 'center' til 'c1'
  {
    id: 'ec-1',
    source: 'center',
    target: 'c1',
    type: 'smoothstep',
    style: { stroke: '#38bdf8', strokeWidth: 2 }
  },
  // KORRIGERT: Går nå fra 'center' til 'c2'
  {
    id: 'ec-2',
    source: 'center',
    target: 'c2',
    type: 'smoothstep',
    style: { stroke: '#34d399', strokeWidth: 2 }
  },
  // Denne var allerede korrekt
  {
    id: 'ec-3',
    source: 'center',
    target: 'c3',
    type: 'smoothstep',
    style: { stroke: '#f472b6', strokeWidth: 2 }
  }
]
