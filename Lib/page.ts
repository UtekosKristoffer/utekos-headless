// src/app/(home)/page.tsx

import HomePageHero from '@/components/sections/SectionHomePage'
import FeaturedProducts from '@/components/sections/SectionFeaturedProducts'
import { GetProductsQuery } from '@/shared/GetProductsQuery.types'
import { GetProductsQueryVariables } from '@/hooks/useGetProductsQuery'
import { GetProductsDocument } from '@/constants/ProductFragment'
import { ShopifyRequestClient as Fetcher } from '@/app/api/clients/shopifyRequestClient'

async function HomePage() {
  const heroHandles = ['utekos-dun', 'comfyrobe', 'utekos-mikrofiber']
  const heroQuery = heroHandles.map(h => `handle:${h}`).join(' OR ')
  const getHeroProductsPromise = Fetcher<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, { first: heroHandles.length, query: heroQuery })()
  const getFeaturedProductsPromise = Fetcher<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, { first: 4, query: '' })()
  const [heroResult, featuredResult] = await Promise.all([getHeroProductsPromise, getFeaturedProductsPromise])

  const heroProducts = heroResult?.products.edges ?? []
  const featuredProducts = featuredResult?.products.edges ?? []

  return (
    <main>
      <HomePageHero products={heroProducts} />
      <FeaturedProducts products={featuredProducts} />
    </main>
  )
}

export default HomePage
