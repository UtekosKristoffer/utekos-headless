import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getProduct } from '@/api/lib/products/getProduct'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { ShopifyProductVariant } from 'types/product'
import { cacheLife, cacheTag } from 'next/cache'
import Link from 'next/link'

import { nbccProducts } from '../data/nbccLandingPageContent'
import { NbccProductCarousel } from './NbccProductCarousel'
import {
  NbccProductCardActions,
  type NbccProductVariant
} from './NbccProductCardActions'

function resolveVariantsForSizes(
  allVariants: ShopifyProductVariant[],
  sizes: string[],
  color?: string
): NbccProductVariant[] {
  return sizes.flatMap(label => {
    const variant = allVariants.find(v => {
      const hasSize = v.selectedOptions.some(o => o.value === label)
      if (!hasSize) return false
      if (color) return v.selectedOptions.some(o => o.value === color)
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
          <Button
            asChild
            variant='outline'
            className='h-12 rounded-md border-white/20 bg-white/[0.06] px-6 text-white hover:bg-white/[0.12]'
          >
            <Link
              href='/produkter'
              data-track='NbccAllProductsClick'
              data-track-data={JSON.stringify({
                page: 'nbcc',
                section: 'products',
                target: 'all-products'
              })}
            >
              Se hele produktutvalget
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
