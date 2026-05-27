// src/app/magasinet/_components/MagazineArticleShell.tsx

import type { ReactNode } from 'react'
import { MagazineNewsletterSection } from './MagazineNewsletterSection'
import type { MagazineArticle } from '../types'
import { MagazineBreadcrumbs } from './MagazineBreadcrumbs'
import { MagazineArticleHeader } from './MagazineArticleHeader'

type MagazineArticleShellProps = {
  article: MagazineArticle
  children: ReactNode
}

export function MagazineArticleShell({ article, children }: MagazineArticleShellProps) {
  return (
    <article className='bg-overcast mx-auto max-w-[90%] text-maritime-darkest'>
      <div className='mx-auto w-full max-w-screen py-8 '>
        <div className='mb-10  mx-auto px-4 sm:px-6 lg:px-8'>
          <MagazineBreadcrumbs article={article} />
        </div>

        <MagazineArticleHeader article={article} />
      </div>

      <div className='mx-auto w-full max-w-screen'>{children}</div>

      <MagazineNewsletterSection />
    </article>
  )
}
