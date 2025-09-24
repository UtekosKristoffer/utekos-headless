'use client'
import { ProductPageAccordion } from '@/app/produkter/[handle]/ProductPageAccordion/ProductPageAccordion'
import { renderOptionComponent } from '@/app/produkter/[handle]/ProductPageView/helpers/renderOptionComponent'
import { RelatedProducts } from '@/app/produkter/[handle]/RelatedProducts/RelatedProducts'
import { SmartRealTimeActivity } from '@/app/produkter/components/SmartRealTimeActivity'
import { SpecialOfferCrossSell } from '@/app/produkter/components/SpecialOfferCrossSell'
import { AddToCart } from '@/components/cart/AddToCart'
import {
  GalleryColumn,
  OptionsColumn,
  Price,
  ProductPageGrid
} from '@/components/jsx'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { productMetadata } from '@/db/config/product-metadata.config'
import { getSortedOptions } from '@/lib/helpers/async/getSortedOptions'
import type { ProductPageViewProps, ShopifyProduct } from '@types'
import { ShieldAlertIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
const ProductGallery = dynamic(
  () =>
    import('@/components/jsx/ProductGallery').then(mod => mod.ProductGallery),
  {
    loading: () => (
      <div className='relative aspect-[2/3] w-full overflow-hidden rounded-lg' />
    ),
    ssr: false
  }
)

export default function ProductPageView({
  productData,
  selectedVariant,
  allVariants,
  variantImages,
  onOptionChange,
  relatedProducts
}: ProductPageViewProps) {
  const { title, description, options } = productData
  const variantProfile = selectedVariant.variantProfileData
  const subtitle = variantProfile?.subtitle
  const optionOrder = ['Størrelse', 'Farge']
  const sortedOptions = getSortedOptions(options, optionOrder)
  const metadata = productMetadata[productData.handle]
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

      <ProductPageGrid>
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
              <div className='aspect-video w-full rounded-2xl bg-sidebar-foreground p-4'>
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

          {productData.handle === 'utekos-special-edition' && (
            <p className='flex items-center gap-2 text-lg font-bold text-amber-400 mt-4'>
              <ShieldAlertIcon className='h-5 w-5' />
              Kun 11 igjen på lager!
            </p>
          )}

          {/* 2. Viser sanntidsaktivitet for ALLE produkter som er aktivert i config-filen */}
          {metadata?.showActivity && (
            <SmartRealTimeActivity baseViewers={metadata.baseViewers ?? 3} />
          )}
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
            <SpecialOfferCrossSell currentProductHandle={productData.handle} />
            <article
              aria-label='Produktbeskrivelse'
              className='prose prose-invert mt-12 max-w-none text-foreground-on-dark/80'
            >
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </article>
          </section>
        </OptionsColumn>
      </ProductPageGrid>
      <Suspense fallback={<div>Laster produktinfo...</div>}>
        <ProductPageAccordion variantProfile={variantProfile} />
      </Suspense>

      {relatedProducts && relatedProducts.length > 0 && (
        <Suspense fallback={<div>Laster forslag...</div>}>
          <RelatedProducts products={relatedProducts} />
        </Suspense>
      )}
    </main>
  )
}
