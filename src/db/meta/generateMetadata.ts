export async function generateMetadata({
  params
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const productId = handle
  const product: ShopifyProduct | null = await getProductByHandle(productId)
  if (!product) {
    notFound()
  }

  return {
    title: product.title,
    description: product.descriptionHtml,
    openGraph: {
      title: product.title,
      description: product.descriptionHtml,
      images: [
        {
          url: product.media.edges[0]?.node.image.url,
          width: product.media.edges[0]?.node.image.width || 800,
          height: product.media.edges[0]?.node.image.height || 600,
          alt: product.title
        }
      ]
    }
  }
}
