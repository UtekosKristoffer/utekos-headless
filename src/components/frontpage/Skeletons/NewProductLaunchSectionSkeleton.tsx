// Path: src/components/frontpage/Skeletons/NewProductLaunchSectionSkeleton.tsx
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Skeleton } from '@/components/ui/skeleton'

export function NewProductLaunchSectionSkeleton() {
  return (
    <section className='bg-background-secondary py-16 sm:py-24'>
      <div className='container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:items-center'>
        {/* Venstre Kolonne: Bildekarusell Skeleton med AspectRatio */}
        <AspectRatio ratio={3 / 4} className='rounded-2xl'>
          <Skeleton className='h-full w-full' />
        </AspectRatio>

        {/* Høyre Kolonne: Tekst og CTA Skeleton */}
        <div className='flex flex-col items-start space-y-6'>
          <Skeleton className='h-4 w-16' />
          <div className='w-full space-y-3'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-4/5' />
          </div>
          <div className='w-full space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
          </div>

          <div className='w-full space-y-5 border-t border-border pt-6'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='flex items-start gap-4'>
                <Skeleton className='size-8 shrink-0 rounded-full' />
                <div className='w-full space-y-2'>
                  <Skeleton className='h-5 w-32' />
                  <Skeleton className='h-4 w-48' />
                </div>
              </div>
            ))}
          </div>

          <div className='w-full space-y-4 pt-2'>
            <Skeleton className='h-8 w-24' />
            <Skeleton className='h-12 w-48 rounded-lg' />
          </div>
        </div>
      </div>
    </section>
  )
}
