// src/app/magasinet/[slug]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLdScript } from '../components/JsonLdScript'
import { getMagazineArticle } from '../utils/getMagazineArticle'
import { getMagazineArticleSlugs } from '../utils/getMagazineArticleSlugs'
import { buildArticleJsonLd } from '../seo/buildArticleJsonLd'
import { buildArticleMetadata } from '../seo/buildArticleMetadata'
import { buildBreadcrumbJsonLd } from '../seo/buildBreadcrumbJsonLd'
import { MagazineArticleShell } from '../components/MagazineArticleShell'
// src/app/magasinet/[slug]/page.tsx

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
    <>
      <JsonLdScript data={buildArticleJsonLd(article)} />
      <JsonLdScript data={buildBreadcrumbJsonLd(article)} />

      <MagazineArticleShell article={article}>
        <Article />
      </MagazineArticleShell>
    </>
  )
}
