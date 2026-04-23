import { loadEnvConfig } from '@next/env'
import { fetchOrdersForMetaBackfill } from '@/lib/shopify/fetchOrdersForMetaBackfill'
import { sendMetaPurchase } from '@/lib/tracking/meta/sendMetaPurchase'
import { getMetaPurchaseEventTime } from '@/lib/tracking/meta/getMetaPurchaseEventTime'
import { createTrackingContext } from '@/lib/tracking/utils/createTrackingContext'

loadEnvConfig(process.cwd())

const MAX_META_REPLAY_WINDOW_MS = 7 * 24 * 60 * 60 * 1000

type CliOptions = {
  from: Date
  to: Date
  execute: boolean
}

function parseDateFlag(flagValue: string | undefined, fallback: Date): Date {
  if (!flagValue) {
    return fallback
  }

  const parsedTimestamp = Date.parse(flagValue)

  if (Number.isNaN(parsedTimestamp)) {
    throw new Error(`Invalid ISO date: ${flagValue}`)
  }

  return new Date(parsedTimestamp)
}

function parseCliOptions(argv: string[]): CliOptions {
  const now = new Date()
  const defaultFrom = new Date(now.getTime() - MAX_META_REPLAY_WINDOW_MS)
  const fromFlag = argv.find(argument => argument.startsWith('--from='))
  const toFlag = argv.find(argument => argument.startsWith('--to='))

  const from = parseDateFlag(fromFlag?.split('=')[1], defaultFrom)
  const to = parseDateFlag(toFlag?.split('=')[1], now)
  const execute = argv.includes('--execute')

  if (from.getTime() > to.getTime()) {
    throw new Error('--from must be earlier than or equal to --to')
  }

  return { from, to, execute }
}

function isInsideReplayWindow(orderEventTime: number): boolean {
  return Date.now() - orderEventTime * 1000 <= MAX_META_REPLAY_WINDOW_MS
}

async function main() {
  const options = parseCliOptions(process.argv.slice(2))

  console.log(
    `[Meta Backfill] mode=${options.execute ? 'execute' : 'dry-run'} from=${options.from.toISOString()} to=${options.to.toISOString()}`
  )

  const orders = await fetchOrdersForMetaBackfill(options)
  const eligibleOrders = orders.filter(order =>
    isInsideReplayWindow(getMetaPurchaseEventTime(order))
  )

  console.log(
    `[Meta Backfill] fetched=${orders.length} eligible=${eligibleOrders.length}`
  )

  if (!options.execute) {
    for (const order of eligibleOrders.slice(0, 10)) {
      console.log(
        `[Meta Backfill] dry-run order=${order.id} processed_at=${order.processed_at || order.created_at}`
      )
    }

    console.log(
      '[Meta Backfill] dry-run complete. Re-run with --execute to send events.'
    )
    return
  }

  let successCount = 0
  let failureCount = 0

  for (const order of eligibleOrders) {
    const result = await sendMetaPurchase(createTrackingContext(order, null))

    if (result.success) {
      successCount += 1
      console.log(`[Meta Backfill] sent order=${order.id}`)
      continue
    }

    failureCount += 1
    console.error(
      `[Meta Backfill] failed order=${order.id} error=${JSON.stringify(result.details || result.error)}`
    )
  }

  console.log(
    `[Meta Backfill] finished success=${successCount} failure=${failureCount}`
  )

  if (failureCount > 0) {
    process.exitCode = 1
  }
}

main().catch(error => {
  console.error('[Meta Backfill] fatal', error)
  process.exitCode = 1
})
