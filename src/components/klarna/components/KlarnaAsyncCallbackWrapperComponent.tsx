'use client'

import Script from 'next/script'

import { KLARNA_CDN_API_URL } from '@/components/klarna/utils/klarnaCdnApiUrl'

import type {
  KlarnaExpressCheckoutAuthorizationResult,
  KlarnaExpressCheckoutAuthorize,
  KlarnaExpressCheckoutLoadResult,
  KlarnaExpressCheckoutPayload
} from '../types'

type KlarnaInstallUrlProps = {
  orderPayload: KlarnaExpressCheckoutPayload
}

const KLARNA_CLIENT_ID = process.env.NEXT_PUBLIC_KLARNA_CLIENT_ID

const KLARNA_CONTAINER_ID = 'klarna-express-checkout-container'

export function KlarnaInstallUrl({ orderPayload }: KlarnaInstallUrlProps) {
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
        container: `#${KLARNA_CONTAINER_ID}`,
        theme: 'default',
        shape: 'default',
        locale: 'no-NO',
        on_click: (authorize: KlarnaExpressCheckoutAuthorize) => {
          authorize(
            {
              auto_finalize: true,
              collect_shipping_address: true
            },
            orderPayload,
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
      <div id={KLARNA_CONTAINER_ID} />

      <Script
        id='klarna-express-checkout-sdk'
        src={KLARNA_CDN_API_URL}
        strategy='afterInteractive'
        onReady={initKlarna}
        onError={(error: Error) => {
          console.error('Klarna script failed to load', error)
        }}
      />
    </>
  )
}
