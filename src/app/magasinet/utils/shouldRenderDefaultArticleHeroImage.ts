// Path: src/app/magasinet/utils/shouldRenderDefaultArticleHeroImage.ts

import type { MagazineArticle } from '../types'

export function shouldRenderDefaultArticleHeroImage(article: MagazineArticle) {
  return article.showDefaultHeroImage === true && Boolean(article.imageUrl)
}
