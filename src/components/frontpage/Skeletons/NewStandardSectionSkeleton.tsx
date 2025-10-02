import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils/className'

export function NewStandardSectionSkeleton() {
  const cardBaseClasses =
    'absolute w-full max-w-sm rounded-lg border border-neutral-800 h-48'

  return (
    <section className='py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='overflow-hidden rounded-xl border border-neutral-800'>
          <div className='grid lg:grid-cols-2'>
            {/* --- Venstre kolonne-skeleton --- */}
            <div className='flex flex-col justify-between bg-sidebar-foreground p-8 lg:p-12'>
              <div>
                <Skeleton className='h-10 w-3/4' />
                <div className='mt-4 space-y-2'>
                  <Skeleton className='h-6 w-full' />
                  <Skeleton className='h-6 w-5/6' />
                </div>
              </div>
              {/* InfoCardStack Skeleton */}
              <div className='relative mt-12 h-80 lg:mt-0'>
                <Skeleton className={cn(cardBaseClasses, 'top-0 left-0')} />
                <Skeleton className={cn(cardBaseClasses, 'top-32 left-1/4')} />
              </div>
            </div>

            {/* --- Høyre kolonne-skeleton --- */}
            <div className='relative flex min-h-[400px] flex-col justify-center gap-6 p-4'>
              {/* AnimatedChat Skeleton */}
              <div className='flex justify-start'>
                <Skeleton className='h-16 w-3/4 max-w-xs rounded-lg' />
              </div>
              <div className='flex justify-end'>
                <Skeleton className='h-12 w-2/3 max-w-xs rounded-lg' />
              </div>
              <div className='flex justify-start'>
                <Skeleton className='h-12 w-1/2 max-w-xs rounded-lg' />
              </div>
              <div className='flex justify-end'>
                <Skeleton className='h-10 w-3/5 max-w-xs rounded-lg' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
