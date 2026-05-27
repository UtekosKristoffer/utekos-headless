import type { MagazineArticle } from '../types'
import { getMagazineThemeStyle } from '../utils/getMagazineThemeStyle'
import { MagazineArticleBlocks } from './MagazineArticleBlocks'
import { MagazineArticleHeader } from './MagazineArticleHeader'
import { MagazineBreadcrumbs } from './MagazineBreadcrumbs'
import { MagazineNewsletterSection } from './MagazineNewsletterSection'
import { MagazineRelatedArticles } from './MagazineRelatedArticles'

type MagazineArticleShellProps = {
  article: MagazineArticle
  relatedArticles: MagazineArticle[]
}

export function MagazineArticleShell({ article, relatedArticles }: MagazineArticleShellProps) {
  return (
    <article className='bg-overcast text-maritime-darkest' style={getMagazineThemeStyle(article.theme)}>
      <section className='border-b border-maritime-darkest/12 bg-overcast text-maritime-darkest'>
        <div className='container mx-auto px-4 py-5'>
          <MagazineBreadcrumbs article={article} />
        </div>
      </section>
      <MagazineArticleHeader article={article} />
      <div className='mx-auto w-full max-w-3xl px-4 py-14 sm:py-20'>
        <MagazineArticleBlocks blocks={article.blocks} />
      </div>
      <MagazineRelatedArticles articles={relatedArticles} />
      <MagazineNewsletterSection />
    </article>
  )
}
