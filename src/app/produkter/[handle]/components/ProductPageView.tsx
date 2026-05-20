'use client'
import { Activity, useState } from 'react'
import { ProductPageAccordion } from '@/app/produkter/[handle]/components/ProductPageAccordion'
import { renderOptionComponent } from '@/app/produkter/[handle]/utils/renderOptionComponent'
import { RelatedProducts } from '@/app/produkter/[handle]/components/RelatedProducts'
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
import dynamic from 'next/dynamic'
import ProductHeader from './ProductHeader'
import ProductGalleryCard from './ProductGalleryCard'
import PriceActivityPanel from './PriceActivityPanel'
import { ProductDescription } from './ProductDescription'
import { TrustSignals } from './TrustSignals'
import type { ProductPageViewProps } from 'types/product/PageProps'
import type { ShopifyProduct } from 'types/product'
import type { Image } from 'types/media'

const SmartRealTimeActivity = dynamic(
  () =>
    import('@/app/produkter/[handle]/components/SmartRealTimeActivity').then(
      mod => mod.SmartRealTimeActivity
    ),
  { ssr: false, loading: () => <div className='h-6' /> }
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

const STOCK_THRESHOLD = 31

export function ProductPageView({
  productData,
  selectedVariant,
  allVariants,
  variantImages,
  onOptionChange,
  relatedProducts,
  colorHexMap
}: ProductPageViewProps) {
  const [additionalLine] = useState<
    { variantId: string; quantity: number } | undefined
  >(undefined)

  const { title, options } = productData
  const selectedVariantProfile = selectedVariant.variantProfileData
  const productSubtitle =
    typeof selectedVariantProfile?.subtitle === 'string' ?
      selectedVariantProfile.subtitle
    : undefined

  const optionOrderPreference = ['Størrelse', 'Farge']
  const sortedProductOptions = getSortedOptions(options, optionOrderPreference)

  const currentProductMetadata = productMetadata[productData.handle]
  const productDescriptionHtml =
    (selectedVariantProfile?.description?.value as string | undefined)
    ?? undefined

  const activityNode =
    currentProductMetadata?.showActivity ?
      <SmartRealTimeActivity
        baseViewers={currentProductMetadata.baseViewers ?? 3}
      />
    : undefined

  const quantity = productData.totalInventory ?? 0
  const limitedStockCount =
    quantity > 0 && quantity < STOCK_THRESHOLD ? quantity : undefined

  return (
    <main className='relative isolate overflow-x-clip bg-overcast py-10 text-maritime-blue md:py-14'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-[8%] top-12 h-80 w-80 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ancient-water)_62%,transparent)_0%,transparent_72%)] blur-3xl' />
        <div className='absolute bottom-[18%] right-[8%] h-96 w-96 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--dusted-peri)_20%,transparent)_0%,transparent_72%)] blur-3xl' />
      </div>

      <div className='container mx-auto px-4 md:px-8'>
        <AnimatedBlock
          className='will-animate-fade-in-up'
          delay='0s'
          threshold={0.2}
        >
          <Breadcrumb className='mb-8 text-maritime-blue/68'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/' className='hover:text-maritime-blue'>
                  Hjem
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href='/produkter'
                  className='hover:text-maritime-blue'
                >
                  Produkter
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className='text-maritime-blue'>
                  {productData.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </AnimatedBlock>

        <ProductHeader
          productHandle={productData.handle}
          productTitle={title}
          productSubtitle={productSubtitle ?? ''}
        />

        <ProductPageGrid>
          <GalleryColumn>
            <Activity>
              <ProductGalleryCard
                galleryContent={
                  <div className='relative isolate overflow-hidden rounded-[1.5rem]'>
                    <ProductGallery
                      title={title}
                      images={variantImages.map((image: Image) => ({
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
                stickyTopClassName='md:top-32 md:mt-4 lg:top-28 lg:mt-6'
                ariaLabel='Produktgalleri'
              />
            </Activity>
          </GalleryColumn>
          <OptionsColumn>
            <AnimatedBlock className='will-animate-fade-in-right' delay='0.1s'>
              <div
                data-product-price={selectedVariant.price.amount ?? '0'}
                data-product-currency={selectedVariant.price.currencyCode}
                className='relative mt-10 rounded-[1.5rem] border border-cloud-dancer/70 bg-cloud-dancer/72 p-6 shadow-xl shadow-maritime-blue/10 backdrop-blur-sm lg:mt-[5.75rem]'
              >
                <PriceActivityPanel
                  productHandle={productData.handle}
                  priceAmount={selectedVariant.price.amount ?? '0'}
                  currencyCode={selectedVariant.price.currencyCode}
                  limitedStockCount={limitedStockCount ?? 0}
                  activityNode={activityNode}
                />
              </div>
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-right' delay='0.16s'>
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
                <TrustSignals />
                <div className='mt-8'>
                  <Activity>
                    <AddToCart
                      product={productData}
                      selectedVariant={selectedVariant}
                      {...(additionalLine && { additionalLine })}
                    />
                  </Activity>
                </div>

                <ProductDescription descriptionHtml={productDescriptionHtml} />
              </section>
            </AnimatedBlock>
          </OptionsColumn>
        </ProductPageGrid>

        <div className='mt-16 sm:mt-24'></div>
        <ProductPageAccordion variantProfile={selectedVariantProfile} />
        {relatedProducts && relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </div>
    </main>
  )
}
