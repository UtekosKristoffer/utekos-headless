// Path: src/app/magasinet/slik-skaper-du-den-perfekte-stemningen-pa-hytten/%40constants/CustomNode.tsx

'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { LucideIcon } from 'lucide-react'
import { memo } from 'react'

interface CustomNodeData {
  icon: LucideIcon
  label: string
  description: string
  iconColor: string
  shadowColor: string
  handle?: {
    type: 'source' | 'target'
    position: string
  }
}

function CustomNode({ data }: NodeProps) {
  // Dobbel type-cast via unknown som TypeScript foreslår
  const nodeData = data as unknown as CustomNodeData
  const Icon = nodeData.icon

  // Map handle position strings to Position enum
  const getHandlePosition = (position?: string): Position => {
    switch (position) {
      case 'top':
        return Position.Top
      case 'right':
        return Position.Right
      case 'bottom':
        return Position.Bottom
      case 'left':
        return Position.Left
      default:
        return Position.Top
    }
  }

  return (
    <>
      {nodeData.handle && (
        <Handle
          type={nodeData.handle.type}
          position={getHandlePosition(nodeData.handle.position)}
          className='!bg-transparent !border-none !w-2 !h-2'
          style={{
            background: nodeData.shadowColor,
            filter: 'blur(4px)',
            opacity: 0.5
          }}
        />
      )}

      <Card className='w-[220px] border-neutral-800 bg-sidebar-foreground relative'>
        <div
          className='absolute inset-0 rounded-lg blur-xl opacity-20'
          style={{ background: nodeData.shadowColor }}
        />
        <CardContent className='p-5 relative z-10'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-background border border-neutral-700'>
              <Icon className={`h-6 w-6 ${nodeData.iconColor}`} />
            </div>
            <h3 className='font-semibold text-base'>{nodeData.label}</h3>
          </div>
          <p className='text-sm text-muted-foreground leading-relaxed'>
            {nodeData.description}
          </p>
        </CardContent>
      </Card>
    </>
  )
}

export default memo(CustomNode)
