// Path: src/components/skeletons/FooterSkeleton.tsx

import { Skeleton } from '@/components/ui/skeleton'

export function FooterSkeleton() {
  return (
    <footer className='mt-auto border-t border-white/10 bg-sidebar-foreground py-12'>
      <div className='container mx-auto px-4 sm:px-8'>
        {/* FooterNavigation Skeleton */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <Skeleton className='mb-4 h-5 w-3/4' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-2/3' />
              </div>
            </div>
          ))}
        </div>

        {/* PaymentMethods Skeleton */}
        <div className='mt-12 border-t border-white/10 pt-8'>
          <div className='flex flex-wrap items-center justify-center gap-x-6 gap-y-4'>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className='h-6 w-16' />
            ))}
          </div>
        </div>

        {/* CopyrightNotice Skeleton */}
        <div className='mt-8 flex justify-center'>
          <Skeleton className='h-3 w-1/2' />
        </div>
      </div>
    </footer>
  )
}
