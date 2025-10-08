import { cn } from '@/lib/utils/className'
import type { ReactNode } from 'react'

export function ChatBubble({
  side,
  children
}: {
  side: 'left' | 'right'
  children: ReactNode
}) {
  const justify = side === 'left' ? 'justify-start' : 'justify-end'
  return (
    <div className={cn('flex', justify)}>
      <div className='max-w-xs rounded-lg bg-sidebar-foreground p-3 sm:max-w-sm'>
        <div className='text-base leading-snug text-foreground/90'>
          {children}
        </div>
      </div>
    </div>
  )
}
