import type { Metadata } from 'next'
import { JsonLdScript } from './components/JsonLdScript'
import { MagazineBreadcrumbs } from './components/MagazineBreadcrumbs'
import { MagazineGrid } from './components/MagazineGrid'
import { MagazineOverviewHero } from './components/MagazineOverviewHero'
import { buildMagazineCollectionJsonLd } from './seo/buildMagazineCollectionJsonLd'
import { buildMagazineOverviewMetadata } from './seo/buildMagazineOverviewMetadata'
import { getMagazineArticles } from './utils/getMagazineArticles'

export const metadata: Metadata = buildMagazineOverviewMetadata()

export default async function MagazinePage() {
  const articles = await getMagazineArticles()

  return (
    <main className='bg-overcast text-background'>
      <JsonLdScript data={buildMagazineCollectionJsonLd(articles)} />
      <section className='border-b border-background/12 bg-overcast'>
        <div className='container mx-auto px-4 py-5'>
          <MagazineBreadcrumbs />
        </div>
      </section>
      <MagazineOverviewHero articleCount={articles.length} />
      <MagazineGrid articles={articles} />
    </main>
  )
}
