import { hasServiceConsent } from '@/lib/tracking/consent/hasServiceConsent'
import { USERCENTRICS_MICROSOFT_SERVICE_NAME } from '@/components/cookie-consent/usercentricsConfig'

type MicrosoftUetPayloadValue =
  | string
  | number
  | string[]
  | Record<string, string>

type MicrosoftUetPayload = Record<string, MicrosoftUetPayloadValue>
type MicrosoftUetQueueItem = string | MicrosoftUetPayload
type MicrosoftUetQueue = {
  push: (...items: MicrosoftUetQueueItem[]) => number | void
}

type MicrosoftUetUserData = {
  email?: string
  phone?: string
}

export type TrackMicrosoftUetEventOptions = {
  eventName?: string
  category?: string
  action?: string
  label?: string
  value?: number
  revenueValue?: number
  currency?: string
  productId?: string | string[]
  pageType?: string
  eventId?: string
}

function addDefinedValue(
  payload: MicrosoftUetPayload,
  key: string,
  value: MicrosoftUetPayloadValue | undefined
): void {
  if (value === undefined) return
  if (typeof value === 'number' && !Number.isFinite(value)) return
  if (Array.isArray(value) && value.length === 0) return
  payload[key] = value
}

function normalizeProductIds(
  productId: string | string[] | undefined
): string | string[] | undefined {
  if (!productId) return undefined
  if (!Array.isArray(productId)) return productId

  const productIds = productId.filter(Boolean)
  if (productIds.length === 0) return undefined
  return productIds.length === 1 ? productIds[0] : productIds
}

function getMicrosoftUetQueue(): MicrosoftUetQueue {
  const microsoftUetQueue = window.uetq

  if (microsoftUetQueue && typeof microsoftUetQueue.push === 'function') {
    return microsoftUetQueue as MicrosoftUetQueue
  }

  const queue: MicrosoftUetQueueItem[] = []
  window.uetq = queue
  return queue
}

export function setMicrosoftUetUserData({
  email,
  phone
}: MicrosoftUetUserData): void {
  if (typeof window === 'undefined') return
  if (!hasServiceConsent(USERCENTRICS_MICROSOFT_SERVICE_NAME)) return
  if (!email && !phone) return

  getMicrosoftUetQueue().push('set', {
    pid: {
      em: email ?? '',
      ph: phone ?? ''
    }
  })
}

export function trackMicrosoftUetEvent({
  eventName,
  category,
  action,
  label,
  value,
  revenueValue,
  currency,
  productId,
  pageType,
  eventId
}: TrackMicrosoftUetEventOptions): void {
  if (typeof window === 'undefined') return
  if (!hasServiceConsent(USERCENTRICS_MICROSOFT_SERVICE_NAME)) return

  const eventAction = eventName ?? action
  if (!eventAction) return

  const payload: MicrosoftUetPayload = {}

  addDefinedValue(payload, 'event_category', category)
  addDefinedValue(payload, 'event_label', label)
  addDefinedValue(payload, 'event_value', value)
  addDefinedValue(payload, 'event_id', eventId)
  addDefinedValue(payload, 'gv', revenueValue)
  addDefinedValue(payload, 'gc', currency)
  addDefinedValue(payload, 'revenue_value', revenueValue)
  addDefinedValue(payload, 'currency', currency)
  addDefinedValue(payload, 'ecomm_prodid', normalizeProductIds(productId))
  addDefinedValue(payload, 'ecomm_pagetype', pageType)

  if (Object.keys(payload).length === 0) return

  getMicrosoftUetQueue().push('event', eventAction, payload)
}

export function trackMicrosoftUetProductPurchase({
  productId,
  revenueValue,
  currency,
  eventId,
  userData
}: {
  productId: string | string[]
  revenueValue: number
  currency: string
  eventId?: string
  userData?: MicrosoftUetUserData
}): void {
  if (userData) {
    setMicrosoftUetUserData(userData)
  }

  trackMicrosoftUetEvent({
    eventName: 'PRODUCT_PURCHASE',
    productId,
    pageType: 'PURCHASE',
    revenueValue,
    currency,
    ...(eventId ? { eventId } : {})
  })
}
