// Path: src/lib/helpers/search/index.ts
import type { SearchGroup, SearchItem } from '@/app/api/search-index/route'
import { SEARCH_CONFIG, GROUP_LABELS } from './searchConfig'
import { getMagazineArticles } from '@/db/data/articles'

export type ClientSearchItem = SearchItem

/**
 * Normaliserer tekst for bedre søk (æøå → aoa)
 */
function normalizeText(text: string): string {
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
 * Bygger komplett søkeindeks fra statisk config + dynamiske magasinartikler
 */
export async function buildSearchIndex(_allPaths?: string[]) {
  // 1. Start med statisk konfigurasjon
  const staticItems: SearchItem[] = SEARCH_CONFIG.map(item => ({
    id: item.id,
    title: item.title,
    path: item.path,
    parentId: null,
    keywords: [
      ...item.keywords,
      normalizeText(item.title),
      ...item.keywords.map(k => normalizeText(k))
    ]
  }))

  // 2. Hent magasinartikler dynamisk (med riktig tittel!)
  const { mockArticles } = await import('@/db/data/articles')

  const magazineItems: SearchItem[] = mockArticles.map(article => {
    // Generer keywords fra slug, title og category
    const slugWords = article.slug.split('-').filter(word => word.length > 2)

    const titleWords = article.title.split(' ').filter(word => word.length > 2)

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
        normalizeText(article.category),
        normalizeText(article.excerpt).split(' ').slice(0, 20), // Første 20 ord
        ...slugWords.map(w => normalizeText(w)),
        ...titleWords.map(w => normalizeText(w))
      ]
        .flat()
        .filter(Boolean)
    }
  })

  // 3. Kombiner alt og grupper
  const allItems = [...staticItems, ...magazineItems]

  const groupsMap = new Map<string, SearchGroup>()

  // Initialiser alle grupper
  Object.entries(GROUP_LABELS).forEach(([key, label]) => {
    groupsMap.set(key, {
      key,
      label,
      items: []
    })
  })

  // Fordel items til grupper
  staticItems.forEach(item => {
    const configItem = SEARCH_CONFIG.find(c => c.id === item.id)
    if (configItem) {
      const group = groupsMap.get(configItem.group)
      if (group) {
        group.items.push(item)
      }
    }
  })

  // Legg til magasinartikler
  const magazineGroup = groupsMap.get('magazine')
  if (magazineGroup) {
    magazineGroup.items.push(...magazineItems)
  }

  // 4. Sorter items i hver gruppe alfabetisk
  const groups = Array.from(groupsMap.values())
    .filter(g => g.items.length > 0) // Kun grupper med innhold
    .map(g => ({
      ...g,
      items: g.items.sort((a, b) => a.title.localeCompare(b.title, 'no'))
    }))

  console.log(`✅ Search index built: ${allItems.length} total items`)
  console.log(`   - ${staticItems.length} static items`)
  console.log(`   - ${magazineItems.length} magazine articles`)

  return { groups }
}
