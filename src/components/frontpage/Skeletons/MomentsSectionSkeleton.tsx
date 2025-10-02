import { Skeleton } from '@/components/ui/skeleton'

export function MomentsSectionSkeleton() {
  return (
    <section className='py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 flex flex-col items-center gap-4 text-center'>
          <Skeleton className='h-10 w-3/4 max-w-md' />
          <Skeleton className='h-6 w-full max-w-2xl' />
        </div>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className='h-full rounded-xl border border-neutral-800 bg-sidebar-foreground p-8'
            >
              <div className='flex h-full flex-col'>
                <Skeleton className='h-12 w-12 rounded-lg' />
                <Skeleton className='mt-6 h-6 w-1/2' />
                <div className='mt-2 space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-5/6' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
