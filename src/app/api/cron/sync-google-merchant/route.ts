import { NextRequest, NextResponse } from 'next/server'

import { isAuthorizedMerchantRequest } from '@/lib/google/merchant-center/isAuthorizedMerchantRequest'
import { syncCatalogToMerchantCenter } from '@/lib/google/merchant-center/sync/syncCatalogToMerchantCenter'

export const maxDuration = 300

export async function GET(request: NextRequest) {
  if (!isAuthorizedMerchantRequest(request)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const result = await syncCatalogToMerchantCenter({ dryRun: false })

    return NextResponse.json(result, {
      status: result.success ? 200 : 500
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unexpected Merchant cron sync error'

    return NextResponse.json(
      {
        success: false,
        error: {
          message
        }
      },
      { status: 500 }
    )
  }
}
