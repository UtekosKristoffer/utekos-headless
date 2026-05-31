// Path: src/app/skreddersy-varmen/components/LandingPurchaseSection.tsx

import { PurchaseClientLanding } from './PurchaseClientLanding'
import { getProduct } from '@/api/lib/products/getProduct'

export async function LandingPurchaseSection() {
  const [techDown, mikro] = await Promise.all([
    getProduct('utekos-techdown'),
    getProduct('utekos-mikrofiber')
  ])

  const productsMap = {
    'utekos-techdown': techDown,
    'utekos-mikro': mikro
  }

  if (!techDown) {
    return (
      <div className='w-full bg-overcast px-6 py-16 text-background'>
        <div className='mx-auto max-w-3xl rounded-sm border border-background/12 bg-cloud-dancer p-6 text-center shadow-sm'>
          <p className='font-google-sans text-xl font-bold'>Produktvalget er midlertidig utilgjengelig</p>
          <p className='mt-2 text-l leading-relaxed text-background/75'>
            Landingssiden er lastet, men produktdata kunne ikke hentes akkurat nå.
          </p>
        </div>
      </div>
    )
  }

  return <PurchaseClientLanding products={productsMap} />
}
