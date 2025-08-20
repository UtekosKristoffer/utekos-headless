import { ProductGrid } from '@/components/layout/ProductGrid'
import { GalleryColumn } from '@/components/layout/GalleryColumn'
import { OptionsColumn } from '@/components/layout/OptionsColumn'

import AddToCart from '@/components/products/AddToCart'
import Price from '@/components/products/Price'
import ProductPageAccordion from '@/components/products/ProductPageAccordion'
import ColorSelector from './ColorSelector'
import SizeSelector from './SizeSelector'
import dynamic from 'next/dynamic'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

const ProductGallery = dynamic(() => import('./ProductGallery').then(mod => mod.ProductGallery), {
  ssr: false,
  loading: () => <div className='relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-surface-raised/40' />
})

import type { ShopifyProduct, ShopifyProductVariant, ShopifyMediaImage } from '@/shared/types/shopify'

type Props = {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
  allVariants: ShopifyProductVariant[]
  variantImages: ShopifyMediaImage[]
  onOptionChange: (optionName: string, value: string) => void
}

function ProductPageView({ product, selectedVariant, allVariants, variantImages, onOptionChange }: Props) {
  const { title, descriptionHtml, options } = product
  const variantProfile = selectedVariant.variantProfile?.reference
  const subtitle = variantProfile?.subtitle?.value

  const optionOrder = ['Størrelse', 'Farge']
  const sortedOptions = options.filter(option => optionOrder.includes(option.name)).sort((a, b) => optionOrder.indexOf(a.name) - optionOrder.indexOf(b.name))

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
            {subtitle && <p className='mt-2 text-lg text-foreground-on-dark/80'>{subtitle}</p>}
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
              {sortedOptions.map(option => {
                const lower = option.name.toLowerCase()
                const props = {
                  optionName: option.name,
                  values: option.values,
                  variants: allVariants,
                  selectedVariant,
                  onSelect: onOptionChange
                }

                if (lower === 'størrelse') return <SizeSelector key={option.name} {...props} />
                if (lower === 'farge') return <ColorSelector key={option.name} {...props} />
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
      <ProductPageAccordion variantProfile={selectedVariant.variantProfile?.reference} />
    </main>
  )
}

export default ProductPageView
