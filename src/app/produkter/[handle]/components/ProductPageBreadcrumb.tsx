import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { AnimatedBlock } from '@/components/AnimatedBlock'

type ProductPageBreadcrumbProps = {
  productTitle: string
}

export function ProductPageBreadcrumb({ productTitle }: ProductPageBreadcrumbProps) {
  return (
    <AnimatedBlock className='will-animate-fade-in-up' delay='0s' threshold={0.2}>
      <Breadcrumb>
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
