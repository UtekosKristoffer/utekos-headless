// Path: src/lib/helpers/search/index.ts
import type { SearchGroup, SearchItem } from '@/app/api/search-index/route'
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
 * Bygger komplett søkeindeks fra statisk config + dynamiske magasinartikler
 */
export async function buildSearchIndex(_allPaths?: string[]) {
  // 1. Start med statisk konfigurasjon
  const staticItems: SearchItem[] = SEARCH_CONFIG.map(item => ({
    id: item.id,
    title: item.title,
    path: item.path,
    parentId: null, // Sørg for at parentId er null eksplisitt hvis det er meningen
    keywords: [
      item.title, // Inkluder alltid tittel som keyword
      ...item.keywords,
      normalizeText(item.title),
      ...item.keywords.map(k => normalizeText(k))
    ].filter(Boolean) // Fjern eventuelle tomme strenger
  }))

  // Sørg for at mockArticles bare inneholder serialiserbare data
  const { mockArticles } = await import('@/db/data/articles')

  const magazineItems: SearchItem[] = mockArticles.map(article => {
    // Generer keywords fra slug, title og category
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
      parentId: null, // Eksplisitt null
      keywords: [
        article.slug,
        article.title,
        article.category,
        article.excerpt,
        ...slugWords,
        ...titleWords,
        normalizeText(article.title),
        normalizeText(article.category ?? ''), // Håndter mulig undefined category
        ...excerptWords.map(w => normalizeText(w)),
        ...slugWords.map(w => normalizeText(w)),
        ...titleWords.map(w => normalizeText(w))
      ]
        .flat()
        .filter(kw => typeof kw === 'string' && kw.length > 0) // Ekstra sjekk for gyldige keywords
    }
  })

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

  // 4. Sorter items og *tving* plain object struktur
  const groups = Array.from(groupsMap.values())
    .filter(g => g.items.length > 0) // Kun grupper med innhold
    .map(g => ({
      // Eksplisitt lag et nytt, rent objekt for gruppen
      key: g.key,
      label: g.label,
      items: g.items
        .sort((a, b) => a.title.localeCompare(b.title, 'no'))
        .map(item => ({
          // Eksplisitt lag et nytt, rent objekt for hvert item
          id: item.id,
          title: item.title,
          path: item.path,
          parentId: item.parentId, // Skal være null her
          keywords: Array.isArray(item.keywords) ? [...item.keywords] : [], // Sikre at keywords er en array
          // IKKE inkluder 'children' hvis det ikke er definert
          ...(item.children && {
            children: item.children.map(child => ({ ...child }))
          }) // Sørg for at evt. children også er rene objekter
        }))
    }))

  // Returner den manuelt rensede strukturen
  return { groups }
}
