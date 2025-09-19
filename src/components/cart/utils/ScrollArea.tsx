// Path: src/components/cart/ScrollArea.tsx
import { cn } from '@/lib/utils/className'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef
} from 'react'

const ScrollArea = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className='h-full w-full rounded-[inherit]'>
      {children}
    </ScrollAreaPrimitive.Viewport>

    {/* Scrollbar (vertikal som default) */}
    <ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Thumb />
    </ScrollAreaPrimitive.Scrollbar>

    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export { ScrollArea }
