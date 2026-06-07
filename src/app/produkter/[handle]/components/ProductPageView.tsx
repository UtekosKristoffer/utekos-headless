'use client'
import { Activity, useState } from 'react'
import { ProductPageAccordion } from '@/app/produkter/[handle]/components/ProductPageAccordion'
import { renderOptionComponent } from '@/app/produkter/[handle]/utils/renderOptionComponent'
import { RelatedProducts } from '@/app/produkter/[handle]/components/RelatedProducts'
import { AddToCart } from '@/components/cart/AddToCart'
import { GalleryColumn } from '@/components/jsx/GalleryColumn'
import { getKlarnaMinorUnitAmount } from '@/components/klarna/utils/getKlarnaMinorUnitAmount'
import { KlarnaCreditPromotionAutoSize } from '@/components/klarna/components/KlarnaCreditPromotionAutoSize'
import { KlarnaOnSiteMessagingScript } from '@/components/klarna/components/KlarnaOnSiteMessagingScript'
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
import {
  resolveProductGalleryImages,
  type ProductGalleryImageOverrideValue
} from '../utils/resolveProductGalleryImages'
import { TECHDOWN_MOBILE_GALLERY_IMAGES } from '../utils/gallery-images/techdown/mobileGalleryImages'
import { TECHDOWN_DESKTOP_GALLERY_IMAGES } from '../utils/gallery-images/techdown/desktopGalleryImages'
import { MICROFIBER_DESKTOP_GALLERY_IMAGES } from '../utils/gallery-images/mikrofiber/mikrofiberDesktopImages'
import { STAPPER_MOBILE_GALLERY_IMAGES } from '../utils/gallery-images/stapper/stapperMobileImages'
import { STAPPER_DESKTOP_GALLERY_IMAGES } from '../utils/gallery-images/stapper/stapperDesktopImages'
import { STOCK_THRESHOLD } from '../utils/resolveProductGalleryImages'
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
  () => import('@/components/jsx/ProductGallery').then(mod => mod.ProductGallery),
  {
    loading: () => (
      <div className='relative aspect-square w-full overflow-hidden rounded-none md:aspect-4/3md:rounded-lg' />
    ),
    ssr: false
  }
)

const PRODUCT_GALLERY_IMAGE_OVERRIDES: Partial<Record<string, ProductGalleryImageOverrideValue>> = {
  'utekos-techdown': {
    mobileImages: TECHDOWN_MOBILE_GALLERY_IMAGES,
    desktopImages: TECHDOWN_DESKTOP_GALLERY_IMAGES,
    imageBackgroundClassName: 'bg-cloud-dancer'
  },
  'utekos-mikrofiber': {
    desktopImages: MICROFIBER_DESKTOP_GALLERY_IMAGES
  },
  'comfyrobe': [
    {
      id: 'comfyrobe-demitasse-open-front',
      url: '/comfyrobe-demitasse-open-front.png',
      altText: 'Comfyrobe i demitasse vist åpen forfra.',
      width: 1288,
      height: 1288
    },
    {
      id: 'comfyrobe-demitasse-closed-front',
      url: '/comfy-front-lukket-demitasse-bg.png',
      altText: 'Comfyrobe i demitasse vist lukket forfra.',
      width: 1288,
      height: 1288
    },
    {
      id: 'comfyrobe-demitasse-back',
      url: '/comfy-bak-demitasse-bg.png',
      altText: 'Comfyrobe i demitasse sett bakfra.',
      width: 1288,
      height: 1288
    },
    {
      id: 'comfyrobe-demitasse-sherpa',
      url: '/comfy-sherpa-demitasse-bg.png',
      altText: 'Comfyrobe i demitasse med sherpa-fôr synlig.',
      width: 1288,
      height: 1288
    }
  ],
  'utekos-stapper': {
    mobileImages: STAPPER_MOBILE_GALLERY_IMAGES,
    desktopImages: STAPPER_DESKTOP_GALLERY_IMAGES
  }
}

export function ProductPageView({
  productData,
  selectedVariant,
  allVariants,
  variantImages,
  onOptionChange,
  relatedProducts,
  colorHexMap
}: ProductPageViewProps) {
  const [additionalLine] = useState<{ variantId: string; quantity: number } | undefined>(undefined)

  const { title, options } = productData
  const selectedVariantProfile = selectedVariant.variantProfileData
  const productSubtitle =
    typeof selectedVariantProfile?.subtitle === 'string' ? selectedVariantProfile.subtitle : undefined

  const optionOrderPreference = ['Størrelse', 'Farge']
  const sortedProductOptions = getSortedOptions(options, optionOrderPreference)

  const currentProductMetadata = productMetadata[productData.handle]
  const productDescriptionHtml =
    (selectedVariantProfile?.description?.value as string | undefined) ?? undefined

  const activityNode =
    currentProductMetadata?.showActivity ?
      <SmartRealTimeActivity baseViewers={currentProductMetadata.baseViewers ?? 3} />
    : undefined

  const quantity = productData.totalInventory ?? 0
  const limitedStockCount = quantity > 0 && quantity < STOCK_THRESHOLD ? quantity : undefined
  const galleryImageOverride = PRODUCT_GALLERY_IMAGE_OVERRIDES[productData.handle]
  const fallbackGalleryImages = variantImages.map((image: Image) => ({
    id: image.id,
    url: image.url,
    altText: image.altText ?? '',
    width: image.width ?? 0,
    height: image.height ?? 0
  }))
  const resolvedGallery = resolveProductGalleryImages(galleryImageOverride, fallbackGalleryImages)
  const galleryImages = resolvedGallery.mobileImages
  const klarnaPurchaseAmount =
    getKlarnaMinorUnitAmount({
      amount: selectedVariant.price.amount ?? '0',
      currencyCode: selectedVariant.price.currencyCode
    }) ?? ''

  return (
    <article className='relative isolate overflow-x-clip bg-background py-0 text-foreground! md:py-6'>
      <KlarnaOnSiteMessagingScript />
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-[8%] top-12 size-80 rounded-full' />
        <div className='absolute bottom-[18%] right-[8%] h-96 w-96 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--dusted-peri)_20%,transparent)_0%,transparent_72%)] blur-3xl' />
      </div>

      <div className='container mx-auto px-4 md:px-8'>
        <AnimatedBlock className='will-animate-fade-in-up hidden md:block' delay='0s' threshold={0.2}>
          <Breadcrumb className='mb-8 text-foreground'>
            <BreadcrumbList className='text-foreground'>
              <BreadcrumbItem>
                <BreadcrumbLink href='/' className='text-foreground! hover:text-foreground/80'>
                  Forside
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='text-foreground' />
              <BreadcrumbItem>
                <BreadcrumbLink href='/produkter' className='text-foreground! hover:text-foreground/80'>
                  Produkter
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='text-foreground' />
              <BreadcrumbItem>
                <BreadcrumbPage className=' text-foreground!'>{productData.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </AnimatedBlock>

        <div className='hidden text-foreground md:block'>
          <ProductHeader
            productHandle={productData.handle}
            productTitle={title}
            productSubtitle={productSubtitle ?? ''}
          />
        </div>

        <ProductPageGrid>
          <GalleryColumn>
            <Activity>
              <ProductGalleryCard
                galleryContent={
                  <div className='relative isolate overflow-hidden rounded-none md:rounded-3xl'>
                    <ProductGallery
                      title={title}
                      images={galleryImages}
                      {...(resolvedGallery.desktopImages ?
                        { desktopImages: resolvedGallery.desktopImages }
                      : {})}
                      {...(resolvedGallery.imageBackgroundClassName ?
                        { imageBackgroundClassName: resolvedGallery.imageBackgroundClassName }
                      : {})}
                    />
                  </div>
                }
                hasIntegratedBackground={!!galleryImageOverride}
                integratedBackgroundSize='wide'
                flushOnMobile
                enableStickyOnDesktop
                stickyTopClassName='md:top-32 md:mt-4 lg:top-28 lg:mt-6'
                ariaLabel='Produktgalleri'
              />
            </Activity>
            <div className='mt-4 md:hidden'>
              <AnimatedBlock className='will-animate-fade-in-up' delay='0s' threshold={0.2}>
                <Breadcrumb className='mb-4 text-foreground'>
                  <BreadcrumbList className='text-foreground'>
                    <BreadcrumbItem>
                      <BreadcrumbLink href='/' className='text-foreground hover:text-foreground/80'>
                        Forside
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='text-foreground' />
                    <BreadcrumbItem>
                      <BreadcrumbLink href='/produkter' className='text-foreground hover:text-foreground/80'>
                        Produkter
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='text-foreground' />
                    <BreadcrumbItem>
                      <BreadcrumbPage className='text-foreground'>{productData.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </AnimatedBlock>
              <ProductHeader
                productHandle={productData.handle}
                productTitle={title}
                productSubtitle={productSubtitle ?? ''}
              />
            </div>
          </GalleryColumn>
          <OptionsColumn>
            <AnimatedBlock className='will-animate-fade-in-right' delay='0.1s'>
              <div
                data-product-price={selectedVariant.price.amount ?? '0'}
                data-product-currency={selectedVariant.price.currencyCode}
                className='relative text-foreground! -mt-4 md:mt-6'
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

            <AnimatedBlock className='will-animate-fade-in-right' delay='0.13s'>
              <div aria-label='Betalingsinformasjon fra Klarna' className='mt-4 overflow-hidden'>
                <KlarnaCreditPromotionAutoSize
                  id={`klarna-credit-promotion-${productData.handle}`}
                  purchaseAmount={klarnaPurchaseAmount}
                />
              </div>
            </AnimatedBlock>

            <AnimatedBlock className='will-animate-fade-in-right' delay='0.16s'>
              <section aria-labelledby='product-options'>
                <h2 id='product-options' className='sr-only'>
                  Produktvalg
                </h2>
                <div className='mt-8 flex flex-col gap-8'>
                  {sortedProductOptions.map((productOption: ShopifyProduct['options'][number]) =>
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
        {relatedProducts && relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
      </div>
    </article>
  )
}
