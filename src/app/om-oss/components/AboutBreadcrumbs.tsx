// Path: src/components/ui/breadcrumb/AboutBreadcrumbs.tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

export function AboutBreadcrumbs() {
  return (
    <section className='border-b border-cloud-dancer/10 bg-maritime-darkest text-cloud-dancer'>
      <div className='container mx-auto px-4 py-5'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href='/' />}
                className='text-cloud-dancer/60 transition-colors duration-300 hover:text-very-peri'
              >
                Forsiden
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='text-cloud-dancer/40' />
            <BreadcrumbItem>
              <BreadcrumbPage className='font-medium tracking-wide text-cloud-dancer'>Om oss</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  )
}
