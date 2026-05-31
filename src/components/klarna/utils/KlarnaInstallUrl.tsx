'use client'

import Script from 'next/script'

import type {
  KlarnaExpressCheckoutAuthorizationResult,
  KlarnaExpressCheckoutAuthorize,
  KlarnaExpressCheckoutLoadResult
} from '@/components/klarna/types'

const KLARNA_CLIENT_ID = process.env.NEXT_PUBLIC_KLARNA_CLIENT_ID

export function KlarnaInstallUrl() {
  const initKlarna = () => {
    if (!KLARNA_CLIENT_ID) {
      console.error('Missing NEXT_PUBLIC_KLARNA_CLIENT_ID')
      return
    }

    if (!window.Klarna?.Payments?.Buttons) {
      console.error('Klarna Payments Buttons API is not available')
      return
    }

    window.Klarna.Payments.Buttons.init({
      client_id: KLARNA_CLIENT_ID
    }).load(
      {
        container: '#klarna-express-checkout-container',
        theme: 'default',
        shape: 'default',
        on_click: (authorize: KlarnaExpressCheckoutAuthorize) => {
          authorize(
            { collect_shipping_address: true },
            {}, // TODO: erstatt med faktisk Klarna order payload
            (result: KlarnaExpressCheckoutAuthorizationResult) => {
              console.log('Klarna authorization result', result)
            }
          )
        }
      },
      (loadResult: KlarnaExpressCheckoutLoadResult) => {
        console.log('Klarna button loaded', loadResult)
      }
    )
  }

  return (
    <>
      <div id='klarna-express-checkout-container' />

      <Script
        id='klarna-express-checkout-sdk'
        src='https://x.klarnacdn.net/kp/lib/v1/api.js'
        strategy='afterInteractive'
        onReady={initKlarna}
        onError={(e: Error) => {
          console.error('Klarna script failed to load', e)
        }}
      />
    </>
  )
}
