// Path: src/app/api/google/feed/route.ts

import { NextResponse } from 'next/server'
import { generateFeedXml } from '@/lib/utils/generateFeedXml'

export async function GET() {
  try {
    const rss = await generateFeedXml()

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8', // Endret tilbake til XML
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800'
      }
    })
  } catch (error) {
    console.error('Google Feed generation failed:', error)
    return new NextResponse(
      `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      { status: 500 }
    )
  }
}
