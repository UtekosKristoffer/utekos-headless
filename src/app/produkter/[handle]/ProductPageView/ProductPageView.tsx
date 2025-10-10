// Path: src/app/produkter/[handle]/ProductPageView/ProductPageView.tsx
'use client'

import { ProductPageAccordion } from '@/app/produkter/[handle]/ProductPageAccordion/ProductPageAccordion'
import { renderOptionComponent } from '@/app/produkter/[handle]/ProductPageView/helpers/renderOptionComponent'
import { RelatedProducts } from '@/app/produkter/[handle]/RelatedProducts/RelatedProducts'
import { SpecialOfferCrossSell } from '@/app/produkter/components/SpecialOfferCrossSell'
import { AddToCart } from '@/components/cart/AddToCart'
import { GalleryColumn } from '@/components/jsx/GalleryColumn'
import { OptionsColumn } from '@/components/jsx/OptionsColumn'
import { ProductPageGrid } from '@/components/jsx/ProductPageGrid'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { productMetadata } from '@/db/config/product-metadata.config'
import { getSortedOptions } from '@/lib/helpers/async/getSortedOptions'
import type { ProductPageViewProps, ShopifyProduct } from '@types'
import dynamic from 'next/dynamic'

import ProductHeader from './ProductHeader'
import ProductGalleryCard from './ProductGalleryCard'
import PriceActivityPanel from './PriceActivityPanel'

// Delkomponent
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
  const selectedVariantProfile = selectedVariant.variantProfileData
  const productSubtitle =
    typeof selectedVariantProfile?.subtitle === 'string' ?
      selectedVariantProfile.subtitle
    : undefined

  // Sorter produktvalg konsekvent
  const optionOrderPreference = ['Størrelse', 'Farge']
  const sortedProductOptions = getSortedOptions(options, optionOrderPreference)

  // Metadata fra konfig
  const currentProductMetadata = productMetadata[productData.handle]
  const productDescriptionHtml =
    (selectedVariantProfile?.description?.value as string | undefined)
    ?? undefined

  // Aktivitets-øy (klient) injiseres bare hvis aktivert i metadata
  const activityNode =
    currentProductMetadata?.showActivity ?
      <SmartRealTimeActivity
        baseViewers={currentProductMetadata.baseViewers ?? 3}
      />
    : undefined

  // Lager-varsel for spesialutgave – kan senere komme fra CMS
  const limitedStockCount =
    productData.handle === 'utekos-special-edition' ? 11 : undefined

  return (
    <main className='relative container mx-auto mt-10 overflow-hidden p-4 md:p-8'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div
          className='absolute left-1/4 top-0 h-[600px] w-[600px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/4 bottom-0 h-[600px] w-[600px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Brødsmuler */}
      <AnimatedBlock
        className='will-animate-fade-in-up'
        delay='0s'
        threshold={0.2}
      >
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
      </AnimatedBlock>

      <ProductPageGrid>
        <GalleryColumn>
          <ProductHeader
            productHandle={productData.handle}
            productTitle={title}
            productSubtitle={productSubtitle ?? ''}
          />
          <ProductGalleryCard
            galleryContent={
              <div className='relative overflow-hidden rounded-2xl'>
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
            }
            enableStickyOnDesktop
            stickyTopClassName='md:top-24'
            ariaLabel='Produktgalleri'
          />
        </GalleryColumn>

        <OptionsColumn>
          <AnimatedBlock
            className='will-animate-fade-in-right'
            delay='0.1s'
            threshold={0.2}
          >
            <PriceActivityPanel
              productHandle={productData.handle}
              priceAmount={selectedVariant.price.amount ?? '0'}
              currencyCode={selectedVariant.price.currencyCode}
              limitedStockCount={limitedStockCount ?? 0}
              activityNode={activityNode}
            />
          </AnimatedBlock>

          <AnimatedBlock
            className='will-animate-fade-in-right'
            delay='0.16s'
            threshold={0.2}
          >
            <section aria-labelledby='product-options'>
              <h2 id='product-options' className='sr-only'>
                Produktvalg
              </h2>

              <div className='mt-8 flex flex-col gap-8'>
                {sortedProductOptions.map(
                  (productOption: ShopifyProduct['options'][number]) =>
                    renderOptionComponent({
                      option: productOption,
                      allVariants,
                      selectedVariant,
                      onOptionChange,
                      colorHexMap,
                      productHandle: productData.handle
                    })
                )}
              </div>

              <div className='mt-8'>
                <AddToCart selectedVariant={selectedVariant} />
              </div>

              <ProductDescription descriptionHtml={productDescriptionHtml} />
            </section>
          </AnimatedBlock>
        </OptionsColumn>
      </ProductPageGrid>

      <div className='mt-16 sm:mt-24'>
        <SpecialOfferCrossSell currentProductHandle={productData.handle} />
      </div>

      <ProductPageAccordion variantProfile={selectedVariantProfile} />

      {relatedProducts && relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </main>
  )
}
