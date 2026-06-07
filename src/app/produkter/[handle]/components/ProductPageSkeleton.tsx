import { GalleryColumn } from '@/components/jsx/GalleryColumn'
import { OptionsColumn } from '@/components/jsx/OptionsColumn'
import { ProductPageGrid } from '@/components/jsx/ProductPageGrid'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductPageSkeleton() {
  return (
    <section className='relative isolate overflow-hidden bg-overcast py-10 md:py-14'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-[8%] top-12 h-80 w-80 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ancient-water)_62%,transparent)_0%,transparent_72%)] blur-3xl' />
        <div className='absolute bottom-[18%] right-[8%] h-96 w-96 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--very-peri)_20%,transparent)_0%,transparent_72%)] blur-3xl' />
      </div>

      <div className='container mx-auto px-4 md:px-8'>
        <div className='mb-8 flex items-center gap-2'>
          <Skeleton className='h-5 w-16 bg-cloud-dancer/70' />
          <Skeleton className='h-5 w-4 bg-cloud-dancer/70' />
          <Skeleton className='h-5 w-24 bg-cloud-dancer/70' />
          <Skeleton className='h-5 w-4 bg-cloud-dancer/70' />
          <Skeleton className='h-5 w-32 bg-cloud-dancer/70' />
        </div>

        <ProductPageGrid>
          <GalleryColumn>
            <div className='mb-8 text-left'>
              <Skeleton className='h-10 w-3/4 bg-cloud-dancer/70' />
              <Skeleton className='mt-3 h-6 w-1/2 bg-cloud-dancer/70' />
            </div>
            <div className='mx-auto h-fit w-full max-w-lg md:sticky md:top-8'>
              <Skeleton className='aspect-[2/3] w-full rounded-[1.5rem] bg-cloud-dancer/70' />
            </div>
          </GalleryColumn>

          <OptionsColumn>
            <div className='rounded-[1.5rem] border border-cloud-dancer/70 bg-cloud-dancer/72 p-6'>
              <Skeleton className='h-8 w-28 bg-overcast/80' />
              <div className='mt-10 space-y-8'>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-20 bg-overcast/80' />
                  <Skeleton className='h-10 w-full bg-overcast/80' />
                </div>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-20 bg-overcast/80' />
                  <Skeleton className='h-10 w-full bg-overcast/80' />
                </div>
              </div>
              <Skeleton className='mt-8 h-12 w-full bg-overcast/80' />
              <div className='mt-12 space-y-3'>
                <Skeleton className='h-4 w-full bg-overcast/80' />
                <Skeleton className='h-4 w-full bg-overcast/80' />
                <Skeleton className='h-4 w-5/6 bg-overcast/80' />
              </div>
            </div>
          </OptionsColumn>
        </ProductPageGrid>
      </div>
    </section>
  )
}
