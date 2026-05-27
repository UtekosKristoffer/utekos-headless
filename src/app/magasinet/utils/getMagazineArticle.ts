// Path: src/app/magasinet/utils/getMagazineArticle.ts

import { magazineArticles } from './magazineArticles'

export function getMagazineArticle(slug: string) {
  return magazineArticles.find(article => article.slug === slug) ?? null
}
