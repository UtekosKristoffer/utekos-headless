import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

export function SkreddersyVarmenBreadcrumbs() {
  return (
    <section className='w-full border-b border-cloud-dancer/12 bg-background text-foreground'>
      <div className='container mx-auto px-4 py-5'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href='/' />} className='text-foreground/82 hover:text-foreground'>
                Forsiden
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='text-foreground/58' />
            <BreadcrumbItem>
              <BreadcrumbPage className='text-foreground'>Skreddersy varmen</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  )
}
