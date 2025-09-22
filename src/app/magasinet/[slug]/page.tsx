import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { mockArticles } from '@/db/data/articles' // Henter fra den sentraliserte filen
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// --- Komponent-kart: Fullført med alle artikler ---
const articleComponents = {
  'balpannen-din-guide-til-den-perfekte-hostkvelden': dynamic(() =>
    import(
      '../@articles/balpannen-din-guide-til-den-perfekte-hostkvelden'
    ).then(mod => mod.BalpanneArticle)
  ),
  'vinterklargjoring-av-hytta-en-sjekkliste-for-livsnyteren': dynamic(() =>
    import('../@articles/vinterklargjoring-av-hytta').then(
      mod => mod.VinterklargjoringArticle
    )
  ),
  '5-enkle-tips-for-a-forlenge-terrassesongen': dynamic(() =>
    import('../@articles/5-enkle-tips-for-a-forlenge-terrassesongen').then(
      mod => mod.TerrasseArticle
    )
  ),
  'slik-skaper-du-den-perfekte-stemningen-pa-hytta': dynamic(() =>
    import(
      '../@articles/slik-skaper-du-den-perfekte-stemningen-pa-hytten'
    ).then(mod => mod.HyttekosArticle)
  ),
  'den-ultimate-guiden-til-komfortabel-vintercamping': dynamic(() =>
    import(
      '../@articles/den-ultimate-guiden-til-komfortabel-vintercamping'
    ).then(mod => mod.VintercampingArticle)
  ),
  'bobil-i-hostferien-de-vakreste-rutene-for-a-oppleve-hostfargene': dynamic(
    () =>
      import('../@articles/bobil-i-hostferien').then(
        mod => mod.BobilHostruterArticle
      )
  ),
  // Legger til en plassholder for "Båtpuss"-artikkelen for fremtiden
  'varm-og-klar-for-batpussen': dynamic(() =>
    import('../@articles/varm-og-klar-for-batpussen').then(
      mod => mod.BatpussArticle
    )
  )
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = mockArticles.find(p => p.slug === params.slug)
  if (!article) return { title: 'Artikkel ikke funnet' }

  return {
    title: `${article.title} | Utekos-Magasinet`,
    description: article.excerpt,
    alternates: {
      canonical: `/magasinet/${article.slug}`
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/magasinet/${article.slug}`,
      siteName: 'Utekos-Magasinet',
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

// Funksjon for å generere statiske sider
export async function generateStaticParams() {
  return mockArticles.map(article => ({ slug: article.slug }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = mockArticles.find(p => p.slug === params.slug)
  const ArticleComponent =
    articleComponents[params.slug as keyof typeof articleComponents]

  if (!article || !ArticleComponent) {
    notFound()
  }

  return (
    <div className='container mx-auto px-4'>
      <div className='max-w-5xl mx-auto'>
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
        <h1 className='text-4xl md:text-5xl font-bold tracking-tight !mt-8 !mb-4'>
          {article.title}
        </h1>
      </div>

      <ArticleComponent />
    </div>
  )
}
