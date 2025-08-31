// Path: src/components/cart/CartBodySkeleton.tsx
import * as React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Renders a skeleton loader for the cart body.
 */
export function CartBodySkeleton() {
  return (
    <div className='flex-1 overflow-y-auto p-4'>
      <ul className='space-y-4'>
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className='flex items-start gap-4'>
            <Skeleton className='h-20 w-20 shrink-0 rounded-md' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-4 w-1/2' />
              <div className='mt-2 flex items-center gap-2'>
                <Skeleton className='size-9 rounded-md' />
                <Skeleton className='h-6 w-8' />
                <Skeleton className='size-9 rounded-md' />
              </div>
            </div>
            <div className='flex flex-col items-end gap-2'>
              <Skeleton className='h-5 w-12' />
              <Skeleton className='h-5 w-16' />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
