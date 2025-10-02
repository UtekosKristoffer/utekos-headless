import { Skeleton } from '@/components/ui/skeleton'

export function PromiseSectionSkeleton() {
  return (
    <section className='py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16'>
          {/* Venstre kolonne: Bilde-skeleton */}
          <div className='flex items-center justify-center rounded-xl border border-neutral-800 p-2'>
            <Skeleton className='aspect-[16/10] w-full rounded-lg' />
          </div>

          {/* Høyre kolonne: Tekst-skeleton */}
          <div className='rounded-xl border border-neutral-800 bg-sidebar-foreground p-8 lg:p-12'>
            <div className='flex h-full flex-col justify-center'>
              <Skeleton className='h-10 w-1/2' />
              <div className='mt-6 space-y-6'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className='flex items-start gap-4'>
                    <Skeleton className='h-8 w-8 flex-shrink-0 rounded-full' />
                    <div className='w-full space-y-1'>
                      <Skeleton className='h-5 w-2/5' />
                      <Skeleton className='h-4 w-4/5' />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
