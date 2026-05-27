import { NextRequest, NextResponse } from 'next/server'

const UTEKOS_MARKETING_GROUP_PINTEREST_ACCESS_TOKEN =
  process.env.UTEKOS_MARKETING_GROUP_PINTEREST_ACCESS_TOKEN

const request = new NextRequest('https://api-sandbox.pinterest.com/catalogs/feeds?', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${UTEKOS_MARKETING_GROUP_PINTEREST_ACCESS_TOKEN}`
  },
  body: JSON.stringify({
    name: 'Test Catalog',
    description: 'This is a test catalog created from Next.js API route'
  })
})

export async function POST() {
  try {
    const response = await fetch(request)
    const data = await response.json()

    if (!response.ok) {
      console.error('Pinterest API error:', data)
      return NextResponse.json({ success: false, error: data }, { status: response.status })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error('Error creating Pinterest catalog:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
