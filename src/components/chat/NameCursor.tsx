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
      <div className='flex animate-chip-pulse items-center gap-1.5'>
        <CursorIcon side={side} style={{ color }} />
        <span
          className='rounded-md px-2 py-0.5 text-xs font-semibold text-foreground shadow-sm'
          style={{ backgroundColor: color }}
        >
          {name}
        </span>
      </div>
    </div>
  )
}
