import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function GaveGuideHero() {
  return (
    <section className='border-b border-neutral-800 bg-sidebar-foreground py-24 text-center'>
      <div className='container mx-auto px-4'>
        <Breadcrumb className='mb-6'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Hjem</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Gaveguide</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <p className='mb-2 font-semibold text-primary-foreground'>Gaveguiden</p>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
          Gaven som varmer. Lenge.
        </h1>
        <p className='mx-auto mt-6 max-w-2xl text-xl text-muted-foreground'>
          Gi bort mer enn bare en ting – gi bort komfort, kvalitetstid og
          utallige #utekosøyeblikk. Perfekt for den som har alt, men som
          fortjener det aller beste.
        </p>
      </div>
    </section>
  )
}
