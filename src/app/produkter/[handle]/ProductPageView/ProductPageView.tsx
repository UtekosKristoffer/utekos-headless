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
import { ShieldAlert, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'
import { ProductDescription } from './ProductDescription'
import { motion } from 'framer-motion'

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
    <main className='relative container mx-auto mt-10 p-4 md:p-8 overflow-hidden'>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
      </motion.div>

      <ProductPageGrid>
        <GalleryColumn>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='mb-8 text-left'
          >
            {productData.handle === 'utekos-special-edition' && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-900/20 px-4 py-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className='text-sm font-medium text-amber-400'>Begrenset opplag</span>
              </div>
            )}
            
            <h1 className='text-fluid-headline font-bold'>{title}</h1>
            {subtitle && typeof subtitle === 'string' && (
              <p className='mt-3 text-lg leading-relaxed text-foreground/80'>
                {subtitle}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='h-fit md:sticky md:top-24'
          >
            <div className='mx-auto max-w-xl'>
              <div className='group relative w-full rounded-2xl border border-neutral-800 bg-sidebar-foreground p-4 shadow-xl overflow-hidden transition-all duration-300 hover:border-neutral-700'>
                {/* Subtle glow behind gallery */}
                <div
                  className='absolute -inset-2 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20'
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)'
                  }}
                />
                
                <div className='relative'>
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
          </motion.div>
        </GalleryColumn>

        <OptionsColumn>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Price
              amount={selectedVariant.price.amount}
              currencyCode={selectedVariant.price.currencyCode}
            />

            {productData.handle === 'utekos-special-edition' && (
              <div className='relative mt-4 overflow-hidden rounded-lg border border-amber-400/30 bg-amber-900/10 p-4'>
                {/* Aurora effect */}
                <div
                  className='absolute -inset-x-2 -inset-y-8 opacity-20 blur-2xl'
                  style={{
                    background: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, #f59e0b 100%)'
                  }}
                />
                
                <div className="relative flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10">
                    <ShieldAlert className='h-5 w-5 text-amber-400' />
                  </div>
                  <div>
                    <p className='font-semibold text-amber-400'>Kun 11 igjen på lager!</p>
                    <p className='text-sm text-amber-400/80'>Sikre deg din før det er for sent</p>
                  </div>
                </div>
              </div>
            )}

            {metadata?.showActivity && (
              <div className="mt-4">
                <SmartRealTimeActivity baseViewers={metadata.baseViewers ?? 3} />
              </div>
            )}
          </motion.div>

          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            aria-labelledby='product-options'
          >
            <h2 id='product-options' className='sr-only'>
              Produktvalg
            </h2>
            <div className='mt-8 flex flex-col gap-8'>
              {sortedOptions.map((option: ShopifyProduct['options'][number]) =>
                renderOptionComponent({
                  option,
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
          </motion.section>
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