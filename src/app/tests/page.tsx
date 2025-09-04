import getProducts from '@/lib/helpers/products/fetchProducts'
import React from 'react'
export type Props = {}

const ProductPage = (props: Props) => {
  return <div>ProductPage</div>
}

export default ProductPage

export async function getStaticProps() {
  const products = await getProducts(['product1', 'product2'])

  return {
    props: {
      products
    },
    revalidate: 60 // Revalidate every 60 seconds
  }
}
