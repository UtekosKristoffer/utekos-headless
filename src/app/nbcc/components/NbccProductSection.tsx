import { getProduct } from '@/api/lib/products/getProduct'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { ShopifyProductVariant } from 'types/product'
import { cacheLife, cacheTag } from 'next/cache'

import { nbccProducts } from '../data/nbccLandingPageContent'
import { NbccAiSummaryButton } from './NbccAiSummaryButton'
import { NbccProductCarousel } from './NbccProductCarousel'
import {
  NbccProductCardActions,
  type NbccProductVariant
} from './NbccProductCardActions'

function normalizeVariantOption(value: string): string {
  return value.trim().toLocaleLowerCase('nb-NO')
}

function resolveVariantsForSizes(
  allVariants: ShopifyProductVariant[],
  sizes: string[],
  color?: string
): NbccProductVariant[] {
  return sizes.flatMap(label => {
    const normalizedLabel = normalizeVariantOption(label)

    const variant = allVariants.find(v => {
      const hasSize = v.selectedOptions.some(
        option => normalizeVariantOption(option.value) === normalizedLabel
      )

      if (!hasSize) return false

      if (color) {
        const normalizedColor = normalizeVariantOption(color)

        return v.selectedOptions.some(
          option => normalizeVariantOption(option.value) === normalizedColor
        )
      }

      return true
    })

    if (!variant) return []

    return [
      {
        label,
        variantId: variant.id,
        availableForSale: variant.availableForSale,
        price: formatPrice(variant.price)
      }
    ]
  })
}

export async function NbccProductSection() {
  'use cache'
  cacheLife('hours')
  cacheTag('products')

  const fetched = await Promise.all(nbccProducts.map(p => getProduct(p.handle)))

  return (
    <section
      id='produkter'
      className='bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-8'
    >
      <div className='mx-auto max-w-7xl'>
        <div
          data-nbcc-reveal
          data-nbcc-animate
          className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'
        >
          <div>
            <Badge className='rounded-md border-[#f0c36a]/30 bg-[#f0c36a]/10 px-3 py-2 text-[#f0c36a]'>
              Utekos for NBCC-medlemmer
            </Badge>
            <h2 className='mt-5 max-w-2xl text-balance text-3xl font-semibold tracking-normal text-white sm:text-4xl'>
              Skreddersy din campingopplevelse.
            </h2>
          </div>
        </div>

        <div className='mt-12 grid gap-5 lg:grid-cols-3'>
          {nbccProducts.map((product, index) => {
            const shopifyProduct = fetched[index]
            const variants =
              shopifyProduct ?
                resolveVariantsForSizes(
                  shopifyProduct.variants.edges.map(e => e.node),
                  product.sizes,
                  product.color
                )
              : []

            return (
              <Card
                key={product.title}
                data-nbcc-reveal
                data-nbcc-animate
                className='group overflow-hidden rounded-lg border-white/[0.10] bg-[#1a1713] py-0 shadow-none'
              >
                <CardHeader className='px-0'>
                  <NbccProductCarousel images={product.images} />
                </CardHeader>
                <CardContent className='px-6 pb-0'>
                  <p className='text-sm font-semibold uppercase tracking-[0.18em] text-[#f0c36a]'>
                    {product.shortTitle}
                  </p>
                  <CardTitle className='mt-3 text-2xl font-semibold text-white'>
                    {product.title}
                  </CardTitle>
                  <div className='mt-5'>
                    <NbccProductCardActions
                      variants={variants}
                      href={product.href}
                      productTitle={product.title}
                      tracking={product.tracking}
                    />
                  </div>
                </CardContent>
                <CardFooter className='px-6 py-6' />
              </Card>
            )
          })}
        </div>

        <div
          data-nbcc-reveal
          data-nbcc-animate
          className='mt-10 flex justify-center'
        >
          <NbccAiSummaryButton
            intent='sizes'
            idleLabel='Få størrelseshjelp'
            completedLabel='Vis størrelseshjelp'
            trackingName='NbccSizeInfoAiClick'
            trackingData={{
              page: 'nbcc',
              section: 'products',
              target: 'sizes-ai'
            }}
            containerClassName='flex w-full max-w-3xl flex-col items-center'
            panelClassName='w-full'
            buttonClassName='h-12 w-full justify-center gap-2 rounded-md border-white/20 bg-white/[0.06] px-6 text-white hover:bg-white/[0.12] sm:w-auto'
          />
        </div>
      </div>
    </section>
  )
}
