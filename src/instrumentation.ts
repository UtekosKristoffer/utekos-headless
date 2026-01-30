import { registerOTel } from '@vercel/otel'
import type { Instrumentation } from 'next'

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    registerOTel({ serviceName: 'utekos-headless' })
  }
}

export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context
) => {}
