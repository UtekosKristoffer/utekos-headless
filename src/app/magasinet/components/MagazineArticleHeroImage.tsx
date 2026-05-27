// Path: src/app/magasinet/components/MagazineArticleHeroImage.tsx

import Image from 'next/image'
import type { MagazineArticle } from '../types'

type MagazineArticleHeroImageProps = {
  article: MagazineArticle
}

export function MagazineArticleHeroImage({ article }: MagazineArticleHeroImageProps) {
  const imageAlt = article.imageAlt || article.title

  return (
    <figure className='mt-10 overflow-hidden rounded-3xl border border-maritime-darkest/10 bg-maritime-darkest/5 shadow-[0_24px_80px_-48px_rgba(20,24,22,0.45)]'>
      <div className='relative aspect-[16/9] w-full'>
        <Image
          src={article.imageUrl}
          alt={imageAlt}
          fill
          preload
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 896px, 896px'
          className='object-cover'
        />
      </div>

      {article.imageCaption && (
        <figcaption className='px-5 py-3 font-utekos-text text-sm leading-[1.45] text-maritime-darkest/64'>
          {article.imageCaption}
        </figcaption>
      )}
    </figure>
  )
}
