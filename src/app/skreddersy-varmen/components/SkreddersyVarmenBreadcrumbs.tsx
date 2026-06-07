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
    <section className='w-full border-b border-cloud-dancer/10 bg-maritime-darkest text-cloud-dancer'>
      <div className='container mx-auto px-4 py-5'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href='/' />}
                // Dempet off-white som lyser opp i lilla (very-peri) når kunden holder musen over
                className='text-cloud-dancer/60 transition-colors duration-300 hover:text-very-peri'
              >
                Forsiden
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className='text-cloud-dancer/40' />

            <BreadcrumbItem>
              <BreadcrumbPage className='text-cloud-dancer font-medium tracking-wide'>
                Skreddersy varmen
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  )
}
