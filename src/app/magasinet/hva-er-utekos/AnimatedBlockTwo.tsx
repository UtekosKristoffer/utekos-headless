'use client'

import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils/className'
import type { ReactNode } from 'react'

interface AnimatedBlockProps {
  children?: ReactNode
  className?: string
  delay?: string
  threshold?: number
  triggerOnce?: boolean
}

export function AnimatedBlockTwo({
  children,
  className,
  delay = '0s',
  threshold = 0.2,
  triggerOnce = true
}: AnimatedBlockProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce
  })

  return (
    <div
      ref={ref}
      className={cn(className, inView && 'is-in-view')}
      style={{ '--transition-delay': delay } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
