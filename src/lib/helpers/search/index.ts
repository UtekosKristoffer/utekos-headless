import type { SearchGroup, SearchItem } from '@/app/search-index/route'

export type ClientSearchItem = SearchItem

type SearchTreeNode = {
  id: string
  title: string
  path: string
  parentId: string | null
  keywords: string[]
  depth: number
  children: SearchTreeNode[]
}

const TITLE_OVERRIDES: Record<string, string> = {
  '/': 'Forsiden',
  '/produkter': 'Produkter',
  '/magasinet': 'Magasinet',
  '/handlehjelp': 'Handlehjelp',
  '/handlehjelp/vask-og-vedlikehold': 'Vask og vedlikehold',
  '/handlehjelp/teknologi-materialer': 'Teknologi & materialer',
  '/handlehjelp/storrelsesguide': 'Størrelsesguide',
  '/kontaktskjema': 'Kontakt Oss',
  '/om-utekos': 'Om Utekos',
  '/personvern': 'Personvern',
  '/gaveguide': 'Gaveguide'
}

// === Hjelpere ================================================================

function groupKeyFor(pathname: string): { key: string; label: string } {
  const first = pathname.split('/').filter(Boolean)[0] ?? ''
  switch (first) {
    case 'produkter':
      return { key: 'products', label: 'Produkter' }
    case 'magasinet':
      return { key: 'magazine', label: 'Magasinet' }
    case 'handlehjelp':
      return { key: 'help', label: 'Handlehjelp' }
    default:
      return { key: 'pages', label: 'Sider' }
  }
}

function toTitleCaseFromSlug(slug: string) {
  return slug
    .split('-')
    .map(s => (s.length ? s[0]!.toUpperCase() + s.slice(1) : s))
    .join(' ')
}

function deriveTitleFromPath(pathname: string): string {
  const override = TITLE_OVERRIDES[pathname]
  if (override) return override
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return 'Forsiden'
  const last = parts[parts.length - 1] ?? '' // <= aldri undefined
  return toTitleCaseFromSlug(last)
}

function idFromPath(pathname: string) {
  return pathname === '/' ? 'root' : pathname.replace(/\//g, '__')
}

// === Indeksbygging ===========================================================

export async function buildSearchIndex(allPaths: string[]) {
  // Sørg for at alle foreldre finnes
  const normalized = new Set<string>(['/'])
  for (const p of allPaths) {
    const parts = p.split('/').filter(Boolean)
    let acc = ''
    for (const part of parts) {
      acc += `/${part}`
      normalized.add(acc)
    }
  }

  // Lag noder
  const nodes: SearchTreeNode[] = Array.from(normalized)
    .sort((a, b) => a.localeCompare(b))
    .map(pathname => {
      const parts = pathname.split('/').filter(Boolean)
      const depth = parts.length
      const parentPath =
        depth === 0 ? null : (
          `/${parts.slice(0, -1).join('/') || ''}`.replace(/\/\/+/g, '/')
        )
      return {
        id: idFromPath(pathname),
        title: deriveTitleFromPath(pathname),
        path: pathname,
        parentId: parentPath ? idFromPath(parentPath) : null,
        keywords: [pathname, deriveTitleFromPath(pathname)],
        depth,
        children: []
      }
    })

  // Knyt foreldre/barn
  const byId = new Map(nodes.map(n => [n.id, n]))
  const roots: SearchTreeNode[] = []
  for (const n of nodes) {
    if (n.parentId && byId.has(n.parentId)) {
      byId.get(n.parentId)!.children.push(n)
    } else {
      roots.push(n)
    }
  }

  // Bygg grupper (toppnivå + forside)
  const groupsMap = new Map<string, SearchGroup>()
  function ensureGroup(pathname: string) {
    const keyLabel = groupKeyFor(pathname)
    if (!groupsMap.has(keyLabel.key)) {
      groupsMap.set(keyLabel.key, {
        key: keyLabel.key,
        label: keyLabel.label,
        items: []
      })
    }
    return groupsMap.get(keyLabel.key)!
  }

  for (const n of nodes) {
    if (n.depth === 0 || n.depth === 1) {
      const g = ensureGroup(n.path)
      g.items.push(mapNodeToSearchItem(n))
    }
  }

  const searchGroups = Array.from(groupsMap.values()).map(g => ({
    ...g,
    items: g.items.sort((a, b) => a.title.localeCompare(b.title))
  }))

  return { groups: searchGroups }
}

// Én vei fra intern Node -> klientformat
function mapNodeToSearchItem(n: SearchTreeNode): SearchItem {
  const directChildren = n.children
    .filter(c => c.depth === n.depth + 1)
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(mapNodeToSearchItem)

  return {
    id: n.id,
    title: n.title,
    path: n.path,
    parentId: n.parentId,
    keywords: n.keywords,

    ...(directChildren.length > 0 ? { children: directChildren } : {})
  }
}
