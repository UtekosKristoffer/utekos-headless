// Path: src/app/magasinet/utils/getMagazineArticleSlugs.ts

import { magazineArticles } from './magazineArticles'

export function getMagazineArticleSlugs() {
  return magazineArticles.map(article => ({ slug: article.slug }))
}
