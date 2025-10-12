// Path: src/app/gaveguide/farsdag/sections/FarsdagHero.tsx

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export function FarsdagHero() {
  return (
    <section className='w-full border-b border-neutral-800 bg-background py-20 text-center sm:py-24'>
      <div className='container mx-auto px-4'>
        <Breadcrumb className='mb-6'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Hjem</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/gaveguide'>Gaveguide</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Farsdag</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl'>
          Husk farsdag 9. november!
        </h1>
        <h2 className='text-balance text-4xl mt-3 font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl'>
          Gi bort mer enn en gave - gi bort varme.
        </h2>
        <p className='mt-6 text-balance text-lg leading-8 text-muted-foreground'>
          Til pappaen som har alt, men som fortjener komforten til å forlenge de
          gode stundene ute. Årets farsdagsgave finner du her.
        </p>
      </div>
    </section>
  )
}
