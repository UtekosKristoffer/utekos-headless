'use client'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import * as React from 'react'

import { cn } from '@/lib/utils/className'

// Definer et interface for å inkludere din nye prop
interface CustomScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  hideScrollbar?: boolean
}

// Definer et interface for å inkludere din nye prop
interface CustomScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  hideScrollbar?: boolean
}

const ScrollArea = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  CustomScrollAreaProps // Bruk det nye interfacet her
>(({ className, children, hideScrollbar = false, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    data-slot='scroll-area'
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      data-slot='scroll-area-viewport'
      className='size-full rounded-[inherit]'
    >
      {children}
    </ScrollAreaPrimitive.Viewport>

    {/* ENDRING: Render alltid ScrollBar og Corner, 
      men skjul dem visuelt med 'hidden' (display: none) hvis hideScrollbar er true.
      Dette sikrer at Radix-logikken for scrolling fortsatt fungerer.
    */}
    <ScrollBar className={cn(hideScrollbar && 'hidden')} />
    <ScrollAreaPrimitive.Corner className={cn(hideScrollbar && 'hidden')} />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    data-slot='scroll-area-scrollbar'
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical'
        && 'h-full w-2.5 border-l border-l-transparent p-px',
      orientation === 'horizontal'
        && 'h-2.5 flex-col border-t border-t-transparent p-px',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      data-slot='scroll-area-thumb'
      className='relative flex-1 rounded-full bg-border'
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
