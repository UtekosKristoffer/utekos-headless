import { getProduct } from '@/api/lib/products/getProduct'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cacheLife, cacheTag } from 'next/cache'
import { nbccProducts } from '../utils/nbccLandingPageContent'
import { resolveVariantsForSizes } from '../utils/resolveVariantsForSizes'
import { NbccAiSummaryButton } from './NbccAiSummaryButton'
import { NbccProductCarousel } from './NbccProductCarousel'
import { NbccProductCardActions } from './NbccProductCardActions'

export async function NbccProductSection() {
  'use cache'
  cacheLife('hours')
  cacheTag('products')

  const fetched = await Promise.all(nbccProducts.map(p => getProduct(p.handle)))

  return (
    <section id='produkter' className='bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div
          data-nbcc-reveal
          data-nbcc-animate
          className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'
        >
          <div>
            <Badge className='rounded-md border-primary/30 bg-primary px-3 py-2 text-background  '>
              Utekos for NBCC-medlemmer
            </Badge>
            <h2 className='mt-5 max-w-2xl text-balance text-3xl font-google-sans font-semibold   text-cloud-dancer sm:text-4xl'>
              Skreddersy din campingopplevelse
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
                className='group overflow-hidden bg-havdyp/80 rounded-lg border-cloud-dancer/60 py-0 shadow-none'
              >
                <CardHeader className='p-0'>
                  <NbccProductCarousel images={product.images} />
                </CardHeader>
                <CardContent className='px-6 pb-0'>
                  <p className='text-sm font-semibold   text-cloud-dancer'>{product.shortTitle}</p>
                  <CardTitle className='mt-3 text-2xl   font-semibold text-cloud-dancer'>
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
                <CardFooter className='p-6' />
              </Card>
            )
          })}
        </div>

        <div data-nbcc-reveal data-nbcc-animate className='mt-10 flex justify-center'>
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
            buttonClassName='h-12 w-full justify-center gap-2 rounded-md border-cloud-dancer bg-havdyp px-6 text-cloud-dancer hover:bg-havdyp/90 sm:w-auto'
          />
        </div>
      </div>
    </section>
  )
}
