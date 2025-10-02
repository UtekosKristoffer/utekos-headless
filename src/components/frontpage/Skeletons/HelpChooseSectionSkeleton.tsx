import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function HelpChooseSectionSkeleton() {
  return (
    <section className='mb-24'>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card
            key={i}
            className='flex h-full flex-col border-neutral-800 bg-sidebar-foreground'
          >
            <AspectRatio ratio={2 / 3}>
              <Skeleton className='h-full w-full rounded-t-lg' />
            </AspectRatio>
            <CardContent className='flex flex-grow flex-col p-6'>
              <Skeleton className='h-6 w-3/4' />
              <div className='mt-2 flex-grow space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
              </div>
              <Skeleton className='mt-4 h-5 w-1/3' />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}