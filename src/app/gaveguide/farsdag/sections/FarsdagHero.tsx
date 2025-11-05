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
    <section className='w-full border-b border-neutral-800 bg-background py-24 sm:py-32 text-center'>
      <div className='container mx-auto px-4 max-w-5xl'>
        <Breadcrumb className='mb-8 flex justify-center'>
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

        <div className='space-y-4'>
          <h1 className='text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl'>
            Husk farsdag 9. november!
          </h1>
          <h2 className='text-balance text-3xl font-bold tracking-tight text-primary-foreground/90 sm:text-4xl lg:text-5xl'>
            Gi bort mer enn en gave – gi bort varme.
          </h2>
        </div>

        <p className='mt-8 text-balance text-lg sm:text-xl leading-relaxed text-article-white/80 max-w-3xl mx-auto'>
          Til pappaen som har alt, men som fortjener komforten til å forlenge de
          gode stundene ute. Årets farsdagsgave finner du her.
        </p>
      </div>
    </section>
  )
}
