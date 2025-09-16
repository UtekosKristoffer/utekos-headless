// Path: src/components/ProductCard.tsx
import Image from 'next/image'
import Link from 'next/link'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { ShopifyProduct } from '@types'

import type { Route } from 'next'

interface ProductCardProps {
  product: ShopifyProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const price = formatPrice(product.priceRange.minVariantPrice)
  const productUrl = `/produkter/${product.handle}` as Route
  const imageUrl = product.featuredImage?.url || '/placeholder.svg'
  const altText = product.featuredImage?.altText || product.title

  return (
    <Link href={productUrl} className='group flex'>
      <Card className='h-full flex flex-col bg-card-foreground transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1 w-full'>
        <CardContent className='p-0'>
          <AspectRatio
            ratio={2 / 3}
            className='w-full overflow-hidden rounded-t-lg'
          >
            <Image
              src={imageUrl}
              alt={altText}
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-105'
            />
          </AspectRatio>
        </CardContent>
        <CardHeader className='flex-grow p-4'>
          <CardTitle className='text-base font-medium line-clamp-2'>
            {product.title}
          </CardTitle>
        </CardHeader>
        <CardFooter className='p-4 pt-0 flex justify-between items-center'>
          <p className='font-semibold'>{price}</p>
          <Button variant='secondary' size='sm'>
            Se produkt
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
