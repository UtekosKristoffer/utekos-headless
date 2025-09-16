import { GalleryColumn } from '@/components/jsx/GalleryColumn'
import { OptionsColumn } from '@/components/jsx/OptionsColumn'
import { ProductGrid } from '@/components/jsx/ProductGrid'
import { Skeleton } from '@/components/ui/Skeleton'

export function ProductPageSkeleton() {
  return (
    <main className='container mt-10 mx-auto p-4 md:p-8'>
      {/* Breadcrumb Skeleton */}
      <div className='mb-8 flex items-center gap-2'>
        <Skeleton className='h-5 w-16' />
        <Skeleton className='h-5 w-4' />
        <Skeleton className='h-5 w-24' />
        <Skeleton className='h-5 w-4' />
        <Skeleton className='h-5 w-32' />
      </div>

      <ProductGrid>
        <GalleryColumn>
          {/* Title and Subtitle Skeleton */}
          <div className='mb-8 text-left'>
            <Skeleton className='h-10 w-3/4' />
            <Skeleton className='mt-3 h-6 w-1/2' />
          </div>
          {/* Image Gallery Skeleton */}
          <div className='md:sticky md:top-24 h-fit'>
            <Skeleton className='aspect-video w-full rounded-2xl' />
          </div>
        </GalleryColumn>

        <OptionsColumn>
          {/* Price Skeleton */}
          <Skeleton className='h-8 w-28' />
          {/* Options Skeleton */}
          <div className='mt-10 space-y-8'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>
          {/* AddToCart Button Skeleton */}
          <Skeleton className='mt-8 h-12 w-full' />
          {/* Description Skeleton */}
          <div className='mt-12 space-y-3'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
          </div>
        </OptionsColumn>
      </ProductGrid>
    </main>
  )
}
