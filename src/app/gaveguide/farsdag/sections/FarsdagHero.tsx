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
    <section className='flex w-full flex-col items-center border-b border-neutral-800 bg-background text-center'>
      <div className='w-full max-w-4xl px-6 py-20 sm:py-24 lg:px-8'>
        <Breadcrumb className='mb-6 flex justify-center'>
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
          Gi bort mer enn en gave. Gi bort varme på farsdag.
        </h1>
        <p className='mt-6 text-balance text-lg leading-8 text-muted-foreground'>
          Til pappaen som har alt, men som fortjener komforten til å forlenge de
          gode stundene ute. Årets farsdagsgave finner du her.
        </p>
      </div>
    </section>
  )
}
