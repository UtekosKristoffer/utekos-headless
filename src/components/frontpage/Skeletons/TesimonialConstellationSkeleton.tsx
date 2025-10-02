import { Skeleton } from '@/components/ui/skeleton'

export function TestimonialConstellationSkeleton() {
  return (
    <section className='py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <Skeleton className='mx-auto h-10 w-3/4 max-w-lg' />
          <Skeleton className='mx-auto mt-4 h-6 w-full max-w-2xl' />
        </div>

        <div className='relative'>
          {/* Horisontal "Databus"-linje */}
          <Skeleton className='absolute top-4 left-0 h-0.5 w-full' />

          {/* Grid for testimoniene */}
          <div className='grid grid-cols-1 gap-x-8 gap-y-16 pt-16 lg:grid-cols-3'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='relative flex flex-col'>
                {/* Vertikal koblingslinje */}
                <Skeleton className='absolute -top-12 left-4 h-12 w-0.5' />

                <div className='flex h-full flex-col rounded-xl bg-sidebar-foreground p-8'>
                  <div className='flex-grow space-y-2'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-5/6' />
                    <Skeleton className='h-4 w-3/4' />
                  </div>
                  <footer className='mt-6'>
                    <Skeleton className='h-5 w-1/3' />
                    <Skeleton className='mt-1 h-4 w-1/2' />
                  </footer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
