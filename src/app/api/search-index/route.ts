// Path: src/app/api/search-index/route.ts
import sitemap from '@/app/sitemap'
import { buildSearchIndex } from '@/lib/helpers/search'
import type { MetadataRoute } from 'next'
import { NextResponse } from 'next/server'
import { cacheLife } from 'next/cache'

export type SearchItem = {
  id: string
  title: string
  path: string
  parentId: string | null
  keywords: string[]
  children?: SearchItem[]
}

export type SearchGroup = {
  key: string
  label: string
  items: SearchItem[]
}

export async function GET() {
  'use cache'
  cacheLife('default') // erstatter revalidate: 300 (5 min stale)

  try {
    const sitemapEntries = (await sitemap()) as MetadataRoute.Sitemap

    const allPaths = sitemapEntries
      .map(entry => {
        try {
          // Sikrer at pathname er gyldig, fjerner eventuelle query params/hash
          const url = new URL(entry.url)
          return url.pathname || '/'
        } catch {
          // Fallback hvis URL er ugyldig
          console.warn(`Ugyldig URL i sitemap: ${entry.url}`)
          return null // Filtreres ut senere
        }
      })
      .filter((path): path is string => path !== null) // Fjern ugyldige entries

    const uniquePaths = Array.from(new Set(allPaths))
    const contentPaths = uniquePaths.filter(p => !p.startsWith('/api'))

    // Anta at buildSearchIndex returnerer et serialiserbart objekt
    const { groups } = await buildSearchIndex(contentPaths)

    // Bygg payload med ISO string for dato
    const payload = { updatedAt: new Date().toISOString(), groups }

    // Tving payload til å være et "plain object" for prerendering
    const plainPayload = JSON.parse(JSON.stringify(payload))

    // Returner det rene objektet
    return NextResponse.json(plainPayload)
  } catch (error) {
    console.error('Failed to build search index:', error)
    // Returner feil som et plain object også for konsistens
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
