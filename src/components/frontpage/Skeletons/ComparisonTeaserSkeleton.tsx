import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ComparisonTeaserSkeleton() {
  return (
    <section className='mb-24'>
      <Card className='border-neutral-800 bg-sidebar-foreground'>
        <CardContent className='p-8 text-center md:p-12'>
          <Skeleton className='mx-auto h-10 w-3/4 max-w-lg' />
          <div className='mx-auto mt-4 max-w-2xl space-y-2'>
            <Skeleton className='h-5 w-full' />
            <Skeleton className='h-5 w-5/6' />
          </div>

          <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className='rounded-lg border border-neutral-700 bg-background p-6'
              >
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-6 w-6 rounded-full' />
                  <Skeleton className='h-6 w-1/2' />
                </div>
                <Skeleton className='mt-2 h-4 w-full' />
              </div>
            ))}
          </div>

          <Skeleton className='mx-auto mt-10 h-11 w-64' />
        </CardContent>
      </Card>
    </section>
  )
}
