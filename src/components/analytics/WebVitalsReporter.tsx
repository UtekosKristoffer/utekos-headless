// Path: src/components/analytics/WebVitalsReporter.tsx

'use client'

import { useReportWebVitals } from 'next/web-vitals'

type MetricPayload =
  Parameters<typeof useReportWebVitals>[0] extends (
    (metric: infer Metric) => void
  ) ?
    Metric
  : never

function reportWebVitals(metric: MetricPayload) {
  const payload = {
    id: metric.id,
    name: metric.name,
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
    navigationType: metric.navigationType,
    entries: metric.entries,
    pathname:
      typeof window !== 'undefined' ? window.location.pathname : undefined,
    href: typeof window !== 'undefined' ? window.location.href : undefined,
    timestamp: Date.now()
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('[web-vitals]', payload)
    return
  }

  const body = JSON.stringify(payload)

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/web-vitals', body)
    return
  }

  fetch('/api/analytics/web-vitals', {
    method: 'POST',
    body,
    keepalive: true,
    headers: {
      'content-type': 'application/json'
    }
  }).catch(() => {
    // Do not block user experience for analytics failure.
  })
}

export function WebVitalsReporter() {
  useReportWebVitals(reportWebVitals)
  return null
}
