// Path: src/components/skeletons/HeaderSkeleton.tsx

import { Skeleton } from '@/components/ui/skeleton'
export function HeaderSkeleton() {
  return (
    <header className='sticky top-0 z-50 border-b border-white/10 bg-sidebar-foreground py-3'>
      <div className='container mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        <Skeleton className='h-8 w-28' />
        <div className='hidden items-center gap-6 lg:flex'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-16' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='hidden h-9 w-[14rem] md:block' />
          <Skeleton className='h-11 w-11 rounded-md' />
          <Skeleton className='h-11 w-11 rounded-md lg:hidden' />
        </div>
      </div>
    </header>
  )
}
