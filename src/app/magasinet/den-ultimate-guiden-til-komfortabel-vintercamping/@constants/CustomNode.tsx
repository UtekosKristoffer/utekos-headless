'use client'

import { Handle, Position } from '@xyflow/react'
import { memo } from 'react'

// Definerer datatypen for klarhet
interface CustomNodeData {
  icon: any
  label: string
  description: string
  iconColor: string
  shadowColor?: string
  // NYTT: Et valgfritt objekt for å styre festepunktet
  handle?: {
    type: 'source' | 'target'
    position: Position
  }
}

const CustomNode = memo(({ data }: { data: CustomNodeData }) => {
  const Icon = data.icon
  const handleStyle =
    data.shadowColor ?
      {
        borderColor: data.shadowColor,
        boxShadow: `0 0 8px 1px ${data.shadowColor}`
      }
    : {}

  return (
    <div className='bg-background border border-neutral-700 rounded-lg p-4 w-64 shadow-lg'>
      {/* KORRIGERT: Viser kun ett festepunkt hvis det er definert i data */}
      {data.handle && (
        <Handle
          type={data.handle.type}
          position={data.handle.position}
          style={handleStyle}
        />
      )}

      <div className='flex items-center gap-3 mb-2'>
        <Icon className={`h-5 w-5 ${data.iconColor}`} />
        <h4 className='font-bold text-foreground text-base'>{data.label}</h4>
      </div>
      <p className='text-muted-foreground text-sm'>{data.description}</p>
    </div>
  )
})
CustomNode.displayName = 'CustomNode'

export default CustomNode
export const nodeTypes = {
  custom: CustomNode
}
