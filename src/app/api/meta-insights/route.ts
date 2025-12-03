// Path: src/app/api/meta-insights/route.ts

import { NextRequest, NextResponse } from 'next/server'

const bizSdk = require('facebook-nodejs-business-sdk')
const { FacebookAdsApi, AdAccount } = bizSdk

type InsightLevel = 'campaign' | 'adset' | 'ad' | 'account'
type DatePreset =
  | 'today'
  | 'yesterday'
  | 'this_month'
  | 'last_month'
  | 'last_7d'
  | 'last_14d'
  | 'last_30d'
  | 'last_90d'
  | 'maximum'

export async function GET(req: NextRequest) {
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
  const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID
  if (!ACCESS_TOKEN || !AD_ACCOUNT_ID) {
    console.error('Missing META_ACCESS_TOKEN or META_AD_ACCOUNT_ID')
    return NextResponse.json(
      { error: 'Server configuration error: Missing Meta credentials' },
      { status: 500 }
    )
  }

  FacebookAdsApi.init(ACCESS_TOKEN)
  const searchParams = req.nextUrl.searchParams
  const level = (searchParams.get('level') as InsightLevel) || 'campaign'
  const datePreset =
    (searchParams.get('date_preset') as DatePreset) || 'last_30d'

  const breakdownParam = searchParams.get('breakdown')
  const breakdowns = breakdownParam ? breakdownParam.split(',') : []

  const account = new AdAccount(`act_${AD_ACCOUNT_ID.replace('act_', '')}`)

  // Feltene vi ønsker å hente ut
  const fields = [
    'campaign_name',
    'campaign_id',
    'adset_name',
    'adset_id',
    'ad_name',
    'ad_id',
    'spend', // Penger brukt
    'impressions', // Visninger
    'clicks', // Klikk (alle)
    'cpc', // Cost per Click
    'cpm', // Cost per 1000 impressions
    'ctr', // Click through rate
    'purchase_roas', // Return on Ad Spend (viktigst!)
    'actions', // Rådata for events (kjøp, add to cart osv)
    'action_values', // Verdien av events
    'objective'
  ]

  const params = {
    level: level,
    date_preset: datePreset,
    breakdowns: breakdowns.length > 0 ? breakdowns : undefined,
    time_increment: searchParams.get('daily') === 'true' ? 1 : 'all_days',
    limit: 100
  }

  try {
    const insights = await account.getInsights(fields, params)

    const formattedData = insights.map((item: any) => {
      const purchaseValueObj = item.action_values?.find(
        (av: any) => av.action_type === 'purchase'
      )
      const purchaseValue =
        purchaseValueObj ? parseFloat(purchaseValueObj.value) : 0

      const purchaseCountObj = item.actions?.find(
        (a: any) => a.action_type === 'purchase'
      )
      const purchaseCount =
        purchaseCountObj ? parseInt(purchaseCountObj.value) : 0

      const roasObj = item.purchase_roas?.find(
        (r: any) => r.action_type === 'purchase_roas'
      )
      const spend = parseFloat(item.spend || '0')
      const calculatedRoas = spend > 0 ? purchaseValue / spend : 0

      return {
        id: item.ad_id || item.adset_id || item.campaign_id,
        name: item.ad_name || item.adset_name || item.campaign_name,
        level: level,
        spend: spend,
        impressions: parseInt(item.impressions || '0'),
        clicks: parseInt(item.clicks || '0'),
        cpc: parseFloat(item.cpc || '0'),
        cpm: parseFloat(item.cpm || '0'),
        ctr: parseFloat(item.ctr || '0'),
        purchases: purchaseCount,
        purchaseValue: purchaseValue,
        roas: calculatedRoas, // Bruker vår kalkulerte ROAS som er mer robust
        breakdown:
          breakdowns.length > 0 ?
            {
              device: item.impression_device,
              platform: item.publisher_platform
            }
          : null,
        date_start: item.date_start,
        date_stop: item.date_stop
      }
    })

    return NextResponse.json({
      success: true,
      data: formattedData,
      params: { level, datePreset, breakdowns }
    })
  } catch (err: any) {
    console.error('Meta Insights API Error:', err)

    const errorDetail = err.response?.data?.error?.message || err.message

    return NextResponse.json(
      {
        error: 'Failed to fetch insights',
        details: errorDetail
      },
      { status: 500 }
    )
  }
}
