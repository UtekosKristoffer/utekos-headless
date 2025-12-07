// Path: src/lib/utils/generateFeedXml.ts

import { getProducts } from '@/api/lib/products/getProducts'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId' // <--- NY IMPORT
import { cacheLife } from 'next/cache'
import { escapeXml } from '@/lib/utils/escapeXml'
import { stripHtml } from '@/lib/utils/stripHtml'

function formatPrice(amount: string | number, currencyCode: string): string {
  return `${Number(amount).toFixed(2)} ${currencyCode}`
}

export async function generateFeedXml() {
  'use cache'
  cacheLife('hours')

  const baseUrl = 'https://utekos.no'

  console.log('Generating Google Feed...')
  const response = await getProducts({ first: 250 })

  if (!response.success || !response.body) {
    throw new Error(`Failed to fetch products: ${response.error}`)
  }

  const products = response.body
  const xmlItems: string[] = []

  for (const product of products) {
    if (!product.variants.edges || product.variants.edges.length === 0) continue

    const description = escapeXml(
      stripHtml(product.description || product.title)
    )
    const productTitle = escapeXml(product.title)
    const googleCategory = '203'

    const cleanGroupId = cleanShopifyId(product.id)

    for (const edge of product.variants.edges) {
      const variant = edge.node

      const variantId = cleanShopifyId(variant.id)

      const link = `${baseUrl}/produkter/${product.handle}?variant=${encodeURIComponent(variant.id)}`

      const imageUrl = variant.image?.url || product.featuredImage?.url || ''
      const price = formatPrice(
        variant.price.amount,
        variant.price.currencyCode
      )

      let salePriceLine = ''
      if (
        variant.compareAtPrice
        && Number(variant.compareAtPrice.amount) > Number(variant.price.amount)
      ) {
        const salePrice = formatPrice(
          variant.price.amount,
          variant.price.currencyCode
        )
        salePriceLine = `<g:sale_price>${salePrice}</g:sale_price>`
      }

      const availability =
        variant.availableForSale ? 'in_stock' : 'out_of_stock'

      let color = ''
      let size = ''

      variant.selectedOptions.forEach(opt => {
        const name = opt.name.toLowerCase()
        if (name.includes('farge') || name.includes('color'))
          color = escapeXml(opt.value)
        if (name.includes('størrelse') || name.includes('size'))
          size = escapeXml(opt.value)
      })

      const priceAmount = Number(variant.price.amount)
      const shippingCost = priceAmount >= 999 ? '0.00' : '99.00'

      xmlItems.push(`
    <item>
      <g:id>${escapeXml(variantId)}</g:id> 
      <g:title>${productTitle} - ${color} / ${size}</g:title>
      <g:description>${description}</g:description>
      <g:link>${link}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:brand>Utekos</g:brand>
      <g:condition>new</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${price}</g:price>
      ${salePriceLine}
      <g:google_product_category>${googleCategory}</g:google_product_category>
      <g:item_group_id>${escapeXml(cleanGroupId)}</g:item_group_id>
      
      <g:gender>unisex</g:gender>
      <g:age_group>adult</g:age_group>
      ${color ? `<g:color>${color}</g:color>` : ''}
      ${size ? `<g:size>${size}</g:size>` : ''}
      ${variant.sku ? `<g:mpn>${escapeXml(variant.sku)}</g:mpn>` : ''}
      
      <g:shipping>
        <g:country>NO</g:country>
        <g:service>Standard</g:service>
        <g:price>${shippingCost} NOK</g:price>
      </g:shipping>
      
      <g:transit_time_label>Rask levering</g:transit_time_label>
      <g:shipping_label>${priceAmount >= 999 ? 'Fri frakt' : 'Standard'}</g:shipping_label>
    </item>`)
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Utekos Produktfeed</title>
    <link>${baseUrl}</link>
    <description>Norsk design, kompromissløs komfort.</description>
    ${xmlItems.join('')}
  </channel>
</rss>`
}
