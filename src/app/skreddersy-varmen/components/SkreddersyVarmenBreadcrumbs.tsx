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
    <section className='w-full border-b border-cloud-dancer/12 bg-background text-cloud-dancer'>
      <div className='container mx-auto px-4 py-5'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className='text-cloud-dancer/82 hover:text-cloud-dancer'>
                <Link href='/'>Forsiden</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='text-cloud-dancer/58' />
            <BreadcrumbItem>
              <BreadcrumbPage className='text-cloud-dancer'>Skreddersy varmen</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  )
}
