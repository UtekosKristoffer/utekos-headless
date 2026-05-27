// Path: src/app/magasinet/page.tsx

import type { Metadata } from 'next'
import { MagazineBreadcrumbs } from './components/MagazineBreadcrumbs'
import { MagazineGrid } from './components/MagazineGrid'
import { MagazineOverviewHero } from './components/MagazineOverviewHero'
import { buildMagazineOverviewMetadata } from './seo/buildMagazineOverviewMetadata'
import { magazineArticles } from './utils/magazineArticles'

export const metadata: Metadata = buildMagazineOverviewMetadata()

export default function MagazinePage() {
  return (
    <article className='bg-overcast w-screen max-w-full text-maritime-darkest'>
      <div className='mx-auto w-full px-4 py-8 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <MagazineBreadcrumbs />
        </div>

        <div className='mb-14 sm:mb-16'>
          <MagazineOverviewHero />
        </div>

        <MagazineGrid articles={magazineArticles} />
      </div>
    </article>
  )
}
