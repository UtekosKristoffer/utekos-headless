import { NextResponse } from 'next/server'
import { getAdAccount } from '@/lib/meta/metaClient'

export async function GET() {
  try {
    const account = getAdAccount()
    const fields = [
      'date_start',
      'date_stop',
      'campaign_id',
      'campaign_name',
      'impressions',
      'spend',
      'clicks',
      'purchase_roas'
    ]
    const params = {
      level: 'campaign',
      date_preset: 'last_7d',
      time_increment: 1
    }
    const insights = await account.getInsights(fields, params)
    return NextResponse.json({ data: insights })
  } catch (err) {
    console.error('Meta Insights error', err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
