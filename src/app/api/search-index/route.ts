// Path: src/app/api/search-index/route.ts

import sitemap from '@/app/sitemap'
import { buildSearchIndex } from '@/lib/helpers/search'
import type { MetadataRoute } from 'next'
import { NextResponse } from 'next/server'

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
  try {
    const sitemapEntries = (await sitemap()) as MetadataRoute.Sitemap

    const allPaths = sitemapEntries
      .map(entry => {
        try {
          const url = new URL(entry.url)
          return url.pathname || '/'
        } catch {
          console.warn(`Ugyldig URL i sitemap: ${entry.url}`)
          return null
        }
      })
      .filter((path): path is string => path !== null)

    const uniquePaths = Array.from(new Set(allPaths))
    const contentPaths = uniquePaths.filter(p => !p.startsWith('/api'))

    // buildSearchIndex returnerer allerede serialiserbare, rene objekter.
    // Vi trenger ikke serialisere på nytt.
    const { groups } = buildSearchIndex(contentPaths)

    return NextResponse.json(
      { groups: groups }, // Bruk 'groups' direkte
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      }
    )
  } catch (error) {
    console.error('Failed to build search index:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
