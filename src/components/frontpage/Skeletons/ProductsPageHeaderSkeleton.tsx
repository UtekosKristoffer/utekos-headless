import { Skeleton } from '@/components/ui/skeleton'

export function ProductsPageHeaderSkeleton() {
  return (
    <header className='mb-16 text-center'>
      <Skeleton className='mx-auto h-12 w-3/4 max-w-xl' />
      <div className='mx-auto mt-4 max-w-2xl space-y-2'>
        <Skeleton className='h-5 w-full' />
        <Skeleton className='h-5 w-5/6' />
      </div>
    </header>
  )
}
