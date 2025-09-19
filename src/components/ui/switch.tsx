'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import * as React from 'react'

import { cn } from '@/lib/utils/className'

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      className={cn(
        'peer data-[state=checked]:bg-button data-[state=unchecked]:bg-[oklch(0.269_0_0)] focus-visible:border-ring focus-visible:ring-ring/50 relative h-[1.6875rem] w-[2.875rem] shrink-0 cursor-pointer rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(
          'bg-foreground pointer-events-none absolute left-[1px] top-1/2 block size-[1.5625rem] -translate-y-1/2 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[1.1875rem] data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
