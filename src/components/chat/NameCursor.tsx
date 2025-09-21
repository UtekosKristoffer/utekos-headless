// Path: src/components/chat/NameCursor.tsx

import { CursorIcon } from '@/components/icon/CursorIcon'
import { cn } from '@/lib/utils/className'
import type { Side } from '@types'

export function NameCursor({
  name,
  side,
  color,
  className
}: {
  name: string
  side: Side
  color: string
  className?: string
}) {
  return (
    <div className={cn('absolute z-10 animate-wander', className)} aria-hidden>
      <div className='flex items-center gap-1.5 animate-chip-pulse'>
        <CursorIcon side={side} style={{ color }} />
        <span
          className='rounded-md px-2 py-0.5 text-xs font-medium text-black'
          style={{ backgroundColor: color }}
        >
          {name}
        </span>
      </div>
    </div>
  )
}
