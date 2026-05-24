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
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { articleComponents } from './articleComponents'
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

  return (
    <div className='container mx-auto px-4'>
      <div className='mx-auto'>
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
      <ArticleComponent />
    </div>
  )
}
