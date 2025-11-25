// Fil: src/app/api/meta-insights/route.ts
import { NextResponse } from 'next/server'
import bizSdk from 'facebook-nodejs-business-sdk'
const { FacebookAdsApi, AdAccount } = bizSdk

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID

if (!ACCESS_TOKEN) {
  throw new Error('META_ACCESS_TOKEN environment variable is not defined')
}

FacebookAdsApi.init(ACCESS_TOKEN)
export async function GET() {
  if (!AD_ACCOUNT_ID) {
    return NextResponse.json(
      { error: 'Missing Ad Account ID' },
      { status: 500 }
    )
  }
  try {
    const account = new AdAccount(AD_ACCOUNT_ID)
    const fields = [
      'date_start',
      'date_stop',
      'campaign_id',
      'campaign_name',
      'impressions',
      'spend',
      'clicks',
      'actions',
      'action_values',
      'purchase_roas'
    ]
    const params = {
      level: 'campaign',
      date_preset: 'last_7d',
      time_increment: 1
    }
    const data = await account.getInsights(fields, params)
    return NextResponse.json({ data })
  } catch (err) {
    console.error('Meta Insights error', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
