// Path: src/app/produkter/[handle]/ProductPageView/ProductPageView.tsx

'use client'

import { ProductPageAccordion } from '@/app/produkter/[handle]/ProductPageAccordion/ProductPageAccordion'
import { renderOptionComponent } from '@/app/produkter/[handle]/ProductPageView/helpers/renderOptionComponent'
import { RelatedProducts } from '@/app/produkter/[handle]/RelatedProducts/RelatedProducts'
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
import { ProductDescription } from './ProductDescription'

const SmartRealTimeActivity = dynamic(
  () =>
    import('@/app/produkter/components/SmartRealTimeActivity').then(
      mod => mod.SmartRealTimeActivity
    ),
  {
    ssr: false,
    loading: () => <div className='h-6' />
  }
)

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
  relatedProducts,
  colorHexMap
}: ProductPageViewProps) {
  const { title, options } = productData
  const variantProfile = selectedVariant.variantProfileData
  const subtitle = variantProfile?.subtitle
  const optionOrder = ['Størrelse', 'Farge']
  const sortedOptions = getSortedOptions(options, optionOrder)
  const metadata = productMetadata[productData.handle]
  const productDescriptionHtml = variantProfile?.description?.value as
    | string
    | undefined

  return (
    <main className='container mx-auto mt-10 p-4 md:p-8'>
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
            <h1 className='text-fluid-headline font-bold'>{title}</h1>
            {subtitle && typeof subtitle === 'string' && (
              <p className='mt-2 text-lg text-foreground-on-dark/80'>
                {subtitle}
              </p>
            )}
          </div>
          <div className='h-fit md:sticky md:top-24'>
            <div className='mx-auto max-w-xl'>
              <div className='aspect-video w-full rounded-2xl border border-neutral-700 bg-sidebar-foreground p-4'>
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
            <p className='mt-4 flex items-center gap-2 text-lg font-bold text-amber-400'>
              <ShieldAlertIcon className='size-5' />
              Kun 11 igjen på lager!
            </p>
          )}

          {metadata?.showActivity && (
            <SmartRealTimeActivity baseViewers={metadata.baseViewers ?? 3} />
          )}
          <section aria-labelledby='product-options'>
            <h2 id='product-options' className='sr-only'>
              Produktvalg
            </h2>
            <div className='mt-30 flex flex-col gap-8'>
              {sortedOptions.map((option: ShopifyProduct['options'][number]) =>
                renderOptionComponent({
                  option,
                  allVariants,
                  selectedVariant,
                  onOptionChange,
                  colorHexMap,
                  productHandle: productData.handle // <-- LEGG TIL DENNE LINJEN
                })
              )}
            </div>
            <div className='mt-8'>
              <AddToCart selectedVariant={selectedVariant} />
            </div>
            <ProductDescription descriptionHtml={productDescriptionHtml} />
          </section>
        </OptionsColumn>
      </ProductPageGrid>
      <div className='mt-16 sm:mt-24'>
        <SpecialOfferCrossSell currentProductHandle={productData.handle} />
      </div>

      <ProductPageAccordion variantProfile={variantProfile} />

      {relatedProducts && relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </main>
  )
}
