import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils/className'

export function QualitySectionSkeleton() {
  const cardClasses =
    'relative overflow-hidden rounded-xl border border-neutral-800 bg-sidebar-foreground p-8'

  return (
    <section className='py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 grid-rows-2 gap-4 lg:grid-cols-3'>
          {/* Main Card Skeleton */}
          <div
            className={cn(
              cardClasses,
              'flex flex-col justify-between lg:col-span-2 lg:row-span-2'
            )}
          >
            <div>
              <Skeleton className='h-10 w-3/4 max-w-md' />
              <div className='mt-4 max-w-xl space-y-2'>
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-5/6' />
              </div>
            </div>
            <div className='mt-8'>
              <Skeleton className='h-11 w-52' />
            </div>
          </div>

          {/* Small Cards Skeleton */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className={cn(cardClasses, 'flex flex-col justify-center')}
            >
              <Skeleton className='h-12 w-12 rounded-lg' />
              <Skeleton className='mt-4 h-5 w-2/3' />
              <div className='mt-1 space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-4/5' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
