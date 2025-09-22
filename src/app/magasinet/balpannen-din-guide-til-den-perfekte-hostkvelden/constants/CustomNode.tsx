// Path: src/app/magasinet/balpannen-din-guide-til-den-perfekte-hostkvelden/constants/CustomNode.tsx
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
}

function CustomNode({ data }: NodeProps) {
  const nodeData = data as unknown as CustomNodeData
  const Icon = nodeData.icon

  const handleStyle = {
    background: nodeData.shadowColor,
    filter: 'blur(4px)',
    opacity: 0.5
  }

  return (
    <>
      {/* KORRIGERT: Har nå et fast festepunkt på toppen (target) og i bunnen (source) */}
      <Handle
        type='target'
        position={Position.Top}
        className='!bg-transparent !border-none !w-2 !h-2'
        style={handleStyle}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        className='!bg-transparent !border-none !w-2 !h-2'
        style={handleStyle}
      />

      <Card className='w-[280px] min-h-[180px] border-neutral-800 bg-sidebar-foreground relative flex flex-col justify-center'>
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
