// Path: src/app/magasinet/components/MagazineGrid.tsx

import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { MagazineCategoryBadge } from './MagazineCategoryBadge'
import type { MagazineArticle } from '../types'

type MagazineGridProps = {
  articles: MagazineArticle[]
}

const cardClass =
  'h-full overflow-hidden rounded-3xl border border-maritime-darkest/12 bg-overcast text-maritime-darkest shadow-[0_20px_60px_rgba(20,24,22,0.08)] transition-[transform,border-color,box-shadow,background-color] duration-300 hover:border-maritime-blue/30 hover:bg-cloud-dancer hover:shadow-[0_28px_80px_rgba(20,24,22,0.14)]'

const titleClass =
  'font-google-sans font-semibold tracking-tight text-maritime-darkest transition-colors group-hover:text-maritime-blue'

const excerptClass = 'font-utekos-text leading-[1.55] text-maritime-darkest/76'

function getImageSrcForNextImage(src: string) {
  try {
    const url = new URL(src)

    if (url.hostname === 'utekos.no' || url.hostname === 'www.utekos.no') {
      return `${url.pathname}${url.search}`
    }

    return src
  } catch {
    return src
  }
}

function getArticleImageAlt(article: MagazineArticle) {
  return article.imageAlt || article.title
}

function FeaturedArticleCard({ article }: { article: MagazineArticle }) {
  return (
    <section className='mb-14 sm:mb-16'>
      <Link
        href={`/magasinet/${article.slug}`}
        className='group block'
        data-track='MagazineFeaturedClick'
        data-track-data={JSON.stringify({
          title: article.title,
          slug: article.slug,
          category: article.category
        })}
      >
        <article className={`grid grid-cols-1 md:grid-cols-2 ${cardClass}`}>
          <div className='relative min-h-72 overflow-hidden md:min-h-[28rem]'>
            <Image
              src={getImageSrcForNextImage(article.imageUrl)}
              alt={getArticleImageAlt(article)}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px'
              className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
              priority
            />
          </div>

          <div className='flex flex-col justify-center p-7 sm:p-9 md:p-12'>
            <div className='mb-5'>
              <MagazineCategoryBadge category={article.category} />
            </div>

            <h2 className={`${titleClass} text-3xl leading-[1.05] sm:text-4xl md:text-5xl`}>
              {article.title}
            </h2>

            <p className={`mt-5 text-base sm:text-lg ${excerptClass}`}>{article.excerpt}</p>

            <div className='mt-8 inline-flex items-center gap-2 font-semibold text-maritime-darkest transition-colors group-hover:text-chocolate-plum'>
              Les hele saken
              <ArrowRightIcon
                className='size-4 transition-transform group-hover:translate-x-1'
                aria-hidden='true'
              />
            </div>
          </div>
        </article>
      </Link>
    </section>
  )
}

function MagazineArticleCard({ article }: { article: MagazineArticle }) {
  return (
    <Link
      href={`/magasinet/${article.slug}`}
      className='group block'
      data-track='MagazineGridClick'
      data-track-data={JSON.stringify({
        title: article.title,
        slug: article.slug,
        category: article.category
      })}
    >
      <article className={`${cardClass} hover:-translate-y-1`}>
        <div className='relative h-56 overflow-hidden'>
          <Image
            src={getImageSrcForNextImage(article.imageUrl)}
            alt={getArticleImageAlt(article)}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px'
            className='object-cover transition-transform duration-500 group-hover:scale-[1.04]'
          />
        </div>

        <div className='p-6'>
          <div className='mb-4'>
            <MagazineCategoryBadge category={article.category} />
          </div>

          <h3 className={`${titleClass} text-xl leading-[1.15]`}>{article.title}</h3>

          <p className={`mt-3 text-sm ${excerptClass}`}>{article.excerpt}</p>
        </div>
      </article>
    </Link>
  )
}

export function MagazineGrid({ articles }: MagazineGridProps) {
  const [featuredArticle, ...otherArticles] = articles

  if (!featuredArticle) {
    return null
  }

  return (
    <div>
      <FeaturedArticleCard article={featuredArticle} />

      {otherArticles.length > 0 && (
        <section aria-labelledby='magazine-latest-heading'>
          <div className='mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.16em] text-maritime-darkest/52'>
                Siste fra magasinet
              </p>
              <h2
                id='magazine-latest-heading'
                className='mt-2 font-google-sans text-3xl font-semibold tracking-tight text-maritime-darkest sm:text-4xl'
              >
                Flere guider og historier
              </h2>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {otherArticles.map(article => (
              <MagazineArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
