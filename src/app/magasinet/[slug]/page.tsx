// Path: src/app/magasinet/[slug]/page.tsx

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { mockArticles } from '@/db/data/articles'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Activity } from 'react'
import { ArticleJsonLd } from '../ArticleJsonLd' // Husk å importere denne

const articleComponents = {
  'beredskap-egenomsorg': dynamic(() =>
    import('../(articles)/beredskap-egenomsorg').then(
      mod => mod.BeredskapEgenomsorgArticle
    )
  ),
  'hva-er-utekos': dynamic(() =>
    import('../(articles)/hva-er-utekos').then(mod => mod.HvaErUtekosArticle)
  ),
  'balpannen-din-guide-til-den-perfekte-hostkvelden': dynamic(() =>
    import(
      '../(articles)/balpannen-din-guide-til-den-perfekte-hostkvelden'
    ).then(mod => mod.BalpanneArticle)
  ),
  'vinterklargjoring-av-hytta-en-sjekkliste-for-livsnyteren': dynamic(() =>
    import('../(articles)/vinterklargjoring-av-hytta').then(
      mod => mod.VinterklargjoringArticle
    )
  ),
  'utekos-techdown-lansering': dynamic(() =>
    import('../(articles)/utekos-techdown-lansering').then(
      mod => mod.TechDownArticle
    )
  ),
  '5-enkle-tips-for-a-forlenge-terrassesongen': dynamic(() =>
    import('../(articles)/5-enkle-tips-for-a-forlenge-terrassesongen').then(
      mod => mod.TerrasseArticle
    )
  ),
  'slik-skaper-du-den-perfekte-stemningen-pa-hytta': dynamic(() =>
    import(
      '../(articles)/slik-skaper-du-den-perfekte-stemningen-pa-hytten'
    ).then(mod => mod.HyttekosArticle)
  ),
  'den-ultimate-guiden-til-komfortabel-vintercamping': dynamic(() =>
    import(
      '../(articles)/den-ultimate-guiden-til-komfortabel-vintercamping'
    ).then(mod => mod.VintercampingArticle)
  ),
  'bobil-i-hostferien-de-vakreste-rutene-for-a-oppleve-hostfargene': dynamic(
    () =>
      import('../(articles)/bobil-i-hostferien').then(
        mod => mod.BobilHostruterArticle
      )
  ),
  'varm-og-klar-for-batpussen': dynamic(() =>
    import('../(articles)/varm-og-klar-for-batpussen').then(
      mod => mod.BatpussArticle
    )
  )
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = mockArticles.find(p => p.slug === slug)

  if (!article) return { title: 'Artikkel ikke funnet' }

  const url = `https://utekos.no/magasinet/${article.slug}`

  return {
    title: `${article.title} | Utekos-Magasinet`,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: url,
      siteName: 'Utekos',
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title
        }
      ],
      locale: 'no_NO',
      type: 'article'
    }
  }
}

export async function generateStaticParams() {
  return mockArticles.map(article => ({ slug: article.slug }))
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = mockArticles.find(p => p.slug === slug)
  const ArticleComponent =
    articleComponents[slug as keyof typeof articleComponents]

  if (!article || !ArticleComponent) {
    notFound()
  }

  // Henter dato fra mockArticles, eller bruker dagens dato som fallback (BØR FIKSES i dataen)
  // Google krever en datePublished for articles/blogPosting.
  const datePublished =
    'publishedAt' in article ?
      (article.publishedAt as string)
    : '2024-01-01T12:00:00+01:00'

  return (
    <div className='container mx-auto px-4'>
      <ArticleJsonLd
        url={`https://utekos.no/magasinet/${article.slug}`}
        title={article.title}
        description={article.excerpt}
        images={[article.imageUrl]} // Må være full URL
        datePublished={datePublished}
        authorName='Utekos'
      />

      <Activity>
        <div className='mx-auto md:max-w-4xl'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/'>Hjem</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/magasinet'>Magasinet</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className='!mt-8 !mb-4 text-4xl font-bold tracking-tight md:text-5xl'>
            {article.title}
          </h1>
        </div>
      </Activity>

      <Activity>
        <ArticleComponent />
      </Activity>
    </div>
  )
}
