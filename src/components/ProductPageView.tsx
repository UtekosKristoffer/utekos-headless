'use client'

import { ProductGrid } from '@/components/ui/ProductGrid'
import { GalleryColumn } from '@/components/ui/GalleryColumn'
import { OptionsColumn } from '@/components/ui/OptionsColumn'

import AddToCart from '@/components/cart/AddToCart'
import Price from '@/components/ui/Price'
import ProductPageAccordion from '@/components/ProductPageAccordion'
import ColorSelector from './ColorSelector'
import SizeSelector from '@/components/ui/SizeSelector'
import dynamic from 'next/dynamic'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

const ProductGallery = dynamic(() => import('@/components/ui/ProductGallery').then(mod => mod.ProductGallery), {
  ssr: false,
  loading: () => <div className='relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-surface-raised/40' />
})

import type { ProductVariant, Image, ProductsQueryResponse } from '@/types'

type Props = {
  product: ProductsQueryResponse
  selectedVariant: ProductVariant
  allVariants: ProductVariant[]
  variantImages: Image[]
  onOptionChange: (optionName: string, value: string) => void
}

function ProductPageView({ product, selectedVariant, allVariants, variantImages, onOptionChange }: Props) {
  const { title, descriptionHtml, selectedOrFirstAvailableVariant: productOptions } = product
  const variantProfile = selectedVariant.metafield.reference
  const subtitle = variantProfile?.subtitle?.value ?? undefined

  const optionOrder = ['Størrelse', 'Farge'] as const
  type Ordered = (typeof optionOrder)[number]

  const sortedOptions = (productOptions ?? [])
    .filter((opt): opt is (typeof productOptions)[number] => {
      return optionOrder.includes(opt.name as Ordered)
    })
    .sort((a, b) => {
      const ia = optionOrder.indexOf(a.name as Ordered)
      const ib = optionOrder.indexOf(b.name as Ordered)
      return ia - ib
    })

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
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductGrid>
        <GalleryColumn>
          <div className='mb-8 text-left'>
            <h1 className='text-3xl font-bold md:text-4xl'>{title}</h1>
            {subtitle ?
              <p className='mt-2 text-lg text-foreground-on-dark/80'>{subtitle}</p>
            : null}
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
          <Price amount={selectedVariant.price.amount} currencyCode={selectedVariant.price.currencyCode} />
          <section aria-labelledby='product-options'>
            <h2 id='product-options' className='sr-only'>
              Produktvalg
            </h2>

            <div className='mt-30 space-y-8'>
              {sortedOptions.map(opt => {
                const lower = opt.name.toLowerCase()
                const selectorProps = {
                  optionName: opt.name,
                  values: opt.optionValues.map(v => v.name),
                  variants: allVariants,
                  selectedVariant,
                  onSelect: onOptionChange
                } as const

                if (lower === 'størrelse') return <SizeSelector key={opt.name} {...selectorProps} />
                if (lower === 'farge') return <ColorSelector key={opt.name} {...selectorProps} />
                return null
              })}
            </div>

            <div className='mt-8'>
              <AddToCart variantId={selectedVariant.id} />
            </div>

            <article aria-label='Produktbeskrivelse' className='prose prose-invert mt-12 max-w-none text-foreground-on-dark/80'>
              <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            </article>
          </section>
        </OptionsColumn>
      </ProductGrid>

      <ProductPageAccordion variantProfile={variantProfile} />
    </main>
  )
}

export default ProductPageView
