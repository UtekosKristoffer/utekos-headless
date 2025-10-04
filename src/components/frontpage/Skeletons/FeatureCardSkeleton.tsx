// Path: src/components/skeletons/FeatureCardSkeleton.tsx

import { Skeleton } from '@/components/ui/skeleton'

export function FeatureCardSkeleton() {
  return (
    <div className='relative overflow-hidden rounded-lg border border-neutral-800 bg-sidebar-foreground p-4'>
      <div className='relative z-10 flex items-start gap-4'>
        {/* Icon Placeholder */}
        <Skeleton className='h-12 w-12 rounded-lg' />

        {/* Text Placeholder */}
        <div className='flex-1 space-y-2 py-1'>
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-3 w-5/6' />
        </div>
      </div>
    </div>
  )
}
