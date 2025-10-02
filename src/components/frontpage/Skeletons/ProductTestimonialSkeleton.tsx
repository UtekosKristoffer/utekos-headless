import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductTestimonialSkeleton() {
  return (
    <section className='mx-auto mb-24 max-w-3xl'>
      <Card className='border-neutral-800 bg-sidebar-foreground'>
        <CardContent className='p-12 text-center'>
          <div className='space-y-2'>
            <Skeleton className='mx-auto h-6 w-full max-w-lg' />
            <Skeleton className='mx-auto h-6 w-5/6 max-w-md' />
          </div>
          <Skeleton className='mx-auto mt-6 h-5 w-1/3 max-w-xs' />
        </CardContent>
      </Card>
    </section>
  )
}
