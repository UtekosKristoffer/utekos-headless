import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Route } from 'next'
import type { MagazineArticle } from '../types'
import { MagazineCategoryBadge } from './MagazineCategoryBadge'
import { MagazineInlineTitle } from './MagazineInlineTitle'

type MagazineGridProps = {
  articles: MagazineArticle[]
}

function FeaturedArticleCard({ article }: { article: MagazineArticle }) {
  return (
    <section className='bg-overcast py-14 text-maritime-darkest sm:py-20'>
      <div className='container mx-auto px-4'>
        <Link
          href={`/magasinet/${article.slug}` as Route}
          className='group grid overflow-hidden rounded-lg border border-maritime-darkest/10 bg-cloud-dancer shadow-[0_24px_70px_-54px_color-mix(in_oklch,var(--maritime-darkest)_68%,transparent)] transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:grid-cols-2'
          data-track='MagazineFeaturedClick'
        >
          <Image
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            width={article.heroImage.width}
            height={article.heroImage.height}
            sizes='(max-width: 768px) calc(100vw - 32px), 50vw'
            className='aspect-[16/11] h-auto w-full object-cover md:aspect-auto md:h-full'
            priority
          />
          <div className='flex flex-col justify-center p-6 sm:p-9 lg:p-12'>
            <div className='mb-5'>
              <MagazineCategoryBadge category={article.category} />
            </div>
            <h2 className='text-balance font-google-sans text-4xl font-bold leading-[0.95]   text-maritime-darkest sm:text-5xl'>
              <MagazineInlineTitle text={article.title} />
            </h2>
            <p className='mt-5   text-lg leading-[1.45]   text-maritime-darkest/90'>{article.excerpt}</p>
            <span className='mt-8 inline-flex items-center gap-2   text-base font-semibold leading-[1.4]   text-havdyp'>
              Les hele saken
              <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' aria-hidden />
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}

function MagazineArticleCard({ article }: { article: MagazineArticle }) {
  return (
    <li>
      <Link
        href={`/magasinet/${article.slug}` as Route}
        className='group block h-full overflow-hidden rounded-lg border border-maritime-darkest/10 bg-cloud-dancer transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
        data-track='MagazineGridClick'
      >
        <Image
          src={article.heroImage.src}
          alt={article.heroImage.alt}
          width={article.heroImage.width}
          height={article.heroImage.height}
          sizes='(max-width: 768px) calc(100vw - 32px), (max-width: 1200px) 45vw, 30vw'
          className='aspect-[16/10] h-auto w-full object-cover'
        />
        <div className='p-5'>
          <div className='mb-4'>
            <MagazineCategoryBadge category={article.category} />
          </div>
          <h3 className='font-google-sans text-2xl font-bold leading-[0.98]   text-maritime-darkest transition-colors group-hover:text-havdyp'>
            <MagazineInlineTitle text={article.title} />
          </h3>
          <p className='mt-3   text-sm leading-[1.5]   text-maritime-darkest/72'>{article.excerpt}</p>
        </div>
      </Link>
    </li>
  )
}

export function MagazineGrid({ articles }: MagazineGridProps) {
  const [featuredArticle, ...otherArticles] = articles

  if (!featuredArticle) {
    return (
      <section className='bg-overcast py-16 text-maritime-darkest'>
        <div className='container mx-auto px-4'>
          <p className='  text-lg leading-[1.55]  '>Ingen artikler er publisert ennå.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <FeaturedArticleCard article={featuredArticle} />
      <section
        className='bg-overcast pb-16 text-maritime-darkest sm:pb-24'
        aria-labelledby='magazine-latest-heading'
      >
        <div className='container mx-auto px-4'>
          <header className='mb-8 max-w-2xl'>
            <p className='  text-sm font-semibold leading-[1.4]   text-havdyp'>Siste fra magasinet</p>
            <h2
              id='magazine-latest-heading'
              className='mt-2 font-google-sans text-4xl font-bold leading-[0.95]   sm:text-5xl'
            >
              Flere guider og historier
            </h2>
          </header>
          <ul className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {otherArticles.map(article => (
              <MagazineArticleCard key={article.slug} article={article} />
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
