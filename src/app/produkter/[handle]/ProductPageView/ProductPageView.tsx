'use client'
import { useState } from 'react'
import { ProductPageAccordion } from '@/app/produkter/[handle]/ProductPageAccordion/ProductPageAccordion'
import { renderOptionComponent } from '@/app/produkter/[handle]/ProductPageView/helpers/renderOptionComponent'
import { RelatedProducts } from '@/app/produkter/[handle]/RelatedProducts/RelatedProducts'
import { SpecialOfferCrossSell } from '@/app/produkter/components/SpecialOfferCrossSell'
import { AddToCart } from '@/components/cart/AddToCart'
import { FindInStoreSection } from '@/components/frontpage/FindStoreSection'
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
import { Activity } from 'react'
import ProductHeader from './ProductHeader'
import ProductGalleryCard from './ProductGalleryCard'
import PriceActivityPanel from './PriceActivityPanel'
import { ProductDescription } from './ProductDescription'
import { TrustSignals } from './TrustSignals'
import { TechDownLaunchOffer } from './TechDownLaunchOffer'

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

const STOCK_THRESHOLD = 31

export default function ProductPageView({
  productData,
  selectedVariant,
  allVariants,
  variantImages,
  onOptionChange,
  relatedProducts,
  colorHexMap
}: ProductPageViewProps) {
  const [additionalLine, setAdditionalLine] = useState<
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
    <main className='relative container mx-auto mt-10 p-4 md:p-8'>
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
      <Activity>
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
      </Activity>

      <ProductPageGrid>
        <GalleryColumn>
          <Activity>
            <ProductHeader
              productHandle={productData.handle}
              productTitle={title}
              productSubtitle={productSubtitle ?? ''}
            />
          </Activity>
          <Activity>
            <ProductGalleryCard
              galleryContent={
                <div className='relative overflow-hidden rounded-2xl isolate'>
                  <Activity>
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
                  </Activity>
                </div>
              }
              enableStickyOnDesktop
              stickyTopClassName='md:top-24'
              ariaLabel='Produktgalleri'
            />
          </Activity>
        </GalleryColumn>
        <Activity>
          <OptionsColumn>
            <AnimatedBlock
              className='will-animate-fade-in-right'
              delay='0.1s'
              threshold={0.2}
            >
              <Activity>
                <PriceActivityPanel
                  productHandle={productData.handle}
                  priceAmount={selectedVariant.price.amount ?? '0'}
                  currencyCode={selectedVariant.price.currencyCode}
                  limitedStockCount={limitedStockCount ?? 0}
                  activityNode={activityNode}
                />
              </Activity>
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
                <Activity>
                  <TrustSignals />
                </Activity>
                <Activity>
                  {productData.handle === 'utekos-techdown' && (
                    <TechDownLaunchOffer
                      onAdditionalLineChange={setAdditionalLine}
                    />
                  )}
                </Activity>
                <div className='mt-8'>
                  <Activity>
                    <AddToCart
                      product={productData}
                      selectedVariant={selectedVariant}
                      {...(additionalLine && { additionalLine })}
                    />
                  </Activity>
                </div>
                <Activity>
                  <AnimatedBlock
                    className='will-animate-fade-in-up'
                    delay='0.22s'
                    threshold={0.2}
                  ></AnimatedBlock>
                </Activity>
                <ProductDescription descriptionHtml={productDescriptionHtml} />
              </section>
            </AnimatedBlock>
          </OptionsColumn>
        </Activity>
      </ProductPageGrid>

      <div className='mt-16 sm:mt-24'>
        <Activity>
          <SpecialOfferCrossSell currentProductHandle={productData.handle} />
        </Activity>
      </div>
      <Activity>
        <ProductPageAccordion variantProfile={selectedVariantProfile} />
      </Activity>
      <Activity>
        {relatedProducts && relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </Activity>
      <Activity>
        <FindInStoreSection />
      </Activity>
    </main>
  )
}
