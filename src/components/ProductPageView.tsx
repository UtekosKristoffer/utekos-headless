'use client'

import { AddToCartController } from '@/components/cart/AddToCartController'
import {
  Price,
  SizeSelector,
  ColorSelector,
  OptionsColumn,
  GalleryColumn,
  ProductGrid
} from '@/components/jsx'
import ProductPageAccordion from '@/components/ProductPageAccordion'
import dynamic from 'next/dynamic'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/Breadcrumb'

import type {
  ShopifyProductVariant,
  ShopifyProduct
} from '@/types/products'
import type { ShopifyMediaImage } from '@/types/media'

// Dynamisk import fordi komponenten bruker et tredjepartsbibliotek som ikke støtter SSR

const ProductGallery = dynamic(
  () =>
    import('@/components/jsx/ProductGallery').then(mod => mod.ProductGallery),
  {
    ssr: false,
    loading: () => (
      <div className='relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-surface-raised/40' />
    )
  }
)

type Props = {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
  allVariants: ShopifyProductVariant[]
  variantImages: ShopifyMediaImage[]
  onOptionChange: (optionName: string, value: string) => void
}

/**
 * @module components/ProductPageView
 * @param ProductPageView Exists to be a "canvas". It is designed to be as simple and reusable as possible.
 */
export default function ProductPageView({
  product,
  selectedVariant,
  allVariants,
  variantImages,
  onOptionChange
}: Props) {
  const { title, descriptionHtml, options } = product
  const variantProfile = selectedVariant.variantProfile?.reference
  const subtitle = variantProfile?.subtitle?.value
  const optionOrder = ['Størrelse', 'Farge']
  const sortedOptions = options
    .filter(option => optionOrder.includes(option.name))
    .sort(
      (color, size) =>
        optionOrder.indexOf(color.name) - optionOrder.indexOf(size.name)
    )

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
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductGrid>
        <GalleryColumn>
          <div className='mb-8 text-left'>
            <h1 className='text-3xl font-bold md:text-4xl'>{title}</h1>
            {subtitle && (
              <p className='mt-2 text-lg text-foreground-on-dark/80'>
                {subtitle}
              </p>
            )}
          </div>
          <div className='md:sticky md:top-24 h-fit'>
            <div className='mx-auto max-w-xl'>
              <div className='aspect-video w-full rounded-2xl bg-surface-raised/20 p-4'>
                <ProductGallery title={title} images={variantImages} />
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
              {sortedOptions.map(option => {
                const lower = option.name.toLowerCase()
                const props = {
                  optionName: option.name,
                  values: option.values,
                  variants: allVariants,
                  selectedVariant,
                  onSelect: onOptionChange
                }

                if (lower === 'størrelse')
                  return <SizeSelector key={option.name} {...props} />
                if (lower === 'farge')
                  return <ColorSelector key={option.name} {...props} />
                return null
              })}
            </div>

            <div className='mt-8'>
              <AddToCartController selectedVariant={selectedVariant} />
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
      <ProductPageAccordion
        variantProfile={selectedVariant.variantProfile?.reference}
      />
    </main>
  )
}
