// Path: src/app/magasinet/components/MagazineArticleHeader.tsx

import { CalendarDays, Clock, PencilLine } from 'lucide-react'
import { MagazineCategoryBadge } from './MagazineCategoryBadge'
import { formatMagazineArticleDate } from '../utils/formatMagazineArticleDate'
import type { MagazineArticle } from '../types'

type MagazineArticleHeaderProps = {
  article: MagazineArticle
}

export function MagazineArticleHeader({ article }: MagazineArticleHeaderProps) {
  const publishedDate = formatMagazineArticleDate(article.publishedAt)
  const updatedDate =
    article.updatedAt && article.updatedAt !== article.publishedAt ?
      formatMagazineArticleDate(article.updatedAt)
    : null

  return (
    <header className='mx-auto max-w-4xl pb-10'>
      <div className='mb-8 flex flex-wrap items-center gap-3 text-sm text-maritime-darkest/72'>
        <MagazineCategoryBadge category={article.category} />

        <span className='inline-flex items-center gap-1.5'>
          <CalendarDays className='size-4' aria-hidden='true' />
          <time dateTime={article.publishedAt}>{publishedDate}</time>
        </span>

        {updatedDate && (
          <span className='inline-flex items-center gap-1.5'>
            <PencilLine className='size-4' aria-hidden='true' />
            <span>
              Oppdatert <time dateTime={article.updatedAt}>{updatedDate}</time>
            </span>
          </span>
        )}

        {article.readingTimeMinutes && (
          <span className='inline-flex items-center gap-1.5'>
            <Clock className='size-4' aria-hidden='true' />
            <span>{article.readingTimeMinutes} min lesing</span>
          </span>
        )}
      </div>

      <h1 className='text-balance font-google-sans text-4xl font-bold leading-[0.95] tracking-tight text-maritime-darkest sm:text-5xl md:text-6xl'>
        {article.title}
      </h1>

      <p className='mt-6 max-w-3xl font-utekos-text text-lg leading-[1.55] tracking-tight text-maritime-darkest/78 sm:text-xl'>
        {article.excerpt}
      </p>

      {article.authorName && (
        <p className='mt-6 text-sm font-medium text-maritime-darkest/70'>Av {article.authorName}</p>
      )}
    </header>
  )
}
