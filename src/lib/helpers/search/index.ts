// Path: src/lib/helpers/search/index.ts
import type { SearchGroup, SearchItem } from '@/app/api/search-index/route'
// Fjern dynamisk import fra her
// import { mockArticles } from '@/db/data/articles' // <--- Endre til statisk import
import { mockArticles } from '@/db/data/articles' // <-- Statisk import her
import { SEARCH_CONFIG, GROUP_LABELS } from './searchConfig'
export type ClientSearchItem = SearchItem

/**
 * Normaliserer tekst for bedre søk (æøå → aoa)
 */
function normalizeText(text: string): string {
  // Din eksisterende normalizeText funksjon...
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[æ]/g, 'ae')
    .replace(/[ø]/g, 'o')
    .replace(/[å]/g, 'a')
    .trim()
}

/**
 * Bygger komplett søkeindeks fra statisk config + statiske magasinartikler
 */
// Fjern 'async' siden vi ikke bruker 'await import()' lenger
export function buildSearchIndex(_allPaths?: string[]) {
  // 1. Start med statisk konfigurasjon
  const staticItems: SearchItem[] = SEARCH_CONFIG.map(item => ({
    id: item.id,
    title: item.title,
    path: item.path,
    parentId: null,
    keywords: [
      item.title,
      ...item.keywords,
      normalizeText(item.title),
      ...item.keywords.map(k => normalizeText(k))
    ].filter(Boolean)
  }))

  // 2. Bruk statisk importert mockArticles direkte
  const magazineItems: SearchItem[] = mockArticles.map(article => {
    const slugWords = article.slug.split('-').filter(word => word.length > 2)
    const titleWords = article.title.split(' ').filter(word => word.length > 2)
    const excerptWords = (article.excerpt ?? '')
      .split(' ')
      .slice(0, 20)
      .filter(Boolean)

    return {
      id: `magazine-${article.slug}`,
      title: article.title,
      path: `/magasinet/${article.slug}`,
      parentId: null,
      keywords: [
        article.slug,
        article.title,
        article.category,
        article.excerpt,
        ...slugWords,
        ...titleWords,
        normalizeText(article.title),
        normalizeText(article.category ?? ''),
        ...excerptWords.map(w => normalizeText(w)),
        ...slugWords.map(w => normalizeText(w)),
        ...titleWords.map(w => normalizeText(w))
      ]
        .flat()
        .filter(kw => typeof kw === 'string' && kw.length > 0)
    }
  })

  // 3. Kombiner alt og grupper (som før)
  const allItems = [...staticItems, ...magazineItems]
  const groupsMap = new Map<string, SearchGroup>()

  Object.entries(GROUP_LABELS).forEach(([key, label]) => {
    groupsMap.set(key, { key, label, items: [] })
  })

  allItems.forEach(item => {
    let groupKey: string | undefined
    if (item.id.startsWith('product-')) groupKey = 'products'
    else if (item.id.startsWith('magazine-')) groupKey = 'magazine'
    else if (item.id.startsWith('inspiration-')) groupKey = 'inspiration'
    else if (item.id.startsWith('help-')) groupKey = 'help'
    else if (item.id.startsWith('page-')) groupKey = 'pages'

    if (groupKey) {
      const group = groupsMap.get(groupKey)
      if (group) {
        group.items.push(item)
      } else {
        console.warn(
          `Fant ikke gruppe for key: ${groupKey} for item ${item.id}`
        )
      }
    } else {
      console.warn(`Kunne ikke bestemme gruppe for item ${item.id}`)
    }
  })

  // 4. Sorter items og tving plain object struktur (som før)
  const groups = Array.from(groupsMap.values())
    .filter(g => g.items.length > 0)
    .map(g => ({
      key: g.key,
      label: g.label,
      items: g.items
        .sort((a, b) => a.title.localeCompare(b.title, 'no'))
        .map(item => ({
          id: item.id,
          title: item.title,
          path: item.path,
          parentId: item.parentId,
          keywords: Array.isArray(item.keywords) ? [...item.keywords] : [],
          ...(item.children && {
            children: item.children.map(child => ({ ...child }))
          })
        }))
    }))

  console.log(`✅ Search index built: ${allItems.length} total items`)
  console.log(`   - ${staticItems.length} static items`)
  console.log(`   - ${magazineItems.length} magazine articles`)

  return { groups }
}
