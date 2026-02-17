import { ComfyrobeImageSection } from './ComfyrobeImageSection'
import { ComfyrobeContentColumn } from './ComfyrobeContentColumn'
import { Activity } from 'react'
import { getProduct } from '@/modules/products/services/getProduct'
import { cacheLife } from 'next/cache' // Husk import
function getFirstAvailableVariantId(product: any): string {
  if (!product || !product.variants || !product.variants.edges) return ''

  const availableVariant = product.variants.edges.find(
    (edge: any) => edge.node.availableForSale
  )
  if (availableVariant) {
    return availableVariant.node.id
  }
  return product.variants.edges[0]?.node?.id || ''
}

export async function ComfyrobeSection() {
  'use cache'
  cacheLife('days')

  const comfyrobeProduct = await getProduct('comfyrobe')
  const comfyrobeId = getFirstAvailableVariantId(comfyrobeProduct)

  return (
    <section className='mx-auto max-w-[95%] py-20 sm:py-24 md:max-w-7xl'>
      <div className='container mx-auto'>
        <div className='relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 md:p-12'>
          <div className='absolute inset-0 -z-10 overflow-hidden'>
            <div
              className='absolute left-1/4 top-1/4 h-[600px] w-[600px] opacity-15 blur-3xl'
              style={{
                background:
                  'radial-gradient(circle, #475569 0%, transparent 70%)'
              }}
            />
            <div
              className='absolute right-1/4 bottom-1/4 h-[600px] w-[600px] opacity-10 blur-3xl'
              style={{
                background:
                  'radial-gradient(circle, #64748b 0%, transparent 70%)'
              }}
            />
          </div>
          <div className='grid grid-cols-1 relative rounded-2xl items-center gap-12 lg:grid-cols-2'>
            <Activity>
              <ComfyrobeImageSection />
            </Activity>
            <Activity>
              <ComfyrobeContentColumn variantId={comfyrobeId} />
            </Activity>
          </div>
        </div>
      </div>
    </section>
  )
}
