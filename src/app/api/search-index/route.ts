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

    const allPaths = sitemapEntries.map(entry => {
      try {
        return new URL(entry.url).pathname || '/'
      } catch {
        return '/'
      }
    })

    const uniquePaths = Array.from(new Set(allPaths))
    const contentPaths = uniquePaths.filter(p => !p.startsWith('/api'))
    const { groups } = await buildSearchIndex(contentPaths)

    // Tving JSON-serialiserbar, plain payload for prerender
    const payload = { updatedAt: new Date().toISOString(), groups }
    const plain = JSON.parse(JSON.stringify(payload))

    return NextResponse.json(plain)
  } catch (error) {
    console.error('Failed to build search index:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
