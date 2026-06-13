import { AnimatedBlock } from '@/components/AnimatedBlock'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export function DesktopBreadcrump({ productTitle, handle }: { productTitle: string; handle: string }) {
  return (
    <AnimatedBlock className='will-animate-fade-in-up hidden md:block' delay='0s' threshold={0.2}>
      <Breadcrumb className='mb-8 text-foreground'>
        <BreadcrumbList className='text-foreground'>
          <BreadcrumbItem>
            <BreadcrumbLink href='/' className='text-foreground! hover:text-foreground/80'>
              Forside
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className='text-foreground' />
          <BreadcrumbItem>
            <BreadcrumbLink href='/produkter' className='text-foreground! hover:text-foreground/80'>
              Produkter
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className='text-foreground' />
          <BreadcrumbItem>
            <BreadcrumbPage className=' text-foreground!'>{productTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </AnimatedBlock>
  )
}
