import Image from 'next/image'
import type { MagazineArticle } from '../types'

type MagazineArticleHeroImageProps = {
  article: MagazineArticle
}

export function MagazineArticleHeroImage({ article }: MagazineArticleHeroImageProps) {
  return (
    <figure className='overflow-hidden rounded-lg border border-cloud-dancer/12 bg-maritime-darkest shadow-[0_28px_90px_-58px_color-mix(in_oklch,var(--maritime-darkest)_92%,transparent)]'>
      <Image
        src={article.heroImage.src}
        alt={article.heroImage.alt}
        width={article.heroImage.width}
        height={article.heroImage.height}
        sizes='(max-width: 1024px) calc(100vw - 32px), 44vw'
        className='aspect-[4/3] h-auto w-full object-cover'
        priority
      />
      {article.heroImage.caption && (
        <figcaption className='bg-maritime-darkest px-5 py-4 font-utekos-text text-sm leading-[1.45] tracking-tight text-cloud-dancer/72'>
          {article.heroImage.caption}
        </figcaption>
      )}
    </figure>
  )
}
