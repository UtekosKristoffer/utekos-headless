// Path: src/components/skeletons/ProductCardSkeleton.tsx

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ImageColumnSkeleton() {
  return (
    <Card className='flex h-full flex-col bg-sidebar-foreground'>
      <CardContent className='relative p-0'>
        <AspectRatio ratio={2 / 3}>
          <Skeleton className='size-full rounded-t-lg' />
        </AspectRatio>
      </CardContent>

      <CardHeader className='flex-1 p-6'>
        <Skeleton className='mb-2 h-5 w-4/5' />
        <Skeleton className='h-4 w-3/5' />
      </CardHeader>

      <CardFooter className='flex flex-col gap-4 p-6 pt-0'>
        <div className='flex w-full items-center justify-between'>
          <Skeleton className='h-7 w-24' />
        </div>
        <div className='grid w-full grid-cols-2 gap-3'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
        </div>
      </CardFooter>
    </Card>
  )
}
