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
  () => import('@/components/jsx/ProductGallery').then(mod => mod.ProductGallery),
  {
    loading: () => (
      <div className='relative aspect-square w-full overflow-hidden rounded-none md:aspect-[4/3] md:rounded-lg' />
    ),
    ssr: false
  }
)

const STOCK_THRESHOLD = 31

type ProductGalleryImageOverride = {
  mobileImages?: Image[]
  desktopImages?: Image[]
  imageBackgroundClassName?: string
}

type ProductGalleryImageOverrideValue = Image[] | ProductGalleryImageOverride
type ResolvedProductGalleryImages = {
  mobileImages: Image[]
  desktopImages?: Image[]
  imageBackgroundClassName?: string
}

function productImage(id: string, url: string, altText: string, width: number, height: number): Image {
  return {
    id,
    url,
    altText,
    width,
    height
  }
}

function resolveProductGalleryImages(
  override: ProductGalleryImageOverrideValue | undefined,
  fallbackImages: Image[]
): ResolvedProductGalleryImages {
  if (!override) {
    return {
      mobileImages: fallbackImages
    }
  }

  if (Array.isArray(override)) {
    return {
      mobileImages: override
    }
  }

  return {
    ...override,
    mobileImages: override.mobileImages ?? fallbackImages
  }
}

const TECHDOWN_MOBILE_GALLERY_IMAGES: Image[] = [
  productImage(
    'utekos-techdown-kvinne-terrasseliv-mobile',
    '/utekos-techdown-kvinne-terrasseliv-1600x1600.webp',
    'Kvinne med Utekos TechDown på terrassen.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-herre-terrasseliv-mobile',
    '/utekos-techdown-herre-terrasseliv-1600x1600.webp',
    'Mann med Utekos TechDown på terrassen.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-kvinne-bonfire-mobile',
    '/utekos-techdown-kvinne-bonfire-1600x1600.webp',
    'Kvinne med Utekos TechDown ved bålpanne.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-to-kvinner-terrasselivet-mobile',
    '/utekos-techdown-to-kvinner-terrasselivet-1600x1600.webp',
    'To kvinner med Utekos TechDown på terrassen.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-bobil-bonfire-overlay-mobile',
    '/utekos-techdown-bobil-bonfire-overlay-1600x1600.webp',
    'Utekos TechDown ved bobil og bålpanne.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-fullfigur-bakfra-mobile',
    '/utekos-techdown-fullfigur-bakfra-1600x1600.webp',
    'Utekos TechDown vist som fullfigur bakfra.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-diagonalt-fullfigur-mobile',
    '/utekos-techdown-fullfigur-diagonal-1600x1600.webp',
    'Utekos TechDown vist diagonalt som fullfigur.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-halvfigur-bakside-mobile',
    '/utekos-techdown-halvfigur-bakside-1600x1600.webp',
    'Utekos TechDown vist som halvfigur bakfra.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-halvfigur-forfra-mobile',
    '/utekos-techdown-halvfigur-forfra-1600x1600.webp',
    'Utekos TechDown vist som halvfigur forfra.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-halvfigur-diagonal-mobile',
    '/utekos-techdown-halvfigur-diagonal-1600x1600.webp',
    'Utekos TechDown vist som halvfigur diagonalt.',
    1600,
    1600
  ),
  productImage(
    'utekos-techdown-zipper-detaljer-mobile',
    '/utekos-techdown-zipper-detaljer-1600x1600.webp',
    'Detaljbilde av glidelås på Utekos TechDown.',
    1600,
    1600
  )
]

const TECHDOWN_DESKTOP_GALLERY_IMAGES: Image[] = [
  productImage(
    'utekos-techdown-kvinne-terrasseliv-desktop',
    '/utekos-techdown-kvinne-terrasseliv-3-4.webp',
    'Kvinne med Utekos TechDown på terrassen.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-balpanne-kvinne-desktop',
    '/utekos-techdown-balpanne-kvinne-3-4.webp',
    'Kvinne med Utekos TechDown ved bålpanne.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-herre-terrasseliv-desktop',
    '/utekos-techdown-herre-terrasseliv-3-4.webp',
    'Mann med Utekos TechDown på terrassen.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-to-kvinner-terrasseliv-desktop',
    '/utekos-techdown-to-kvinner-terrasseliv-3-4.webp.webp',
    'To kvinner med Utekos TechDown på terrassen.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-fullfigur-bakfra-desktop',
    '/utekos-techdown-fullfigur-bakfra-3-4.webp',
    'Utekos TechDown vist som fullfigur bakfra.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-fullfigur-diagonal-desktop',
    '/utekos-techdown-fullfigur-diagonal-3-4.webp',
    'Utekos TechDown vist diagonalt som fullfigur.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-halvfigur-forfra-desktop',
    '/utekos-techdown-halvfigur-forfra-3-4.webp',
    'Utekos TechDown vist som halvfigur forfra.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-halvfigur-diagonal-desktop',
    '/utekos-techdown-halvfigur-diagonal-3-4.webp',
    'Utekos TechDown vist som halvfigur diagonalt.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-tre-i-en-forfra-desktop',
    '/utekos-techdown-tre-i-en-forfra-4-3.webp',
    'Utekos TechDown tre-i-en vist forfra.',
    2600,
    1950
  ),
  productImage(
    'utekos-techdown-tre-i-en-bakside-desktop',
    '/utekos-techdown-tre-i-en-bakfra-desktop-3-4.webp',
    'Utekos TechDown tre-i-en vist bakfra.',
    2600,
    1950
  )
]

const MICROFIBER_DESKTOP_GALLERY_IMAGES: Image[] = [
  productImage(
    'utekos-mikrofiber-terrasseliv-kvinne-kaffe-desktop',
    '/farsdag/utekos-mikrofiber-terrasseliv-kvinne-kaffe-3-4.webp',
    'Kvinne med Utekos Mikrofiber på terrassen med kaffe.',
    2600,
    1950
  ),
  productImage(
    'utekos-mikrofiber-fullfigur-forfra-desktop',
    '/farsdag/utekos-mikrofiber-fullfigur-forfra-3-4.webp',
    'Utekos Mikrofiber vist som fullfigur forfra.',
    2600,
    1950
  ),
  productImage(
    'utekos-mikrofiber-parkas-desktop',
    '/farsdag/utekos-mikrofiber-parkas-3-4.webp',
    'Utekos Mikrofiber vist i parkasmodus.',
    2600,
    1950
  ),
  productImage(
    'utekos-mikrofiber-halvfigur-forfra-desktop',
    '/farsdag/utekos-mikrofiber-halvfigur-forfra-3-4.webp',
    'Utekos Mikrofiber vist som halvfigur forfra.',
    2600,
    1950
  ),
  productImage(
    'utekos-mikrofiber-fullfigur-bakfra-desktop',
    '/farsdag/utekos-mikrofiber-fullfigur-bakfra-3-4.webp',
    'Utekos Mikrofiber vist som fullfigur bakfra.',
    2600,
    1950
  ),
  productImage(
    'utekos-mikrofiber-terrasseliv-par-desktop',
    '/farsdag/utekos-mikrofiber-terrasseliv-par-3-4.webp',
    'Par med Utekos Mikrofiber på terrassen.',
    2600,
    1950
  )
]

const STAPPER_MOBILE_GALLERY_IMAGES: Image[] = [
  productImage(
    'utekos-stapper-mobile',
    '/utekos-stapper-1600-1600.webp',
    'Utekos Stapper kompresjonsbag.',
    1600,
    1600
  )
]

const STAPPER_DESKTOP_GALLERY_IMAGES: Image[] = [
  productImage(
    'utekos-stapper-desktop',
    '/utekos-stapper-2600-1950.webp',
    'Utekos Stapper kompresjonsbag.',
    2600,
    1950
  )
]

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

  return (
    <article className='relative isolate overflow-x-clip bg-cloud-dancer py-0 text-havdyp md:py-6'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-[8%] top-12 h-80 w-80 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ancient-water)_62%,transparent)_0%,transparent_72%)] blur-3xl' />
        <div className='absolute bottom-[18%] right-[8%] h-96 w-96 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--dusted-peri)_20%,transparent)_0%,transparent_72%)] blur-3xl' />
      </div>

      <div className='container mx-auto px-4 md:px-8'>
        <AnimatedBlock className='will-animate-fade-in-up hidden md:block' delay='0s' threshold={0.2}>
          <Breadcrumb className='mb-8 text-maritime-darkest'>
            <BreadcrumbList className='text-maritime-darkest'>
              <BreadcrumbItem>
                <BreadcrumbLink href='/' className='text-maritime-darkest hover:text-maritime-darkest/80'>
                  Forside
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='text-maritime-darkest' />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href='/produkter'
                  className='text-maritime-darkest hover:text-maritime-darkest/80'
                >
                  Produkter
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='text-maritime-darkest' />
              <BreadcrumbItem>
                <BreadcrumbPage className='text-maritime-darkest'>{productData.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </AnimatedBlock>

        <div className='hidden md:block'>
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
                  <div className='relative isolate overflow-hidden rounded-none md:rounded-[1.5rem]'>
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
                <Breadcrumb className='mb-4 text-maritime-darkest'>
                  <BreadcrumbList className='text-maritime-darkest'>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href='/'
                        className='text-maritime-darkest hover:text-maritime-darkest/80'
                      >
                        Forside
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='text-maritime-darkest' />
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href='/produkter'
                        className='text-maritime-darkest hover:text-maritime-darkest/80'
                      >
                        Produkter
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='text-maritime-darkest' />
                    <BreadcrumbItem>
                      <BreadcrumbPage className='text-maritime-darkest'>{productData.title}</BreadcrumbPage>
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
                className='relative -mt-4 md:mt-6'
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
