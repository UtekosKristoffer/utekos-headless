import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductsPageFooterSkeleton() {
  return (
    <section>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {Array.from({ length: 2 }).map((_, i) => (
          <Card
            key={i}
            className='border-neutral-800 bg-sidebar-foreground'
          >
            <CardContent className='p-8'>
              <Skeleton className='h-7 w-3/4' />
              <div className='mt-2 space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
              </div>
              <Skeleton className='mt-4 h-10 w-40' />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}