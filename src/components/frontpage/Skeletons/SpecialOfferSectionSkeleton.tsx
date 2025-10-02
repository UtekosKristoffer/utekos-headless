import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Skeleton } from '@/components/ui/skeleton'

export function SpecialOfferSectionSkeleton() {
  return (
    <section className='w-full py-20 sm:py-24'>
      <div className='container mx-auto'>
        <div className='relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 md:p-12'>
          <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
            {/* Image Carousel Skeleton */}
            <AspectRatio ratio={2 / 3}>
              <Skeleton className='h-full w-full rounded-md' />
            </AspectRatio>

            {/* Content Skeleton */}
            <div className='flex flex-col'>
              <Skeleton className='h-10 w-3/4' />
              <div className='mt-4 space-y-2'>
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-5/6' />
              </div>

              {/* Stock Progress Skeleton */}
              <div className='mt-8'>
                <Skeleton className='h-4 w-1/3' />
                <Skeleton className='mt-2 h-2 w-full' />
              </div>

              {/* Features List Skeleton */}
              <div className='mt-8 space-y-3'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className='flex items-center gap-3'>
                    <Skeleton className='h-5 w-5 rounded-full' />
                    <Skeleton className='h-4 w-4/5' />
                  </div>
                ))}
              </div>

              {/* Button Skeleton */}
              <Skeleton className='mt-8 h-12 w-full sm:w-72' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
