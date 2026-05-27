// src/app/magasinet/[slug]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MagazineArticleHeader } from '../components/MagazineArticleHeader'
import { MagazineBreadcrumbs } from '../components/MagazineBreadcrumbs'
import { JsonLdScript } from '../components/JsonLdScript'
import { getMagazineArticle } from '../utils/getMagazineArticle'
import { getMagazineArticleSlugs } from '../utils/getMagazineArticleSlugs'
import { buildArticleJsonLd } from '../seo/buildArticleJsonLd'
import { buildArticleMetadata } from '../seo/buildArticleMetadata'
import { buildBreadcrumbJsonLd } from '../seo/buildBreadcrumbJsonLd'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getMagazineArticleSlugs()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getMagazineArticle(slug)

  if (!article) {
    return {
      title: 'Artikkel ikke funnet | Utekos'
    }
  }

  return buildArticleMetadata(article)
}

export default async function MagazineArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getMagazineArticle(slug)

  if (!article) {
    notFound()
  }

  const Article = article.Article

  return (
    <main className='container mx-auto px-4'>
      <JsonLdScript data={buildArticleJsonLd(article)} />
      <JsonLdScript data={buildBreadcrumbJsonLd(article)} />

      <div className='mx-auto max-w-4xl'>
        <MagazineBreadcrumbs article={article} />
        <MagazineArticleHeader article={article} />
        <Article />
      </div>
    </main>
  )
}
