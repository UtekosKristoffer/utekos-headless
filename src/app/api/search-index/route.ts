import sitemap from '@/api/lib/seo/sitemap'
import { buildSearchIndex } from '@/lib/helpers/search'
import type { MetadataRoute } from 'next'
import { NextResponse } from 'next/server'

export const revalidate = 300

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

    return NextResponse.json({ updatedAt: new Date().toISOString(), groups })
  } catch (error) {
    console.error('Failed to build search index:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
