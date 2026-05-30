import Image from 'next/image'
import Link from 'next/link'
import type { Route } from 'next'
import type { MagazineArticle } from '../types'
import { MagazineInlineTitle } from './MagazineInlineTitle'

type MagazineRelatedArticlesProps = {
  articles: MagazineArticle[]
}

export function MagazineRelatedArticles({ articles }: MagazineRelatedArticlesProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section className='border-t border-maritime-darkest/10 bg-cloud-dancer py-16 text-maritime-darkest'>
      <div className='container mx-auto px-4'>
        <header className='mb-8 max-w-2xl'>
          <p className='  text-sm font-semibold leading-[1.4]   text-havdyp'>Les videre</p>
          <h2 className='mt-2 font-google-sans text-4xl font-bold leading-[0.95]  '>
            Flere guider fra magasinet
          </h2>
        </header>
        <ul className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          {articles.map(article => (
            <li key={article.slug}>
              <Link
                href={`/magasinet/${article.slug}` as Route}
                className='group block h-full overflow-hidden rounded-lg border border-maritime-darkest/10 bg-overcast transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
              >
                <Image
                  src={article.heroImage.src}
                  alt={article.heroImage.alt}
                  width={article.heroImage.width}
                  height={article.heroImage.height}
                  sizes='(max-width: 768px) calc(100vw - 32px), 30vw'
                  className='aspect-[16/10] h-auto w-full object-cover'
                />
                <div className='p-5'>
                  <h3 className='font-google-sans text-2xl font-bold leading-[0.98]   text-maritime-darkest transition-colors group-hover:text-havdyp'>
                    <MagazineInlineTitle text={article.title} />
                  </h3>
                  <p className='mt-3   text-sm leading-[1.5]   text-maritime-darkest/72'>{article.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
