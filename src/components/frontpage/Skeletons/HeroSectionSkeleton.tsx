import { Skeleton } from '@/components/ui/skeleton'

export function HeroSectionSkeleton() {
  return (
    <section className='container mx-auto px-4 py-12 sm:py-16 lg:py-16'>
      <div className='mb-4 text-center'>
        <Skeleton className='mx-auto mt-6 h-12 w-3/4 max-w-2xl' />
        <Skeleton className='mx-auto mt-4 mb-8 h-8 w-full max-w-3xl' />
      </div>

      <div className='mb-8 rounded-xl border border-neutral-800 p-1 shadow-lg'>
        <Skeleton className='h-[60vh] w-full rounded-lg xl:h-[80vh]' />
      </div>
    </section>
  )
}
