'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { ProductPageAccordion } from '@/app/produkter/[handle]/ProductPageAccordion/ProductPageAccordion'
import { AddToCart } from '@/components/cart/AddToCart'
import {
  GalleryColumn,
  OptionsColumn,
  Price,
  ProductGrid
} from '@/components/jsx'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/Breadcrumb'

import { renderOptionComponent } from '@/app/produkter/[handle]/ProductPageView/helpers/renderOptionComponent'
import { getSortedOptions } from '@/lib/helpers/async/getSortedOptions'
import type { ProductPageViewProps, ShopifyProduct } from '@types'

const ProductGallery = dynamic(
  () =>
    import('@/components/jsx/ProductGallery').then(mod => mod.ProductGallery),
  {
    loading: () => (
      <div className='relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-surface-raised/40' />
    ),
    ssr: false
  }
)

export default function ProductPageView({
  productData,
  selectedVariant,
  allVariants,
  variantImages,
  onOptionChange
}: ProductPageViewProps) {
  const { title, descriptionHtml, options } = productData
  const variantProfile = selectedVariant.variantProfileData
  const subtitle = variantProfile?.subtitle
  const optionOrder = ['Størrelse', 'Farge']
  const sortedOptions = getSortedOptions(options, optionOrder)

  return (
    <main className='container mt-10 mx-auto p-4 md:p-8'>
      <Breadcrumb className='mb-8'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Hjem</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/products'>Produkter</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{productData.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductGrid>
        <GalleryColumn>
          <div className='mb-8 text-left'>
            <h1 className='text-3xl font-bold md:text-4xl'>{title}</h1>
            {subtitle && typeof subtitle === 'string' && (
              <p className='mt-2 text-lg text-foreground-on-dark/80'>
                {subtitle}
              </p>
            )}
          </div>
          <div className='md:sticky md:top-24 h-fit'>
            <div className='mx-auto max-w-xl'>
              <div className='aspect-video w-full rounded-2xl bg-surface-raised/20 p-4'>
                <Suspense fallback={<div>Laster produktbilder...</div>}>
                  <ProductGallery
                    title={title}
                    images={variantImages.map(image => ({
                      id: image.id,
                      url: image.url,
                      altText: image.altText ?? '',
                      width: image.width ?? 0,
                      height: image.height ?? 0
                    }))}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </GalleryColumn>
        <OptionsColumn>
          <Price
            amount={selectedVariant.price.amount}
            currencyCode={selectedVariant.price.currencyCode}
          />
          <section aria-labelledby='product-options'>
            <h2 id='product-options' className='sr-only'>
              Produktvalg
            </h2>
            <div className='mt-30 space-y-8'>
              {sortedOptions.map((option: ShopifyProduct['options'][number]) =>
                renderOptionComponent({
                  option,
                  allVariants,
                  selectedVariant,
                  onOptionChange
                })
              )}
            </div>

            <div className='mt-8'>
              <Suspense fallback={<div>Laster produktvalg...</div>}>
                <AddToCart selectedVariant={selectedVariant} />
              </Suspense>
            </div>

            <article
              aria-label='Produktbeskrivelse'
              className='prose prose-invert mt-12 max-w-none text-foreground-on-dark/80'
            >
              <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            </article>
          </section>
        </OptionsColumn>
      </ProductGrid>
      <Suspense fallback={<div>Laster produktinfo...</div>}>
        <ProductPageAccordion variantProfile={variantProfile} />
      </Suspense>
    </main>
  )
}
