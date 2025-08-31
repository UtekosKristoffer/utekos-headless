// Fil: src/Components/Products/ProductCard.tsx
import type { Route } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

async function ProductCard({ product }: ProductCardProps) {
  const price = formatPrice(product.price)
  const productUrl = `/products/${product.handle}` as Route
  const imageUrl = product.featuredImage?.url || '/placeholder.svg'
  const altText = product.featuredImage?.altText || product.title

  return (
    <Link href={productUrl} className='group flex'>
      <Card className='h-full flex flex-col transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1 w-full'>
        <CardContent className='p-0'>
          <AspectRatio ratio={2 / 3} className='w-full overflow-hidden rounded-t-lg bg-surface-raised/40'>
            <Image src={imageUrl} alt={altText} fill className='object-cover transition-transform duration-300 group-hover:scale-105' />
          </AspectRatio>
        </CardContent>
        <CardHeader className='flex-grow p-4'>
          <CardTitle className='text-base font-medium line-clamp-2'>{product.title}</CardTitle>
        </CardHeader>
        <CardFooter className='p-4 pt-0 flex justify-between items-center'>
          <p className='font-semibold'>{price}</p>
          <Button variant='outline' size='sm'>
            Se produkt
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProductCard
