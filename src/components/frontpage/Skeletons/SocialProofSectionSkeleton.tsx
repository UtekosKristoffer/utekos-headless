import { Skeleton } from '@/components/ui/skeleton'

export function SocialProofSectionSkeleton() {
  return (
    <section className='py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <Skeleton className='mx-auto h-10 w-3/4 max-w-lg' />
          <Skeleton className='mx-auto mt-4 h-6 w-full max-w-3xl' />
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* Venstre kolonne: CustomerNetwork Skeleton */}
          <div className='rounded-xl border border-neutral-800 bg-sidebar-foreground p-8'>
            <div className='relative h-full w-full min-h-[450px]'>
              {/* Senter-node */}
              <Skeleton className='absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full' />
              {/* Omliggende noder */}
              <Skeleton className='absolute top-8 left-8 h-10 w-36 rounded-lg' />
              <Skeleton className='absolute top-8 right-8 h-10 w-36 rounded-lg' />
              <Skeleton className='absolute bottom-8 left-8 h-10 w-36 rounded-lg' />
              <Skeleton className='absolute bottom-8 right-8 h-10 w-36 rounded-lg' />
            </div>
          </div>

          {/* Høyre kolonne: CustomerStory Skeleton */}
          <div className='rounded-xl border border-neutral-800 bg-sidebar-foreground p-8'>
            <div className='flex h-full min-h-[300px] flex-col items-center justify-around'>
              <Skeleton className='h-12 w-3/4 max-w-sm rounded-lg' />
              <Skeleton className='h-12 w-3/4 max-w-sm rounded-lg' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}