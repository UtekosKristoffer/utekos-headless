import { Skeleton } from '@/components/ui/skeleton'
export function FeaturedProductsSkeleton() {
  return (
    <div className='container md:max-w-7xl max-w-[95%] mx-auto py-12 lg:py-16 sm:py-16'>
      <Skeleton className='h-10 w-64 mx-auto mb-12' />
      <Skeleton className='h-[400px] w-full' />
    </div>
  )
}
